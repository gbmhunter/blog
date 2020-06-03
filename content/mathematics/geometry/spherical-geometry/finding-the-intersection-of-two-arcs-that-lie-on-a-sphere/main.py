import numpy as np

# Cordinates in geodesic form: [ lat, lon ]
# lat, lon are both in degrees
line1_p1_geo = np.array([10, 20])
line1_p2_geo = np.array([60, 90])

line2_p1_geo = np.array([50, 10])
line2_p2_geo = np.array([5, 80])

def geodesic_to_spherical(geodesic_coords):
    lat, lon = np.deg2rad(geodesic_coords[0]), np.deg2rad(geodesic_coords[1])
    R = 6371 # radius of the earth
    x = R * np.cos(lat) * np.cos(lon)
    y = R * np.cos(lat) * np.sin(lon)
    z = R * np.sin(lat)
    return np.array([ x, y, z ])


line1_p1_sph = geodesic_to_spherical(line1_p1_geo)
line1_p2_sph = geodesic_to_spherical(line1_p2_geo)
line2_p1_sph = geodesic_to_spherical(line2_p1_geo)
line2_p2_sph = geodesic_to_spherical(line2_p2_geo)

print(f'line1_p1_sph={line1_p1_sph}')
print(f'line1_p2_sph={line1_p2_sph}')
print(f'line2_p1_sph={line2_p1_sph}')
print(f'line2_p2_sph={line2_p2_sph}')

n1 = np.cross(line1_p1_sph, line1_p2_sph)
n2 = np.cross(line2_p1_sph, line2_p2_sph)

print(f'n1={n1}')
print(f'n2={n2}')

n1_cross_n2 = np.cross(n1, n2)

print(f'n1_cross_n2={n1_cross_n2}')

norm = np.linalg.norm(n1_cross_n2)
print(f'norm={norm}')

i_1 = n1_cross_n2/norm
print(f'i_1={i_1}')

i_2 = -1*i_1
print(f'i_2={i_2}')

# Check if intersecting points are within the original arc segment

def calc_angle(vector_1, vector_2):
    theta = np.arccos(np.dot(vector_1, vector_2)/(np.linalg.norm(vector_1)*np.linalg.norm(vector_2)))
    return theta

def check_if_point_intersects_arc(point, arc_point_1, arc_point_2):
    theta_a1_point = calc_angle(arc_point_1, point)
    theta_a2_point = calc_angle(arc_point_2, point)
    theta_a1_a2 = calc_angle(arc_point_1, arc_point_2)
    print(f'theta_a1_point(deg)={np.rad2deg(theta_a1_point)}')
    print(f'theta_a2_point(deg)={np.rad2deg(theta_a2_point)}')
    print(f'theta_a1_a2(deg)={np.rad2deg(theta_a1_a2)}')

    should_be_zero = theta_a1_a2 - theta_a1_point - theta_a2_point
    print(f'should_be_zero={np.rad2deg(should_be_zero)}')

    # Due to floating point precision the value might be slightly off zero
    if should_be_zero > -1e-9 and should_be_zero < 1e-9:
        return True
    else:
        return False

for potential_intersection_point in [ i_1, i_2]:
    print(f'Checking if point {potential_intersection_point} intersects with arc A1...')
    test_1 = check_if_point_intersects_arc(potential_intersection_point, line1_p1_sph, line1_p2_sph)
    print(f'Checking if point {potential_intersection_point} intersects with arc A2...')
    test_2 = check_if_point_intersects_arc(potential_intersection_point, line2_p1_sph, line2_p2_sph)
    if test_1 and test_2:
        print(f'The arcs intersect at point {potential_intersection_point}.')
    else:
        print(f'The arcs DON\'T intersect at point {potential_intersection_point}.')