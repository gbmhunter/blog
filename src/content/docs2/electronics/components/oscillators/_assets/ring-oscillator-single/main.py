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
    kicad_netlist_path = directory_path.joinpath('simulation.cir')

    netlist_without_quotes_path = Path('./simulation-without-quotes.cir')
    remove_include_quotes(kicad_netlist_path, netlist_without_quotes_path)

    parser = SpiceParser(path=str(netlist_without_quotes_path))
    circuit = parser.build_circuit(ground=0)
    simulator = circuit.simulator(temperature=25, nominal_temperature=25)
    analysis = simulator.transient(step_time=10@u_us, end_time=60@u_ms)

    breakpoint()
    v_sine_out = analysis['OUT']
    # first_index_of_interest = np.where(v_sine_out.abscissa.as_ndarray() > 0.04)[0][0]

    fig, ax = plt.subplots(1, figsize=(10, 5))
    ax.plot(v_sine_out.abscissa.as_ndarray(), v_sine_out.as_ndarray())
    ax.legend(('SINE_OUT',), loc=(.8,.8))
    ax.grid()
    ax.set_xlabel('Time (s)')
    ax.set_ylabel('Voltage (V)')

    plt.tight_layout()
    plt.savefig('v-sine-out.png')

if __name__ == '__main__':
    main()