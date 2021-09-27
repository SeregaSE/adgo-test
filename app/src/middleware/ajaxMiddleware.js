import {AjaxApi} from "../lib/AjaxApi";
import FiltersService from "../lib/FiltersService";
import {initDataFilters,initCurrentValueFilters} from "../actions/filters";
import {setData} from "../actions/table";
import {setPagination} from "../actions/pagination";

const ajaxMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case 'AJAX_GET_DATA_FOR_FILTERS': {
                let dataFilters = {};
                AjaxApi.ajaxGet("platforms").then((res) => {
                    dataFilters.platforms = res;
                    dataFilters.platforms.unshift({label: "All", value: 0})
                    return AjaxApi.ajaxGet("browsers");
                }).then(res => {
                    dataFilters.browsers = res;
                    return AjaxApi.ajaxGet("operating-systems");
                }).then(res => {
                    dataFilters.operatingSystems = res;
                    return AjaxApi.ajaxGet("groups");
                }).then(res => {
                    dataFilters.groups = res;
                    // отправляем данные по фильтрам в стор
                    store.dispatch(initDataFilters(dataFilters));
                    const filtersService = new FiltersService();
                    const currentValueFilters = filtersService.makeCurrentValueFilters(dataFilters);
                    store.dispatch(initCurrentValueFilters(currentValueFilters));

                    let dataUrl = `statistics?groupBy=${currentValueFilters.groups.value}&from=${currentValueFilters.from}&to=${currentValueFilters.to}`;
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    store.dispatch(setData(res.rows))
                    let paginationData = {
                        count: res.count,
                        page: 0
                    }
                    store.dispatch(setPagination(paginationData));
                })
                break;
            }
            case 'AJAX_GET_NEW_DATA': {
                const state = store.getState();
                let paramUrl = `statistics?groupBy=${state.filters.currentValueFilters.groups.value}&from=${state.filters.currentValueFilters.from}&to=${state.filters.currentValueFilters.to}`;
                if(action.data !== null) {
                    paramUrl = paramUrl + `&offset=${action.data}`;
                }
                let browsers = state.filters.currentValueFilters.browsers;
                let operatingSystems = state.filters.currentValueFilters.operatingSystems;
                let platform = state.filters.currentValueFilters.platforms;
                if(platform.value !== 0) {
                    paramUrl = paramUrl + `&platform=${platform.value}`
                    browsers = browsers.filter(item => {
                        return Number(item.platform) === Number(platform.value);
                    })
                    operatingSystems = operatingSystems.filter(item => {
                        return Number(item.platform) === Number(platform.value);
                    })
                }

                let noCheckBrowsers = browsers.find(item => {
                    return item.check === false
                })

                let noCheckOS = operatingSystems.find(item => {
                    return  item.check === false;
                })


                let checkedBrowser = false;

                if(noCheckBrowsers) {
                    browsers.forEach(item => {
                        if(item.check === true) {
                            checkedBrowser = true;
                            paramUrl = paramUrl + `&browsers[]=${item.value}`
                        }
                    })
                } else {
                    checkedBrowser = true;
                }

                let checkedOS = false;

                if(noCheckOS) {
                    operatingSystems.forEach(item => {
                        if(item.check === true) {
                            checkedOS = true;
                            paramUrl = paramUrl + `&operatingSystems[]=${item.value}`
                        }
                    })
                } else {
                    checkedOS = true;
                }

                if(checkedOS || checkedBrowser) {
                    AjaxApi.ajaxGet(paramUrl).then((res) => {
                        store.dispatch(setData(res.rows))
                        let paginationData = {
                            count: res.count,
                            page: 0
                        }
                        store.dispatch(setPagination(paginationData));
                    })
                } else {
                    store.dispatch(setData([]))
                    let paginationData = {
                        count: 1,
                        page: 0
                    }
                    store.dispatch(setPagination(paginationData));
                }

                break;
            }
            default:
                return next(action);
        }
    };
};

export default ajaxMiddleware();