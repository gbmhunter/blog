// Aggregates every widget's exported catalog entry. To add a new tool to
// the /tools/ index, create a `catalog.js` in its widget folder that
// exports a `catalog` constant, then import it here.

import { catalog as batteryLife } from '../tools/battery-life/catalog.js';
import { catalog as bleAdvDecoder } from '../tools/ble-adv-decoder/catalog.js';
import { catalog as boostConverter } from '../tools/boost-converter/catalog.js';
import { catalog as buckConverter } from '../tools/buck-converter/catalog.js';
import { catalog as capacitorCharge } from '../tools/capacitor-charge/catalog.js';
import { catalog as capacitorEnergy } from '../tools/capacitor-energy/catalog.js';
import { catalog as capacitorImpedance } from '../tools/capacitor-impedance/catalog.js';
import { catalog as cobsEncoder } from '../tools/cobs-encoder/catalog.js';
import { catalog as crcCalculator } from '../tools/crc-calculator/catalog.js';
import { catalog as dewPointMagnus } from '../tools/dew-point-magnus/catalog.js';
import { catalog as eSeriesFinder } from '../tools/e-series-finder/catalog.js';
import { catalog as eirpComplianceMap } from '../tools/eirp-compliance-map/catalog.js';
import { catalog as emaFilter } from '../tools/ema-filter/catalog.js';
import { catalog as fourierExplorer } from '../tools/fourier-explorer/catalog.js';
import { catalog as gainConverter } from '../tools/gain-converter/catalog.js';
import { catalog as ledResistor } from '../tools/led-resistor/catalog.js';
import { catalog as lowPassRcFilter } from '../tools/low-pass-rc-filter/catalog.js';
import { catalog as microstripImpedance } from '../tools/microstrip-impedance/catalog.js';
import { catalog as movingAverageFilter } from '../tools/moving-average-filter/catalog.js';
import { catalog as mp4558DesignTool } from '../tools/mp4558-design-tool/catalog.js';
import { catalog as ntcThermistor } from '../tools/ntc-thermistor/catalog.js';
import { catalog as ohmsLaw } from '../tools/ohms-law/catalog.js';
import { catalog as parallelCapacitance } from '../tools/parallel-capacitance/catalog.js';
import { catalog as parallelResistance } from '../tools/parallel-resistance/catalog.js';
import { catalog as resistorDivider } from '../tools/resistor-divider/catalog.js';
import { catalog as rotations3d } from '../tools/3d-rotations/catalog.js';
import { catalog as sallenKeyDesigner } from '../tools/sallen-key-designer/catalog.js';
import { catalog as seriesCapacitance } from '../tools/series-capacitance/catalog.js';
import { catalog as seriesResistance } from '../tools/series-resistance/catalog.js';
import { catalog as timer555Astable } from '../tools/timer-555-astable/catalog.js';
import { catalog as trackCurrentIpc2152 } from '../tools/track-current-ipc2152/catalog.js';
import { catalog as trackCurrentIpc2221a } from '../tools/track-current-ipc2221a/catalog.js';
import { catalog as viaCurrentIpc2221a } from '../tools/via-current-ipc2221a/catalog.js';
import { catalog as viaThermalResistance } from '../tools/via-thermal-resistance/catalog.js';
import { catalog as wireGauge } from '../tools/wire-gauge/catalog.js';

export const CATALOGS = [
  batteryLife,
  bleAdvDecoder,
  boostConverter,
  buckConverter,
  capacitorCharge,
  capacitorEnergy,
  capacitorImpedance,
  cobsEncoder,
  crcCalculator,
  dewPointMagnus,
  eSeriesFinder,
  eirpComplianceMap,
  emaFilter,
  fourierExplorer,
  gainConverter,
  ledResistor,
  lowPassRcFilter,
  microstripImpedance,
  movingAverageFilter,
  mp4558DesignTool,
  ntcThermistor,
  ohmsLaw,
  parallelCapacitance,
  parallelResistance,
  resistorDivider,
  rotations3d,
  sallenKeyDesigner,
  seriesCapacitance,
  seriesResistance,
  timer555Astable,
  trackCurrentIpc2152,
  trackCurrentIpc2221a,
  viaCurrentIpc2221a,
  viaThermalResistance,
  wireGauge,
];
