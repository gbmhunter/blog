// Aggregates every widget's exported catalog entry. To add a new calculator to
// the /calculators/ index, create a `catalog.js` in its widget folder that
// exports a `catalog` constant, then import it here.

import { catalog as bleAdvDecoder } from '../ble-adv-decoder/catalog.js';
import { catalog as eSeriesFinder } from '../e-series-finder/catalog.js';
import { catalog as eirpComplianceMap } from '../eirp-compliance-map/catalog.js';
import { catalog as gainConverter } from '../gain-converter/catalog.js';
import { catalog as parallelCapacitance } from '../parallel-capacitance/catalog.js';
import { catalog as parallelResistance } from '../parallel-resistance/catalog.js';
import { catalog as resistorDivider } from '../resistor-divider/catalog.js';
import { catalog as seriesCapacitance } from '../series-capacitance/catalog.js';
import { catalog as seriesResistance } from '../series-resistance/catalog.js';

export const CATALOGS = [
  bleAdvDecoder,
  eSeriesFinder,
  eirpComplianceMap,
  gainConverter,
  parallelCapacitance,
  parallelResistance,
  resistorDivider,
  seriesCapacitance,
  seriesResistance,
];
