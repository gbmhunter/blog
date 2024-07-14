# flake8: noqa
# Spring-mass-damper example at:
# https:#github.com/gbmhunter/NinjaCalc/blob/56daeb15612fe4c85093f958fc52a6774f0cb909/src/components/Calculators/Software/PidTuner/Processes/SpringMassDamperProcess.txt
from distutils.command.config import config
from enum import Enum
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).resolve().parent

def main():
    # create_msd_response_plots()
    # Didn't get the manual tuning working
    create_manual_tuning_plots()

def create_msd_response_plots():
    configs = [
        {
            'p': 350,
            'i': 300,
            'd': 50,
            'plot_filename': 'msd-response-plot-underdamped.png',
        },
        {
            'p': 10,
            'i': 0,
            'd': 0,
            'plot_filename': 'msd-response-plot-p10-i0-d0.png',
        },
        {
            'p': 300,
            'i': 0,
            'd': 0,
            'plot_filename': 'msd-response-plot-p300-i0-d0.png',
        },
        {
            'p': 300,
            'i': 300,
            'd': 0,
            'plot_filename': 'msd-response-plot-p300-i300-d0.png',
        },
        {
            'p': 300,
            'i': 300,
            'd': 20,
            'plot_filename': 'msd-response-plot-p300-i300-d20.png',
        },
    ]

    for config in configs:
        results = run_simulation(config['p'], config['i'], config['d'])
        create_response_and_pid_terms_plots(config, results)

