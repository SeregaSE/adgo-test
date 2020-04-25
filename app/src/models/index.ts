export enum PlatformLabel {
  Desktop = 'Desktop',
  Mobile = 'Mobile'
}

export enum PlatformValue {
  Desktop = 1,
  Mobile = 2
}

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
  OperatingSystems = 'operatingSystems[]'
}
