export const SET_GROUPS = 'SET_GROUPS';
export const SET_PLATFORMS = 'SET_PLATFORMS';
export const SET_OPERATING_SYSTEMS = 'SET_OPERATING_SYSTEM';
export const SET_BROWSERS = 'SET_BROWSER';
export const SET_STATISTICS = 'SET_STATISTICS';

export function setGroups(groups) {
    return {
        type: SET_GROUPS,
        payload: groups
    }
}

export function setPlatforms(platforms) {
    return {
        type: SET_PLATFORMS,
        payload: platforms
    }
}

export function setOperatingSystems(operatingSystems) {
    return {
        type: SET_OPERATING_SYSTEMS,
        payload: operatingSystems
    }
}

export function setBrowsers(browsers) {
    return {
        type: SET_BROWSERS,
        payload: browsers
    }
}

export function setCurrentStatistics(statistics) {
    return {
        type: SET_STATISTICS,
        payload: statistics
    }
}