def create_manual_tuning_plots():

    time_step_s = 1e-3
    num_steps_delay = 0
    mass_kg = 1.0
    springConstantK_Npm = 20.0
    dampingCoefficientC_NsPm = 1.0

    configs = [
        {
            'p': 0,
            'i': 0,
            'd': 0,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay, 
                                      mass_kg=mass_kg, springConstantK_Npm=springConstantK_Npm, dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-01-p0-i0-d0.png')

    #########################################################
    # Kp/Kd ROUND 1
    #########################################################

    configs = [
        {
            'p': 00,
            'i': 0,
            'd': 0,
        },
        {
            'p': 10,
            'i': 0,
            'd': 0,
        },
        {
            'p': 70,
            'i': 0,
            'd': 0,
        },
        {
            'p': 90,
            'i': 0,
            'd': 0,
        },
        {
            'p': 100,
            'i': 0,
            'd': 0,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay,
                                      mass_kg=mass_kg,
                                      springConstantK_Npm=springConstantK_Npm,
                                      dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-02-increasing-kp-round-1.png')

    # Increase K_d until oscillations go away 
    kp_value = 100
    configs = [
        {
            'p': kp_value,
            'i': 0,
            'd': 0,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 5,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 10,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 15,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 19,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay,
                                      mass_kg=mass_kg,
                                      springConstantK_Npm=springConstantK_Npm,
                                      dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-03-increasing-kd-round-1.png')

    #########################################################
    # Kp/Kd ROUND 2
    #########################################################

    kd_value = 19
    configs = [
        {
            'p': 100,
            'i': 0,
            'd': kd_value,
        },
        {
            'p': 500,
            'i': 0,
            'd': kd_value,
        },
        {
            'p': 1500,
            'i': 0,
            'd': kd_value,
        },
        {
            'p': 1800,
            'i': 0,
            'd': kd_value,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay,
                                      mass_kg=mass_kg,
                                      springConstantK_Npm=springConstantK_Npm,
                                      dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-04-increasing-kp-round-2.png')

    # Increase K_d until oscillations go away
    kp_value = 1800
    configs = [
        {
            'p': kp_value,
            'i': 0,
            'd': 19,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 30,
        },
        {
            'p': kp_value,
            'i': 0,
            'd': 60,
        },
        # Starts oscillating at this point, rather than successfully damping, so we have found the limit!
        {
            'p': kp_value,
            'i': 0,
            'd': 80,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay,
                                      mass_kg=mass_kg,
                                      springConstantK_Npm=springConstantK_Npm,
                                      dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-05-increasing-kd-round-2.png')

    #########################################################
    # Ki
    #########################################################

    kp_value = 100
    kd_value = 19
    configs = [
        {
            'p': kp_value,
            'i': 0,
            'd': kd_value,
        },
        {
            'p': kp_value,
            'i': 50,
            'd': kd_value,
        },
        {
            'p': kp_value,
            'i': 100,
            'd': kd_value,
        },
        {
            'p': kp_value,
            'i': 150,
            'd': kd_value,
        },
        {
            'p': kp_value,
            'i': 200,
            'd': kd_value,
        },
    ]
    results = []
    for config in configs:
        results.append(run_simulation(config['p'], config['i'], config['d'],
                                      time_step_s=time_step_s,
                                      num_steps_delay=num_steps_delay,
                                      mass_kg=mass_kg,
                                      springConstantK_Npm=springConstantK_Npm,
                                      dampingCoefficientC_NsPm=dampingCoefficientC_NsPm))
    create_manual_tuning_plot(configs, results, 'manual-tuning-06-increasing-ki.png')

def create_manual_tuning_plot(configs, results, plot_filename):
    fig, axes = plt.subplots(ncols=len(configs), nrows=1, figsize=(15, 5), squeeze=False)

    idx = 0
    for row in axes:
        for ax in row:
            config = configs[idx]
            result = results[idx]
            ax.plot(result['times_s'], result['set_points_m'], label='Set point')
            ax.plot(result['times_s'], result['displacements_m'], label='Measured displacement')
            # ax.text(0.95, 0.5, f'$K_P={config["p"]}, K_I={config["i"]}, K_D={config["d"]}$',
            #     verticalalignment='bottom', horizontalalignment='right',
            #     transform=ax.transAxes, fontsize=12)
            ax.set_xlabel('Time [s]')
            ax.set_ylabel('Displacement [m]')
            ax.set_title(f'Response of System\n$K_P={config["p"]}, K_I={config["i"]}, K_D={config["d"]}$')
            ax.legend()
            idx += 1

    fig.set_tight_layout(True)
    plt.savefig(SCRIPT_DIR / plot_filename)

class IntegralLimitModes(Enum):
    NONE = 'None'
    CONSTANT_LIMITED = 'Constant Limited'
    OUTPUT_LIMITED = 'Output Limited'

class DerivativeKickReduction(Enum):
    pass

class PidParallelForm:
    def __init__(self, pConstant, iConstant, dConstant):
        self.pConstant = pConstant
        self.iConstant = iConstant
        self.dConstant = dConstant

        self.setPoint = 0.0
        self.iValue = 0.0
        self.previousError = 0.0

        # Integral limiting (default to OFF)
        self.integralLimitSettings = {}
        self.integralLimitSettings['mode'] = IntegralLimitModes.NONE

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
        if options['mode'] == IntegralLimitModes.CONSTANT_LIMITED:
            if ('min' not in options) or ('max' not in options):
                raise RuntimeError('Provided options must have min and ' + \
                                   ' max property when mode === CONSTANT_LIMITED.')
            
        elif options['mode'] == IntegralLimitModes.OUTPUT_LIMITED:
            # Output limiting has to be enabled for this mode to work
            if not self.enableOutputLimiting:
                raise RuntimeError('Integral limiting set to OUTPUT_LIMITED but output limiting is not enabled.')                

        self.integralLimitSettings = options

    def run(self, currentValue, deltaTime_s):
        """
        Perform one iteration of the PID control.
        """
        # console.log('Pid.run() called. currentValue = ' + currentValue + ', deltaTime_s = ' + deltaTime_s)

        # Error positive if we need to "go forward"
        error = self.setPoint - currentValue
        # console.log('error = ' + error)

        # Proportional control
        pValue = error * self.pConstant
        # console.log('pValue = ' + pValue)

        # Integral control
        self.iValue += error * deltaTime_s * self.iConstant
        # console.log('iValue (before limiting) = ' + self.iValue)

        # Limit integral control
        # console.log('self.integralLimitSettings =')
        # console.log(self.integralLimitSettings)
        if self.integralLimitSettings['mode'] == IntegralLimitModes.CONSTANT_LIMITED:
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
                if self.integralLimitSettings['mode'] == IntegralLimitModes.OUTPUT_LIMITED:
                    self.limitIntegralTerm(output)
                
                output = self.outputLimMax
            elif output < self.outputLimMin:
                # console.log('Desired output (' + output + ') is below min. limit (' + self.outputLimMin + '.')
                if self.integralLimitSettings['mode'] == IntegralLimitModes.OUTPUT_LIMITED:
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

    def __init__(self, mass_kg=1.0, springConstantK_Npm=20.0, dampingCoefficientC_NsPm=10.0):
        self.mass_kg = mass_kg
        self.springConstantK_NPm = springConstantK_Npm
        self.dampingCoefficientC_NsPm = dampingCoefficientC_NsPm

        self.displacement_m = 0.0
        self.velocity_mPs = 0.0

    def update(self, controlVariable, timeStep_s):
        # print(f'update() called with controlVariable(external force)={controlVariable}, timeStep_s={timeStep_s}.')

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

def run_simulation(p, i, d, time_step_s=10e-3, num_steps_delay=0,  mass_kg=1.0, springConstantK_Npm=20.0, dampingCoefficientC_NsPm=10.0):
    """
    Returns:
    """

    pid = PidParallelForm(p, i, d)
    pid.setOutputLimits(True, -1000, 1000)

    smd = SpringMassDamper(mass_kg=mass_kg, springConstantK_Npm=springConstantK_Npm, dampingCoefficientC_NsPm=dampingCoefficientC_NsPm)

    start_time_s = 0.0
    end_time_s = 4.0
    time_step_s = 10e-3

    impulse_time_s = 1.0
    impulse_displacement_m = 1

    curr_time_s = start_time_s

    # We need 1 element even if we want no delay. Additional elements create delays.
    delayed_control_values_N = [0]*(num_steps_delay + 1)

    # Start with a set point = 0m
    pid.setSetPoint(0)
    control_value_N = 0
    displacement_m = 0

    return_vals = {
        'times_s': [],
        'set_points_m': [],
        'displacements_m': [],

        'p_term_vals': [],
        'i_term_vals': [],
        'd_term_vals': [],
        'output': [],
    }

    while curr_time_s <= end_time_s:
        if curr_time_s >= impulse_time_s:
            pid.setSetPoint(impulse_displacement_m)
        return_vals['set_points_m'].append(pid.setPoint)

        # Calculate the external force by running the PID block
        control_value_N = pid.run(displacement_m, time_step_s)

        # Insert value onto start of delay list
        delayed_control_values_N.insert(0, control_value_N)

        last_pid_terms = pid.getLastTerms()
        return_vals['p_term_vals'].append(last_pid_terms['p'])
        return_vals['i_term_vals'].append(last_pid_terms['i'])
        return_vals['d_term_vals'].append(last_pid_terms['d'])
        return_vals['output'].append(last_pid_terms['output'])
        
        # Pop value at end of delay list
        displacement_m = smd.update(delayed_control_values_N.pop(), time_step_s)
        
        return_vals['times_s'].append(curr_time_s)
        return_vals['displacements_m'].append(displacement_m)
        
        curr_time_s += time_step_s

    return return_vals

def create_response_and_pid_terms_plots(config, results):
    fig, axes = plt.subplots(ncols=2, nrows=1, figsize=(10, 5))
    ax = axes[0]
    ax.plot(results['times_s'], results['set_points_m'], label='Set point')
    ax.plot(results['times_s'], results['displacements_m'], label='Measured displacement')
    ax.text(0.95, 0.5, f'$K_P={config["p"]}, K_I={config["i"]}, K_D={config["d"]}$',
        verticalalignment='bottom', horizontalalignment='right',
        transform=ax.transAxes, fontsize=12)
    ax.set_xlabel('Time [s]')
    ax.set_ylabel('Displacement [m]')
    ax.set_title('Response of System')
    ax.legend()

    # Plot P, I, D terms on second axes (lower)
    ax = axes[1]
    ax.plot(results['times_s'], results['p_term_vals'], label='P Term')
    ax.plot(results['times_s'], results['i_term_vals'], label='I Term')
    ax.plot(results['times_s'], results['d_term_vals'], label='D Term')
    ax.plot(results['times_s'], results['output'], label='Output')
    ax.set_xlabel('Time [s]')
    ax.set_ylabel('Force [N] (CV)')
    ax.set_title('Values of PID Terms and Output (CV)')
    ax.legend()

    fig.set_tight_layout(True)
    plt.savefig(SCRIPT_DIR / config['plot_filename'])


if __name__ == '__main__':
    main()