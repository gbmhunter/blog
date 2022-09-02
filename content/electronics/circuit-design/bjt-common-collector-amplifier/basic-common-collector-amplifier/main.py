from pathlib import Path
import re
import matplotlib.pyplot as plt

import util

SCRIPT_DIR = Path(__file__).parent

def main():
    micro_cap_output_path = SCRIPT_DIR / 'circuit.TNO'
    with micro_cap_output_path.open() as f:
        lines = f.readlines()

    data = {}

    for i in range(len(lines)):
        line = lines[i]
        match = re.fullmatch('Interpolated Waveform Values\n', line)
        
        if match is not None:
            curr_line_of_data = i + 4
            time_s = []
            v_in_V = []
            v_out_V = []
            while(True):
                if lines[curr_line_of_data] == '\n':
                    break
                # Extract Ic and Vce
                match = re.search(r'([^\s]+)\s+([^\s]+)\s+([^\s]+)', lines[curr_line_of_data])
                time_s.append(meter(match.group(1)))
                v_in_V.append(meter(match.group(2)))
                v_out_V.append(meter(match.group(3)))

                curr_line_of_data += 1

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(time_s, v_in_V, label="$v_{in}$")
    ax.plot(time_s, v_out_V, label="$v_{out}$")

    ax.set_xlabel('$Time\ [s]$')
    ax.set_ylabel('$Voltage\ [V]$')

    # ax.set_xlim(0, 6)

    # use set_position
    ax.spines['top'].set_color('none')
    # ax.spines['left'].set_position('zero')
    ax.spines['right'].set_color('none')
    ax.spines['bottom'].set_position('zero')
    
    ax.grid()
    ax.legend()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'plot.png')


    

if __name__ == '__main__':
    main()
