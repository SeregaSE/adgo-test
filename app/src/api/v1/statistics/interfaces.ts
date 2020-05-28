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
    groupBy: string
    from: string
    to: string
    limit: number
    offset: number
    platform: string
    browsers: string | string[]
    operatingSystems: string | string[]
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
