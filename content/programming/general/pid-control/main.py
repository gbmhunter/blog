# flake8: noqa
# Spring-mass-damper example at:
# https:#github.com/gbmhunter/NinjaCalc/blob/56daeb15612fe4c85093f958fc52a6774f0cb909/src/components/Calculators/Software/PidTuner/Processes/SpringMassDamperProcess.txt
from enum import Enum


class IntegralLimitModes(Enum):
    NONE = 'None',
    CONSTANT_LIMITED = 'Constant Limited',
    OUTPUT_LIMITED = 'Output Limited'


class Pid:
    def init(self, pConstant, iConstant, dConstant):
        self.pConstant = pConstant
        self.iConstant = iConstant
        self.dConstant = dConstant

        self.setPoint = 0.0
        self.iValue = 0.0
        self.previousError = 0.0

        # Integral limiting (default to OFF)
        self.integralLimitSettings = {}
        self.integralLimitSettings.mode = IntegralLimitModes.NONE

        # Output limiting (default to OFF)
        self.enableOutputLimiting = False
        self.outputLimMin = 0.0
        self.outputLimMax = 0.0

    def setSetPoint(self, value):
        # console.log('setSetPoint() called. value = ' + value)
        self.setPoint = value

    def setConstants(self, pConstant, iConstant, dConstant):
        # console.log('setConstants() called. pConstant = ' + pConstant +
        # ', iConstant = ' + iConstant + ', dConstant = ' + dConstant)
        self.pConstant = pConstant
        self.iConstant = iConstant
        # We also need to reset the integated value
        # (latent integral could remain if iConstant is changed from non-zero 
        # to zero)
        self.iValue = 0.0
        self.dConstant = dConstant        

    def setOutputLimits(self, enabled, min, max):
        self.enableOutputLimiting = enabled
        self.outputLimMin = min
        self.outputLimMax = max

    def setIntegralLimit(self, options):
        # console.log('setIntegralLimit() called with settings = ')
        # console.log(options)
        if options.mode == IntegralLimitModes.CONSTANT_LIMITED:
            if ('min' not in options) or ('max' not in options):
                raise RuntimeError('Provided options must have min and ' + \
                                   ' max property when mode === CONSTANT_LIMITED.')
            
        elif options.mode == IntegralLimitModes.OUTPUT_LIMITED:
            # Output limiting has to be enabled for this mode to work
            if not self.enableOutputLimiting:
                raise RuntimeError('Integral limiting set to OUTPUT_LIMITED but output limiting is not enabled.')                

        self.integralLimitSettings = options

    def run(self, currentValue, deltaTime_s):
        # console.log('Pid.run() called. currentValue = ' + currentValue + ', deltaTime_s = ' + deltaTime_s)

        # Error positive if we need to "go forward"
        error = self.setPoint - currentValue
        # console.log('error = ' + error)

        # Porportional control
        pValue = error * self.pConstant
        # console.log('pValue = ' + pValue)

        # Integral control
        self.iValue += error * deltaTime_s * self.iConstant
        # console.log('iValue (before limiting) = ' + self.iValue)

        # Limit integral control
        # console.log('self.integralLimitSettings =')
        # console.log(self.integralLimitSettings)
        if self.integralLimitSettings.mode == IntegralLimitModes.CONSTANT_LIMITED:
            # console.log('Limiting integral term with constant.')
            if self.iValue > self.integralLimitSettings.max:
                self.iValue = self.integralLimitSettings.max
            elif self.iValue < self.integralLimitSettings.min:
                self.iValue = self.integralLimitSettings.min                    

        # console.log('iValue (after limiting) = ' + self.iValue)

        # Derivative control
        deltaError = error - self.previousError
        # console.log('deltaError = ' + deltaError)

        errorDerivative = deltaError / deltaTime_s
        # console.log('errorDerivative = ' + errorDerivative)

        dValue = errorDerivative * self.dConstant
        # console.log('dValue = ' + dValue)

        output = pValue + self.iValue + dValue
        # console.log('output = ' + output)

        self.previousError = error

        # Limit output if output limiting is enabled
        if self.enableOutputLimiting:
            if output > self.outputLimMax:
                # console.log('Desired output is above max. limit.')
                if self.integralLimitSettings.mode == IntegralLimitModes.OUTPUT_LIMITED:
                    self.limitIntegralTerm(output)
                
                output = self.outputLimMax
            elif output < self.outputLimMin:
                # console.log('Desired output (' + output + ') is below min. limit (' + self.outputLimMin + '.')
                if self.integralLimitSettings.mode == IntegralLimitModes.OUTPUT_LIMITED:
                    self.limitIntegralTerm(output)
                
                output = self.outputLimMin
        
        # Save the calculated P, I, D and output values, as the user may want to
        # inspect these by calling getLastTerms()
        self.lastTerms = {
            'p': pValue,
            'i': self.iValue,
            'd': dValue,
            'output': output
        }

        # console.log('output =')
        # console.log(output)
        return output

    def getLastTerms(self):
        return self.lastTerms

    def limitIntegralTerm(self, output):
        # console.log('limitIntegralTerm() called. output = ' + output)
        # console.log('iValue (before limiting) = ' + self.iValue)
        if output > self.outputLimMax:
            difference = output - self.outputLimMax
            # console.log('output - outputLimMax = ' + difference)
            if self.iValue > 0.0:
                # Reduce I value, but make sure it doesn't go negative!
                self.iValue = max(self.iValue - difference, 0)
            
        elif output < self.outputLimMin:
            difference = output - self.outputLimMin
            # console.log('output - outputLimMin = ' + difference)
            if self.iValue < 0.0:
                # Increase I value, but make sure it doesn't go positive!
                self.iValue = min(self.iValue - difference, 0)
            
        # console.log('iValue (after limiting) = ' + self.iValue)

    def reset(self):
        self.pConstant = 0.0
        self.iConstant = 0.0
        self.iValue = 0.0
        self.dConstant = 0.0

        self.lastTerms = {}
        self.previousError = 0.0

        self.enableOutputLimiting = False
    
    
