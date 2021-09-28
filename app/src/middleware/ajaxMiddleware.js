import {AjaxApi} from "../lib/AjaxApi";
import FiltersService from "../lib/FiltersService";
import {initDataFilters, initCurrentValueFilters} from "../actions/filters";
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

                    let dataUrl = `statistics?groupBy=${currentValueFilters.groups.value}`;
                    dataUrl += `&from=${currentValueFilters.from}`;
                    dataUrl += `&to=${currentValueFilters.to}`;
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    store.dispatch(setData(res.rows))
                    let paginationData = {
                        count: res.count,
                        page: 0
                    }
                    store.dispatch(setPagination(paginationData));
                }).catch((error) => {
                    alert(error)
                })
                break;
            }
            case 'AJAX_GET_NEW_DATA': {
                const state = store.getState();

                let paramUrl = `statistics?groupBy=${state.filters.currentValueFilters.groups.value}`;
                paramUrl += `&from=${state.filters.currentValueFilters.from}`;
                paramUrl += `&to=${state.filters.currentValueFilters.to}`;
                // если по странично
                if (action.data !== null) {
                    paramUrl += `&offset=${action.data}`;
                }

                let browsers = state.filters.currentValueFilters.browsers;
                let operatingSystems = state.filters.currentValueFilters.operatingSystems;
                let platform = state.filters.currentValueFilters.platforms;
                // если выбрана конретная платформа фильтруем данные
                if (platform.value !== 0) {
                    paramUrl += `&platform=${platform.value}`
                    browsers = browsers.filter(item => {
                        return Number(item.platform) === Number(platform.value);
                    })
                    operatingSystems = operatingSystems.filter(item => {
                        return Number(item.platform) === Number(platform.value);
                    })
                }

                // проверяем все ли ОС и браузеры выбраны
                let noCheckBrowsers = browsers.find(item => {
                    return item.check === false
                })

                let noCheckOS = operatingSystems.find(item => {
                    return item.check === false;
                })


                if (noCheckBrowsers) {
                    browsers.forEach(item => {
                        if (item.check === true) {
                            paramUrl += `&browsers[]=${item.value}`
                        }
                    })
                }

                if (noCheckOS) {
                    operatingSystems.forEach(item => {
                        if (item.check === true) {
                            paramUrl += `&operatingSystems[]=${item.value}`
                        }
                    })
                }

                AjaxApi.ajaxGet(paramUrl).then((res) => {
                    store.dispatch(setData(res.rows))
                    let paginationData = {
                        count: res.count,
                        page: 0
                    }
                    if (action.data !== null) {
                        paginationData.page = Number(action.data);
                    }
                    store.dispatch(setPagination(paginationData));
                }).catch((error) => {
                    alert(error)
                })
                break;
            }
            default:
                return next(action);
        }
    };
};

export default ajaxMiddleware();