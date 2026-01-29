"""
Generate plots demonstrating PWM dithering.
"""

import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

def generate_pwm_signal(duty_cycle, num_periods, samples_per_period=100):
    """Generate a PWM signal with given duty cycle."""
    signal = []
    for _ in range(num_periods):
        period = np.concatenate([
            np.ones(int(samples_per_period * duty_cycle)),
            np.zeros(int(samples_per_period * (1 - duty_cycle)))
        ])
        signal.extend(period)
    return np.array(signal)

def generate_dithered_pwm(duty_cycles, samples_per_period=100):
    """Generate a dithered PWM signal from a sequence of duty cycles."""
    signal = []
    for duty_cycle in duty_cycles:
        period = np.concatenate([
            np.ones(int(samples_per_period * duty_cycle)),
            np.zeros(int(samples_per_period * (1 - duty_cycle)))
        ])
        signal.extend(period)
    return np.array(signal)

def plot_pwm_dithering_comparison():
    """Create a plot comparing standard PWM with dithered PWM."""
    
    # Parameters
    samples_per_period = 100
    
    # Target duty cycle: 52.3% (which can't be achieved with standard PWM at low resolution)
    target_duty_cycle = 0.523
    
    # Standard PWM: Round to nearest available duty cycle (52%)
    standard_duty = 0.52
    num_periods_standard = 8
    
    # Dithered PWM: 4-period pattern (52%, 52%, 52%, 53%) repeated twice
    # This gives (3*0.52 + 1*0.53) / 4 = 0.5225 ≈ 0.523
    dithered_sequence = [0.52, 0.52, 0.52, 0.53, 0.52, 0.52, 0.52, 0.53]
    
    # Generate signals
    standard_signal = generate_pwm_signal(standard_duty, num_periods_standard, samples_per_period)
    dithered_signal = generate_dithered_pwm(dithered_sequence, samples_per_period)
    
    # Calculate time arrays
    time_standard = np.arange(len(standard_signal))
    time_dithered = np.arange(len(dithered_signal))
    
    # Create figure
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 6))
    
    # Plot 1: Standard PWM at 50%
    ax1.plot(time_standard, standard_signal, linewidth=1.5, color='#2E86AB')
    ax1.fill_between(time_standard, 0, standard_signal, alpha=0.3, color='#2E86AB')
    ax1.set_xlabel('Time [µs]', fontsize=11)
    ax1.set_ylabel('Voltage [V]', fontsize=11)
    ax1.set_title('Standard PWM at 52% Duty Cycle (closest available duty cycle to target of 52.3%)', fontsize=12, fontweight='bold')
    ax1.set_ylim(-0.1, 1.3)
    ax1.set_xlim(0, len(standard_signal))
    ax1.grid(True, alpha=0.3)
    ax1.axhline(y=standard_duty, color='red', linestyle='--', linewidth=2, label=f'Average = {standard_duty:.2%}')
    ax1.legend(loc='lower right')
    
    # Add period markers
    for i in range(num_periods_standard + 1):
        ax1.axvline(x=i*samples_per_period, color='gray', linestyle=':', alpha=0.5)
    
    # Annotate each period with its duty cycle
    for i in range(num_periods_standard):
        ax1.text(i*samples_per_period + samples_per_period/2, 1.15, f'{standard_duty:.0%}', 
                ha='center', va='center', fontsize=9, color='#2E86AB', fontweight='bold')
    
    # Plot 2: Dithered PWM
    ax2.plot(time_dithered, dithered_signal, linewidth=1.5, color='#A23B72')
    ax2.fill_between(time_dithered, 0, dithered_signal, alpha=0.3, color='#A23B72')
    ax2.set_xlabel('Time [µs]', fontsize=11)
    ax2.set_ylabel('Voltage [V]', fontsize=11)
    ax2.set_title('Dithered PWM (4-period pattern: 52%, 52%, 52%, 53%)', fontsize=12, fontweight='bold')
    ax2.set_ylim(-0.1, 1.3)
    ax2.set_xlim(0, len(dithered_signal))
    ax2.grid(True, alpha=0.3)
    # Calculate actual average of dithered sequence
    actual_average = np.mean(dithered_sequence)
    ax2.axhline(y=actual_average, color='red', linestyle='--', linewidth=2, label=f'Average = {actual_average:.2%}')
    ax2.legend(loc='lower right')
    
    # Add period markers and duty cycle annotations
    for i in range(len(dithered_sequence) + 1):
        ax2.axvline(x=i*samples_per_period, color='gray', linestyle=':', alpha=0.5)
    
    # Annotate each period with its duty cycle
    for i, duty in enumerate(dithered_sequence):
        # Use orange color for 53% to make it stand out
        label_color = '#FF6B35' if duty == 0.53 else '#A23B72'
        ax2.text(i*samples_per_period + samples_per_period/2, 1.15, f'{duty:.0%}', 
                ha='center', va='center', fontsize=9, color=label_color, fontweight='bold')
    
    plt.tight_layout()
    
    # Save the figure
    output_path = Path(__file__).parent / 'pwm-dithering-comparison.png'
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f'Saved: {output_path}')
    plt.close()

def main():
    """Generate all plots."""
    print("Generating PWM dithering plots...")
    plot_pwm_dithering_comparison()
    print("Done!")

if __name__ == '__main__':
    main()
