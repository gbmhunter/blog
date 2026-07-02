import math

def main():
    print(toEuler(1.0, 1.0, 0.0, 45.0, use_degrees=True))

def toEuler(x: float, y: float, z: float, angle: float, use_degrees=False):

    if use_degrees:
        angle = math.radians(angle)

    s = math.sin(angle)
    c = math.cos(angle)
    t = 1 - c
    # if axis is not already normalised then uncomment this
    magnitude = math.sqrt(x*x + y*y + z*z)
    if magnitude == 0:
        raise RuntimeError

    x /= magnitude
    y /= magnitude
    z /= magnitude

    if (x*y*t + z*s) > 0.998: # north pole singularity detected
    	heading = 2*math.atan2(x*math.sin(angle/2), math.cos(angle/2))
    	attitude = math.PI/2
    	bank = 0
    	return
	
    if (x*y*t + z*s) < -0.998: # south pole singularity detected
    	heading = -2*math.atan2(x*math.sin(angle/2), math.cos(angle/2))
    	attitude = -math.PI/2
    	bank = 0
    	return
	
    heading = math.atan2(y * s- x * z * t, 1 - (y*y+ z*z) * t)
    attitude = math.asin(x * y * t + z * s)
    bank = math.atan2(x * s - y * z * t , 1 - (x*x + z*z) * t)

    if use_degrees:
        heading = math.degrees(heading)
        attitude = math.degrees(attitude)
        bank = math.degrees(bank)

    return bank, attitude, heading

if __name__ == '__main__':
    main()