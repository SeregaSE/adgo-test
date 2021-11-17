export type PlatformDataType = {
  label: string;
  value: number;
};

export type BrowserDataType = {
  label: string;
  value: number;
  platform: number;
};

export type OperatingSystemsDataType = {
  label: string;
  value: number;
  platform: number;
};

export type GroupDataType = {
  label: string;
  value: string;
};

export type RequestFormType = {
  from: string;
  to: string;
  limit: number;
  offset: number;
  groupBy: string;
  platforms: number[];
  browsers: number[];
  operatingSystems: number[];
};

export type SummarizedDataType = {
  impressions: number;
  clicks: number;
  money: number;
};

export type StatisticsByDayType = SummarizedDataType & {
  day: string;
};

export type StatisticsByPlatformType = SummarizedDataType & {
  platform: string;
};

export type StatisticsByOSType = SummarizedDataType & {
  operatingSystem: string;
};

export type StatisticsByBrowserType = SummarizedDataType & {
  browser: string;
};

export type StatisticsDataType =
  | StatisticsByDayType
  | StatisticsByPlatformType
  | StatisticsByOSType
  | StatisticsByBrowserType;

export type StatisticsResponseDataType = {
  count: number;
  rows: StatisticsDataType[];
  total: SummarizedDataType;
};
