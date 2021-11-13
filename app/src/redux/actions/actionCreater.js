
export const loadingFetch = (payload) => ({type: 'LOADING_FETCH', payload});

export const getPlatformsList = () => ({type: 'GET_PLATFORMS_LIST'});
export const getOperatingList = () => ({type: 'GET_OPERATING_LIST'});
export const getBrowserList = () => ({type: 'GET_BROWSER_LIST'});
export const getGroupsList = () => ({type: 'GET_GROUPS_LIST'});

export const setPlatformsList = (payload) => ({type: 'SET_PLATFORMS_LIST', payload});
export const setOperatingList = (payload) => ({type: 'SET_OPERATING_LIST', payload});
export const setBrowserList = (payload) => ({type: 'SET_BROWSER_LIST', payload});
export const setGroupsList = (payload) => ({type: 'SET_GROUPS_LIST', payload});
export const setStatisticsList = (payload) => ({type: 'SET_STATISTICS_LIST', payload});

export const handleSetActivePlatforms= (payload) => ({type: 'HANDLE_ACTIVE_PLATFORMS', payload});
export const handleSetActiveOperating= (payload) => ({type: 'HANDLE_ACTIVE_OPERATING', payload});
export const handleSetActiveBrowser= (payload) => ({type: 'HANDLE_ACTIVE_BROWSER', payload});
export const handleSetActiveGroups= (payload) => ({type: 'HANDLE_ACTIVE_GROUPS', payload});

export const getStatictics = (activePlatform,activeOperatingSystems,activeBrowser,activeGroups, dateFrom, dateTo, currentPage) => {
    return {
        type: 'GET_STATISTIC',
        activePlatform,
        activeOperatingSystems,
        activeBrowser,
        activeGroups,
        dateFrom,
        dateTo,
        currentPage
    }   
};
