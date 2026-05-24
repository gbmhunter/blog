// Aggregates every widget's exported catalog entry. To add a new calculator to
// the /calculators/ index, create a `catalog.js` in its widget folder that
// exports a `catalog` constant, then import it here.

import { catalog as bleAdvDecoder } from '../calculators/ble-adv-decoder/catalog.js';
import { catalog as crcCalculator } from '../calculators/crc-calculator/catalog.js';
import { catalog as eSeriesFinder } from '../calculators/e-series-finder/catalog.js';
import { catalog as eirpComplianceMap } from '../calculators/eirp-compliance-map/catalog.js';
import { catalog as gainConverter } from '../calculators/gain-converter/catalog.js';
import { catalog as parallelCapacitance } from '../calculators/parallel-capacitance/catalog.js';
import { catalog as parallelResistance } from '../calculators/parallel-resistance/catalog.js';
import { catalog as resistorDivider } from '../calculators/resistor-divider/catalog.js';
import { catalog as seriesCapacitance } from '../calculators/series-capacitance/catalog.js';
import { catalog as seriesResistance } from '../calculators/series-resistance/catalog.js';

export const CATALOGS = [
  bleAdvDecoder,
  crcCalculator,
  eSeriesFinder,
  eirpComplianceMap,
  gainConverter,
  parallelCapacitance,
  parallelResistance,
  resistorDivider,
  seriesCapacitance,
  seriesResistance,
];
