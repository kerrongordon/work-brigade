export const constituencies: Constituency[] = [
  {name: 'St. Mark', abbreviation: 'SM'},
  {name: 'St. John', abbreviation: 'SJ'},
  {name: 'St. David', abbreviation: 'SD'},
  {name: 'St. George South', abbreviation: 'SGS'},
  {name: 'St. Patrick West', abbreviation: 'SPW'},
  {name: 'St. Patrick East', abbreviation: 'SPE'},
  {name: 'St. Andrew North East', abbreviation: 'SANE'},
  {name: 'St. Andrew North West', abbreviation: 'SANW'},
  {name: 'St. Andrew South East', abbreviation: 'SASE'},
  {name: 'St. Andrew South West', abbreviation: 'SASW'},
  {name: 'St. George North East', abbreviation: 'SGNE'},
  {name: 'St. George North West', abbreviation: 'SGNW'},
  {name: 'St. George South East', abbreviation: 'SGSE'},
  {name: 'Carriacou & Petite Martinique', abbreviation: 'CPM'},
];

export interface Constituency {
  abbreviation: string;
  name: string;
}