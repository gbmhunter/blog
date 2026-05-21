// ISO 3166-1 numeric code → regulatory region used by the EIRP compliance
// widget. The world-atlas TopoJSON identifies countries by these string-form
// numeric codes (e.g. "840" for the United States).
//
// Unmapped countries are rendered as "outside scope" grey on the map.

const EU_27 = [
  '040', // Austria
  '056', // Belgium
  '100', // Bulgaria
  '191', // Croatia
  '196', // Cyprus
  '203', // Czechia
  '208', // Denmark
  '233', // Estonia
  '246', // Finland
  '250', // France
  '276', // Germany
  '300', // Greece
  '348', // Hungary
  '372', // Ireland
  '380', // Italy
  '428', // Latvia
  '440', // Lithuania
  '442', // Luxembourg
  '470', // Malta
  '528', // Netherlands
  '616', // Poland
  '620', // Portugal
  '642', // Romania
  '703', // Slovakia
  '705', // Slovenia
  '724', // Spain
  '752', // Sweden
];

export const COUNTRY_TO_REGION = {
  '840': 'US',
  '124': 'CA',
  '826': 'UK',
  '036': 'AU',
  '554': 'NZ',
  '392': 'JP',
  ...Object.fromEntries(EU_27.map((code) => [code, 'EU'])),
};
