def main():
    r_ab = 200
    r_ac = 120
    r_bc = 680

    r_a = (r_ab*r_ac) / (r_ab + r_ac + r_bc)
    r_b = (r_ab*r_bc) / (r_ab + r_ac + r_bc)
    r_c = (r_ac*r_bc) / (r_ab + r_ac + r_bc)

    print(f'r_a={r_a}, r_b={r_b}, r_c={r_c}')

    r_bot_left = 820
    r_bot_left_series = r_a + r_bot_left
    r_bot_right = 180
    r_bot_right_series = r_c + r_bot_right

    print(f'r_bot_left_series={r_bot_left_series}, r_bot_right_series={r_bot_right_series}')

    r_bot_parallel = (r_bot_left_series*r_bot_right_series) / (r_bot_left_series + r_bot_right_series)

    print(f'r_bot_parallel={r_bot_parallel}')

    single_resistor = r_b + r_bot_parallel
    print(f'single_resistor={single_resistor}')

    current = 12 / single_resistor
    print(f'current={current}')

if __name__ == '__main__':
    main()
