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
  offset?: number;
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

export type StatisticsDataType = {
  date: string;
  impressions: number;
  clicks: number;
  money: number;
};

export type ResponseDataType = {
  count: number;
  rows: StatisticsDataType[];
  total: SummarizedDataType;
};
