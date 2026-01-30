"""
Generate plots demonstrating PWM dithering.
"""

from typing import List, Tuple
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

def generate_dithering_sequence(
    target_duty_cycle: float,
    base_resolution: float,
    sequence_length: int
) -> Tuple[List[float], float]:
    """
    Generate a dithering sequence to achieve a target duty cycle.
    
    Args:
        target_duty_cycle: The desired duty cycle as a fraction (e.g., 0.523 for 52.3%)
        base_resolution: The resolution of the base PWM (e.g., 0.01 for 1% steps)
        sequence_length: The length of the dithering sequence (e.g., 4)
    
    Returns:
        sequence: List of duty cycle values in the dithering sequence
        achieved_average: The actual average duty cycle achieved
    """
    # Find the two adjacent duty cycle values
    lower_value = np.floor(target_duty_cycle / base_resolution) * base_resolution
    upper_value = lower_value + base_resolution
    
    # Calculate how many of each value we need
    # We want: (num_lower * lower_value + num_upper * upper_value) / sequence_length ≈ target
    # Where: num_lower + num_upper = sequence_length
    # Solving: num_upper = (target - lower_value) * sequence_length / base_resolution
    num_upper_exact = (target_duty_cycle - lower_value) * sequence_length / base_resolution
    num_upper = round(num_upper_exact)
    num_lower = sequence_length - num_upper
    
    # Create the sequence with evenly distributed upper values
    # This gives better performance than clustering them together
    if num_upper == 0:
        sequence = [lower_value] * sequence_length
    elif num_upper == sequence_length:
        sequence = [upper_value] * sequence_length
    else:
        # Distribute upper values evenly using a Bresenham-like algorithm
        sequence = []
        error = sequence_length / 2
        upper_remaining = num_upper
        
        for i in range(sequence_length):
            error -= num_upper
            if error < 0:
                sequence.append(upper_value)
                error += sequence_length
                upper_remaining -= 1
            else:
                sequence.append(lower_value)
    
    achieved_average = float(np.mean(sequence))
    
    return sequence, achieved_average

def demonstrate_dithering_sequence_generation() -> None:
    """Demonstrate how to generate dithering sequences using clock cycles."""
    print("\n" + "="*70)
    print("PWM DITHERING SEQUENCE GENERATION")
    print("="*70)
    
    # Example 1: 16 MHz clock, 100 kHz PWM, target 23.6% duty cycle
    print("\nExample 1: Achieve 23.6% duty cycle")
    print("-" * 70)
    clock_freq = 16e6  # 16 MHz
    pwm_freq = 100e3   # 100 kHz
    clocks_per_period = int(clock_freq / pwm_freq)  # 160 clock cycles
    base_resolution = 1.0 / clocks_per_period  # 1/160 = 0.00625
    
    target_duty_cycle = 0.236  # 23.6%
    target_clock_cycles = target_duty_cycle * clocks_per_period  # 37.76 clock cycles
    
    print(f"Clock frequency: {clock_freq/1e6:.0f} MHz")
    print(f"PWM frequency: {pwm_freq/1e3:.0f} kHz")
    print(f"Clock cycles per period: {clocks_per_period}")
    print(f"Base resolution: 1/{clocks_per_period} = {base_resolution:.6f}")
    print(f"Target duty cycle: {target_duty_cycle:.1%} = {target_clock_cycles:.2f} clock cycles")
    
    for seq_len in [3, 4, 5, 8, 16]:
        sequence, achieved = generate_dithering_sequence(target_duty_cycle, base_resolution, seq_len)
        achieved_clock_cycles = achieved * clocks_per_period
        error_cycles = abs(achieved_clock_cycles - target_clock_cycles)
        print(f"\nSequence length {seq_len}:")
        # Convert sequence to clock cycles for display
        sequence_cycles = [int(x * clocks_per_period) for x in sequence]
        print(f"  Sequence (clock cycles): {sequence_cycles}")
        print(f"  Achieved: {achieved:.4%} = {achieved_clock_cycles:.2f} clock cycles")
        print(f"  Error: {error_cycles:.2f} clock cycles")
    
    # Example 2: Different target - 52.3% duty cycle
    print("\n" + "="*70)
    print("\nExample 2: Achieve 52.3% duty cycle")
    print("-" * 70)
    print(f"Using same PWM setup: {clocks_per_period} clock cycles per period")
    
    target_duty_cycle = 0.523  # 52.3%
    target_clock_cycles = target_duty_cycle * clocks_per_period  # 83.68 clock cycles
    
    print(f"Target duty cycle: {target_duty_cycle:.1%} = {target_clock_cycles:.2f} clock cycles")
    
    for seq_len in [4, 5, 8, 16]:
        sequence, achieved = generate_dithering_sequence(target_duty_cycle, base_resolution, seq_len)
        achieved_clock_cycles = achieved * clocks_per_period
        error_cycles = abs(achieved_clock_cycles - target_clock_cycles)
        print(f"\nSequence length {seq_len}:")
        sequence_cycles = [int(x * clocks_per_period) for x in sequence]
        print(f"  Sequence (clock cycles): {sequence_cycles}")
        print(f"  Achieved: {achieved:.4%} = {achieved_clock_cycles:.2f} clock cycles")
        print(f"  Error: {error_cycles:.2f} clock cycles")
    
    print("\n" + "="*70)

