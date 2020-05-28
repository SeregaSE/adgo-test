export interface DataRow {
    day?: string
    platform?: string
    operatingSystem?: string
    browser?: string
    impressions: number
    clicks: number
    money: number
}

export interface SearchParams {
    groupBy: 'day' | 'browser' | 'operatingSystem' | 'platform'
    from: string
    to: string
    limit: number
    offset: number
    platform: number
    browsers: number
    operatingSystems: number
}

export interface ListItem {
    label: string
    value: number | string
    platform?: number
}

export interface Statistics {
    count: number
    rows: DataRow[]
    total: number
}

export enum Group {
    DAY = 'day',
    BROWSER = 'browser',
    OPERATING_SYSTEM = 'operatingSystem',
    PLATFORM = 'platform'
}
