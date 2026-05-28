// Aggregates every widget's exported catalog entry. To add a new calculator to
// the /calculators/ index, create a `catalog.js` in its widget folder that
// exports a `catalog` constant, then import it here.

import { catalog as bleAdvDecoder } from '../calculators/ble-adv-decoder/catalog.js';
import { catalog as boostConverter } from '../calculators/boost-converter/catalog.js';
import { catalog as buckConverter } from '../calculators/buck-converter/catalog.js';
import { catalog as capacitorCharge } from '../calculators/capacitor-charge/catalog.js';
import { catalog as crcCalculator } from '../calculators/crc-calculator/catalog.js';
import { catalog as dewPointMagnus } from '../calculators/dew-point-magnus/catalog.js';
import { catalog as eSeriesFinder } from '../calculators/e-series-finder/catalog.js';
import { catalog as eirpComplianceMap } from '../calculators/eirp-compliance-map/catalog.js';
import { catalog as gainConverter } from '../calculators/gain-converter/catalog.js';
import { catalog as ledResistor } from '../calculators/led-resistor/catalog.js';
import { catalog as lowPassRcFilter } from '../calculators/low-pass-rc-filter/catalog.js';
import { catalog as microstripImpedance } from '../calculators/microstrip-impedance/catalog.js';
import { catalog as movingAverageFilter } from '../calculators/moving-average-filter/catalog.js';
import { catalog as mp4558DesignTool } from '../calculators/mp4558-design-tool/catalog.js';
import { catalog as ntcThermistor } from '../calculators/ntc-thermistor/catalog.js';
import { catalog as ohmsLaw } from '../calculators/ohms-law/catalog.js';
import { catalog as parallelCapacitance } from '../calculators/parallel-capacitance/catalog.js';
import { catalog as parallelResistance } from '../calculators/parallel-resistance/catalog.js';
import { catalog as resistorDivider } from '../calculators/resistor-divider/catalog.js';
import { catalog as rotations3d } from '../calculators/3d-rotations/catalog.js';
import { catalog as seriesCapacitance } from '../calculators/series-capacitance/catalog.js';
import { catalog as seriesResistance } from '../calculators/series-resistance/catalog.js';
import { catalog as timer555Astable } from '../calculators/timer-555-astable/catalog.js';
import { catalog as trackCurrentIpc2152 } from '../calculators/track-current-ipc2152/catalog.js';
import { catalog as trackCurrentIpc2221a } from '../calculators/track-current-ipc2221a/catalog.js';
import { catalog as viaCurrentIpc2221a } from '../calculators/via-current-ipc2221a/catalog.js';
import { catalog as viaThermalResistance } from '../calculators/via-thermal-resistance/catalog.js';
import { catalog as wireGauge } from '../calculators/wire-gauge/catalog.js';

export const CATALOGS = [
  bleAdvDecoder,
  boostConverter,
  buckConverter,
  capacitorCharge,
  crcCalculator,
  dewPointMagnus,
  eSeriesFinder,
  eirpComplianceMap,
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
  seriesCapacitance,
  seriesResistance,
  timer555Astable,
  trackCurrentIpc2152,
  trackCurrentIpc2221a,
  viaCurrentIpc2221a,
  viaThermalResistance,
  wireGauge,
];