def generate_pwm_signal(
    duty_cycle: float,
    num_periods: int,
    samples_per_period: int = 100
) -> np.ndarray:
    """Generate a PWM signal with given duty cycle."""
    signal = []
    for _ in range(num_periods):
        period = np.concatenate([
            np.ones(int(samples_per_period * duty_cycle)),
            np.zeros(int(samples_per_period * (1 - duty_cycle)))
        ])
        signal.extend(period)
    return np.array(signal)

def generate_dithered_pwm(
    duty_cycles: List[float],
    samples_per_period: int = 100
) -> np.ndarray:
    """Generate a dithered PWM signal from a sequence of duty cycles."""
    signal = []
    for duty_cycle in duty_cycles:
        period = np.concatenate([
            np.ones(int(samples_per_period * duty_cycle)),
            np.zeros(int(samples_per_period * (1 - duty_cycle)))
        ])
        signal.extend(period)
    return np.array(signal)

def plot_pwm_basic_diagram() -> None:
    """Create a basic PWM diagram suitable for the introduction on the PWM page."""
    duty_cycle = 0.25
    num_periods = 3
    samples_per_period = 200
    v_high = 1.0
    v_low = 0.0

    # Build one period: on for duty_cycle, off for (1 - duty_cycle)
    t_period = np.linspace(0, 1, samples_per_period, endpoint=False)
    one_period = np.where(t_period < duty_cycle, v_high, v_low)
    t_full = np.linspace(0, num_periods, num_periods * samples_per_period, endpoint=False)
    signal = np.tile(one_period, num_periods)

    fig, ax = plt.subplots(figsize=(10, 4))
    ax.plot(t_full, signal, color='#2E86AB', linewidth=2)
    ax.set_ylim(v_low - 0.15, v_high + 0.15)
    ax.set_xlim(-0.05, num_periods + 0.05)
    ax.set_xlabel('Time [µs]', fontsize=11)
    ax.set_ylabel('Voltage [V]', fontsize=11)
    ax.set_title('Pulse Width Modulation (PWM) Signal', fontsize=12, fontweight='bold')
    ax.grid(True, alpha=0.3)
    ax.set_yticks([v_low, v_high])
    ax.set_yticklabels(['Low', 'High'])

    # Label showing duty cycle
    ax.text(0.98, 0.95, f'Duty cycle = {duty_cycle:.0%}', transform=ax.transAxes,
            fontsize=11, ha='right', va='top',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='gray', alpha=0.9))

    # Annotate period and on-time for the first period
    ax.annotate(
        '', xy=(1, -0.08), xytext=(0, -0.08),
        arrowprops=dict(arrowstyle='<->', color='black', lw=1.5)
    )
    ax.text(0.5, -0.14, 'Period (T)', ha='center', fontsize=10)
    ax.annotate(
        '', xy=(duty_cycle, -0.08), xytext=(0, -0.08),
        arrowprops=dict(arrowstyle='<->', color='#A23B72', lw=1.5)
    )
    ax.text(duty_cycle / 2, -0.14, 'On time', ha='center', fontsize=10, color='#A23B72')

    plt.tight_layout()
    output_path = Path(__file__).parent / 'pwm-basic-diagram.png'
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f'Saved: {output_path}')
    plt.close()

def plot_pwm_dithering_comparison() -> None:
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

def main() -> None:
    """Generate all plots and demonstrations."""
    # Basic PWM diagram for introduction
    print("Generating PWM basic diagram...")
    plot_pwm_basic_diagram()
    # Demonstrate dithering sequence generation
    demonstrate_dithering_sequence_generation()
    # Generate plots
    print("\nGenerating PWM dithering plots...")
    plot_pwm_dithering_comparison()
    print("Done!")

if __name__ == '__main__':
    main()
