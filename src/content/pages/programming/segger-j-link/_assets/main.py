import matplotlib.pyplot as plt
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def main():
    data = {
        'RTT': 1,
        'SWO': 120,
        'Semihosting': 10700,
    }

    # Plot data
    fig, ax = plt.subplots()
    ax.bar(list(data.keys()), list(data.values()))
    ax.set_xlabel('Method')
    ax.set_ylabel('Time To Output 82 Chars (us)')
    ax.set_title('Comparison of RTT, SWO and Semihosting')
    ax.set_yscale('log')
    fig.tight_layout()
    fig.savefig(SCRIPT_DIR / 'comparison-of-rtt-swo-and-semihosting.png')

if __name__ == "__main__":
    main()