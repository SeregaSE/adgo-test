export enum GroupBy {
  Day = 'day',
  Platform = 'platform',
  OperatingSystem = 'operatingSystem',
  Browser = 'browser'
}

export enum FilterField {
  GroupBy = 'groupBy',
  FromDate = 'from',
  ToDate = 'to',
  Browser = 'browsers[]',
  Platform= 'platform',
  OperatingSystems = 'operatingSystems[]',
  Limit = 'limit',
  Offset = 'offset'
}
