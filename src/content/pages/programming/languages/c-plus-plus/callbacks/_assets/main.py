import json
from pathlib import Path

import matplotlib.pyplot as plt

SCRIPT_DIR = Path(__file__).parent

ID_TO_HUMAN_NAME = {
   "basicCCallback": "Basic C Callback",
   "callbackInterfaceUsingInheritance": "Callback Interface\nUsing Inheritance",
   "callingMemberThroughStandardCFunction": "Calling Member Through\nStandard C Function",
   "callingMemberThroughStdFunction": "Calling Member\nThrough std::function",
   "callingMemberThroughStdFunctionWithBind": "Calling Member Through\nstd::function With Bind",
   "staticVariablesWithTemplating": "Static Variables With\nTemplating and Bind",
   "stdFunctionRef": "std::function_ref",
   "stdFunctionWithLambdas": "std::function With\nLambdas",
   "stdFunctionWithBind": "std::function With\nBind",
   "templatingTheMemberFunctionAndInstance": "Templating The Member\nFunction And Instance",
   "impossiblyFastDelegates": "Impossibly Fast\nDelegates",
   "naiosFunction2WithLambdas": "Naios/function2\nWith Lambdas",
}

def main():
   # Read in json file
   with open(SCRIPT_DIR / "output_no_opt.json", "r") as f:
      data = json.load(f)

   create_benchmark_plot(data, "Callback Benchmarks (No Optimizations)", "callback-benchmarks-no-opt.png")

   with open(SCRIPT_DIR / "output_opt.json", "r") as f:
      data = json.load(f)

   create_benchmark_plot(data, "Callback Benchmarks (Optimized)", "callback-benchmarks-opt.png")

def create_benchmark_plot(data: dict, title: str, filename: str):
   benchmarks = data["benchmarks"]

   benchmark_names = []
   benchmark_run_times_ns = []
   for benchmark in benchmarks:
      benchmark_names.append(ID_TO_HUMAN_NAME[benchmark["name"]])
      benchmark_run_times_ns.append(benchmark["real_time"])
      # Make sure the time_unit is ns
      assert benchmark["time_unit"] == "ns"

   # Create a list of tuples with benchmark name and run time
   benchmark_data = list(zip(benchmark_names, benchmark_run_times_ns))
   
   # Sort the data by run time (smallest to largest)
   benchmark_data.sort(key=lambda x: x[1])
   
   # Unpack the sorted data back into separate lists
   benchmark_names, benchmark_run_times_ns = zip(*benchmark_data)

   # Create bar chart
   fig, ax = plt.subplots(figsize=(10, 6))
   ax.bar(benchmark_names, benchmark_run_times_ns)
   ax.set_ylabel("Run Time (ns)")
   ax.set_xlabel("Benchmark")
   ax.set_title(title)
   # Set y-axis to logarithmic scale
   ax.set_yscale('log')
   # Rotate x-axis labels to be vertical
   plt.xticks(rotation=90)
   # Adjust layout to make room for rotated labels
   plt.tight_layout()
   # Save the plot to a file
   plt.savefig(SCRIPT_DIR / filename)

if __name__ == "__main__":
   main()
