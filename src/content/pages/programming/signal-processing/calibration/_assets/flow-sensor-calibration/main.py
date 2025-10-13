# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "matplotlib",
#     "numpy",
#     "pandas",
# ]
# ///


import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from pathlib import Path


def main() -> None:
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    data_file = script_dir / "data.csv"

    # Read the CSV data
    df = pd.read_csv(data_file)
    x = df["measured_frequency_hz"].values
    y = df["actual_flow_rate_lpm"].values

    # Plot 1: Raw data scatter plot
    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, alpha=0.6, s=50)
    plt.xlabel("Measured Frequency f (Hz)", fontsize=12)
    plt.ylabel("Actual Flow Rate Q (LPM)", fontsize=12)
    plt.title("Flow Sensor Data: Frequency vs Flow Rate", fontsize=14, fontweight="bold")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()

    # Save Plot 1
    output_file_1 = script_dir / "flow-sensor-data.png"
    plt.savefig(output_file_1, dpi=150)
    print(f"Saved: {output_file_1}")
    plt.close()

    # Plot 2: Data with linear regression
    # Calculate linear regression
    coeffs = np.polyfit(x, y, 1)
    slope, intercept = coeffs

    # Calculate R² value
    y_pred = slope * x + intercept
    ss_res = np.sum((y - y_pred) ** 2)
    ss_tot = np.sum((y - np.mean(y)) ** 2)
    r_squared = 1 - (ss_res / ss_tot)

    # Create regression line for plotting
    x_line = np.linspace(x.min(), x.max(), 100)
    y_line = slope * x_line + intercept

    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, alpha=0.6, s=50, label="Measured Data")
    plt.plot(x_line, y_line, 'r-', linewidth=2, label="Linear Fit")

    # Add equation and R² to plot
    equation_text = f"Q = {slope:.3g}f + {intercept:.3g}\nR² = {r_squared:.3g}"
    plt.text(0.05, 0.95, equation_text, transform=plt.gca().transAxes,
             fontsize=11, verticalalignment='top',
             bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

    plt.xlabel("Measured Frequency f (Hz)", fontsize=12)
    plt.ylabel("Actual Flow Rate Q (LPM)", fontsize=12)
    plt.title("Flow Sensor Calibration: Frequency vs Flow Rate", fontsize=14, fontweight="bold")
    plt.legend(loc="lower right")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()

    # Save Plot 2
    output_file_2 = script_dir / "flow-sensor-calibration.png"
    plt.savefig(output_file_2, dpi=150)
    print(f"Saved: {output_file_2}")
    plt.close()

    print(f"\nCalibration equation: Q = {slope:.3g}f + {intercept:.3g}")
    print(f"R² = {r_squared:.3g}")

    # Plot 3: Data with linear regression (excluding zero frequency points)
    # Filter out points where frequency is 0
    mask = x != 0
    x_filtered = x[mask]
    y_filtered = y[mask]

    # Calculate linear regression on filtered data
    coeffs_filtered = np.polyfit(x_filtered, y_filtered, 1)
    slope_filtered, intercept_filtered = coeffs_filtered

    # Calculate R² value for filtered data
    y_pred_filtered = slope_filtered * x_filtered + intercept_filtered
    ss_res_filtered = np.sum((y_filtered - y_pred_filtered) ** 2)
    ss_tot_filtered = np.sum((y_filtered - np.mean(y_filtered)) ** 2)
    r_squared_filtered = 1 - (ss_res_filtered / ss_tot_filtered)

    # Create regression line for plotting
    x_line_filtered = np.linspace(x_filtered.min(), x_filtered.max(), 100)
    y_line_filtered = slope_filtered * x_line_filtered + intercept_filtered

    plt.figure(figsize=(10, 6))
    # Plot all data points
    plt.scatter(x[~mask], y[~mask], alpha=0.6, s=50, label="Zero Frequency Data", color="gray")
    plt.scatter(x_filtered, y_filtered, alpha=0.6, s=50, label="Non-Zero Frequency Data")
    plt.plot(x_line_filtered, y_line_filtered, 'r-', linewidth=2, label="Linear Fit (non-zero only)")

    # Add equation and R² to plot
    equation_text_filtered = f"Q = {slope_filtered:.3g}f + {intercept_filtered:.3g}\nR² = {r_squared_filtered:.3g}"
    plt.text(0.05, 0.95, equation_text_filtered, transform=plt.gca().transAxes,
             fontsize=11, verticalalignment='top',
             bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

    plt.xlabel("Measured Frequency f (Hz)", fontsize=12)
    plt.ylabel("Actual Flow Rate Q (LPM)", fontsize=12)
    plt.title("Flow Sensor Calibration: Frequency vs Flow Rate (Non-Zero Fit)", fontsize=14, fontweight="bold")
    plt.legend(loc="lower right")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()

    # Save Plot 3
    output_file_3 = script_dir / "flow-sensor-calibration-nonzero.png"
    plt.savefig(output_file_3, dpi=150)
    print(f"Saved: {output_file_3}")
    plt.close()

    print(f"\nCalibration equation (non-zero only): Q = {slope_filtered:.3g}f + {intercept_filtered:.3g}")
    print(f"R² (non-zero only) = {r_squared_filtered:.3g}")


if __name__ == "__main__":
    main()
