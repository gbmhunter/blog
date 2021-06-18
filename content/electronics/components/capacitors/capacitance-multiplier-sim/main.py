# pyspice-post-installation --install-ngspice-dll --ngspice-version=34
# OR
# Update pyspice_post_installation.py:
# NGSPICE_RELEASE_URL = NGSPICE_BASE_URL + '/ng-spice-rework/old-releases'
# Then:
# pyspice-post-installation --install-ngspice-dll --ngspice-version=32
#
"""
Change line 841 of PySpice/spice/NgSpice/shared.py to:
    if self._error_in_stdout: # or self._error_in_stderr:
        raise NgSpiceCommandError("Command '{}' failed".format(command))
"""
from pathlib import Path
import tempfile

import matplotlib.pyplot as plt
import numpy as np


import PySpice.Logging.Logging as Logging
logger = Logging.setup_logging()


from PySpice.Doc.ExampleTools import find_libraries
from PySpice.Probe.Plot import plot
from PySpice.Spice.Library import SpiceLibrary
from PySpice.Spice.Netlist import SubCircuitFactory
from PySpice.Spice.Parser import SpiceParser
from PySpice.Unit import *


from PySpice.Spice.NgSpice import Shared



def exec_command(self, command, join_lines=True):
    if len(command) > self.__MAX_COMMAND_LENGTH__:
        raise ValueError('Command must not exceed {} characters'.format(self.__MAX_COMMAND_LENGTH__))

    self._logger.debug('Execute command: {}'.format(command))

    self.clear_output()

    encoded_command = command.encode('ascii')
    rc = self._ngspice_shared.ngSpice_Command(encoded_command)

    if rc:  # Fixme: when not 0 ???
        raise NameError("ngSpice_Command '{}' returned {}".format(command, rc))

    if self._error_in_stdout: # or self._error_in_stderr:
        raise NgSpiceCommandError("Command '{}' failed".format(command))

    if join_lines:
        return self.stdout
    else:
        return self._stdout

def remove_include_quotes(netlist_path, output_file):
    with netlist_path.open() as f:
        lines = f.readlines()

    with output_file.open('w') as f:
        for line in lines:
            if line.startswith('.include'):
                line = line.replace('"', '')
            f.write(line)

def main():

    # Monkeypatch the exec_command() to not bail if it detects an 'error' in stderr,
    # these 'errors' don't seem to actually prevent the sim from working correctly
    Shared.NgSpiceShared.exec_command = exec_command

    libraries_path = find_libraries()
    spice_library = SpiceLibrary(libraries_path)

    directory_path = Path(__file__).resolve().parent
    kicad_netlist_path = directory_path.joinpath('schematic.cir')

    netlist_without_quotes_path = Path('./simulation-without-quotes.cir')
    remove_include_quotes(kicad_netlist_path, netlist_without_quotes_path)

    parser = SpiceParser(path=str(netlist_without_quotes_path))
    circuit = parser.build_circuit(ground=0)
    simulator = circuit.simulator(temperature=25, nominal_temperature=25)
    # analysis = simulator.transient(step_time=100@u_us, end_time=1000@u_ms)
    analysis = simulator.ac(start_frequency=100@u_mHz, stop_frequency=10@u_kHz, number_of_points=50,  variation='dec')

    v_out = analysis['v_out']
    mag = 20*np.log10(np.abs(v_out.as_ndarray()))
    print(mag)
    freq = analysis.frequency.as_ndarray()

    r1_Ohms = 2e3
    r2_Ohms = 10e3
    ratio = r2_Ohms / (r1_Ohms + r2_Ohms)
    ratio_dB = 20*np.log10(ratio)
    r_parallel = (r1_Ohms * r2_Ohms) / (r1_Ohms + r2_Ohms)
    c_F = 10e-6
    fc = 1 / (2*np.pi*r_parallel*c_F)
    print(ratio_dB)

    fig, ax = plt.subplots(1, figsize=(10, 7))
    ax.plot(freq, mag, label='$V_{OUT}$')
    # ax.legend(('$V_{OUT}$',), loc=(.8,.8))
    ax.grid()
    ax.set_xscale('log')
    ax.set_xlabel('Frequency (Hz)')
    ax.set_ylabel('Voltage Magnitude (dB)')
    ax.axvline(fc, color='C2', label='$f_c$')
    ax.axhline(ratio_dB, color='C1', label=f'{ratio_dB:.2f}dB (DC gain)')
    ax.axhline(ratio_dB - 3.0, color='C1', label=f'{ratio_dB - 3:.2f}dB (DC gain - 3dB)')
    ax.legend()
    plt.tight_layout()
    plt.savefig('out.png')

if __name__ == '__main__':
    main()