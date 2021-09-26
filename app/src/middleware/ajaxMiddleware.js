import {AjaxApi} from "../lib/AjaxApi";
import FiltersService from "../lib/FiltersService";
import {initDataFilters,initCurrentValueFilters} from "../actions/filters";
import {setData} from "../actions/table";

const ajaxMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case 'AJAX_GET_DATA_FOR_FILTERS': {
                let dataFilters = {};
                let dataUrl = "platforms";
                AjaxApi.ajaxGet(dataUrl).then((res) => {
                    dataFilters.platforms = res;
                    dataFilters.platforms.unshift({label: "All", value: 0})
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

                    let dataUrl = `statistics?groupBy=${currentValueFilters.groups.value}&from=${currentValueFilters.from}&to=${currentValueFilters.to}`;
                    return AjaxApi.ajaxGet(dataUrl);
                }).then(res => {
                    store.dispatch(setData(res.rows))
                })
                break;
            }
            default:
                return next(action);
        }
    };
};

export default ajaxMiddleware();