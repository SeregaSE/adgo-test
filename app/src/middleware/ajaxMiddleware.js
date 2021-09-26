import {AjaxApi} from "../lib/AjaxApi";
import FiltersService from "../lib/FiltersService";
import {initDataFilters,initCurrentValueFilters} from "../actions/filters";

const ajaxMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case 'AJAX_GET_DATA_FOR_FILTERS': {
                let dataFilters = {};
                let dataUrl = "platforms";
                AjaxApi.ajaxGet(dataUrl).then((res) => {
                    dataFilters.platforms = res;
                    let dataUrl = "browsers";
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    dataFilters.browsers = res;
                    let dataUrl = "operating-systems";
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    dataFilters.operatingSystems = res;
                    let dataUrl = "groups";
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    dataFilters.groups = res;
                    // отправляем данные по фильтрам в стор
                    store.dispatch(initDataFilters(dataFilters));
                    const filtersService = new FiltersService();
                    const currentValueFilters = filtersService.makeCurrentValueFilters(dataFilters);
                    store.dispatch(initCurrentValueFilters(currentValueFilters));
                })
                break;
            }
            default:
                return next(action);
        }
    };
};

export default ajaxMiddleware();