class SpringMassDamper:

    def init(self):
        self.mass_kg = 1.0
        self.springConstantK_NPm = 20.0
        self.dampingCoefficientC_NsPm = 10.0

        self.displacement_m = 0.0
        self.velocity_mPs = 0.0

    def update(self, controlVariable, timeStep_s):
        print('update() called with controlVariable (external force) = ' + controlVariable + ', timeStep_s = ' + timeStep_s + '.')        

        #     # Equation for mass-spring-damper process
        #     # Fext - kx - c*(d/dx) = m*(d^2/dx^2)

        forceExternal_N = controlVariable

        #     # We need to output a new displacement, x.
        #     # To do this, we calculate all forces using the previous step's values
        #     # for displacement and velocity. We then calculate a new acceleration, and
        #     # then work backwards knowing the time step to find a new velocity
        #     # and then displacement

        forceSpring_N = self.springConstantK_NPm * self.displacement_m
        # print('forceSpring = ' + forceSpring_N)

        forceDamper_N = self.dampingCoefficientC_NsPm * self.velocity_mPs
        # print('forceDamper = ' + forceDamper_N)

        # a = (Fext - Fspring - Fdamper)/m
        acceleration_mPs2 = (forceExternal_N - forceSpring_N - forceDamper_N) / self.mass_kg

        # Use a and timestep to find v
        self.velocity_mPs = self.velocity_mPs + acceleration_mPs2 * timeStep_s
        # print('velocity_mPs = ' + self.velocity_mPs)

        # Use v and timestep to find x
        self.displacement_m = self.displacement_m + self.velocity_mPs * timeStep_s
        # print('displacement_m = ' + self.displacement_m)

        return self.displacement_m