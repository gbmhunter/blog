from pathlib import Path
import re
import matplotlib.pyplot as plt

import sys 

sys.path.append('C:/Users/gbmhu/code/blog/scripts/util')
import util

SCRIPT_DIR = Path(__file__).parent

prefix = {"y":1e-24, "z":1e-21, "a":1e-18, "f":1e-15, "p": 1e-12,
          "n":1e-9, "u":1e-6, "µ":1e-6, "m":1e-3, "c":1e-2, "d":0.1,
          "h":100, "k":1000, "M":1e6, "G":1e9, "T":1e12, "P":1e15,
          "E":1e18, "Z":1e21, "Y":1e24}

def meter(s):
    if s == '0':
        return 0
    try:
        # multiply with meter-prefix value
        return float(s[:-1])*prefix[s[-1]]
    except KeyError:
        # no or unknown meter-prefix
        return float(s)

def main():
    micro_cap_output_path = SCRIPT_DIR / 'circuit.DNO'
    with micro_cap_output_path.open() as f:
        lines = f.readlines()

    data = []

    for i in range(len(lines)):
        line = lines[i]
        match = re.fullmatch('Temperature=27 IB=(.*)\n', line)
        
        if match is not None:
            ib_A = meter(match.group(1))
            single_curve = {} 
            single_curve['ib_A'] = ib_A
            single_curve['vce_V'] = []
            single_curve['ic_A'] = []

            curr_line_of_data = i + 10
            while(True):
                if lines[curr_line_of_data] == '\n':
                    break
                # Extract Ic and Vce
                match = re.search(r'([^\s]+)\s+([^\s]+)', lines[curr_line_of_data])
                vce_V = meter(match.group(1))
                ic_A = meter(match.group(2))
                single_curve['vce_V'].append(vce_V)
                single_curve['ic_A'].append(ic_A)

                curr_line_of_data += 1

            data.append(single_curve)

    fig, ax = plt.subplots(figsize=(8, 5))
    for single_curve in data:
        ax.plot(single_curve['vce_V'], single_curve['ic_A'], label=f"$I_b={single_curve['ib_A']*1000.0:.1f}mA$")
        plt.text(single_curve['vce_V'][-1], single_curve['ic_A'][-1], f"$I_b={single_curve['ib_A']*1000.0:.1f}mA$")

    ax.set_xlabel('$V_{CE}\ [V]$')
    ax.set_ylabel('$I_{C}\ [A]$')

    ax.set_xlim(0, 6)

    # use set_position
    ax.spines['top'].set_color('none')
    # ax.spines['left'].set_position('zero')
    ax.spines['right'].set_color('none')
    ax.spines['bottom'].set_position('zero')
    
    ax.grid()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'plot.png')


    

if __name__ == '__main__':
    main()
