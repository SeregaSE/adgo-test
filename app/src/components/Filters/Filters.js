import {connect} from "react-redux";
import {useEffect, useState, useCallback} from "react";
import FilterFrom from "./FilterItems/FilterFrom";
import FilterTo from "./FilterItems/FilterTo";
import FilterGroupBy from "./FilterItems/FilterGroupBy";
import FilterPlatform from "./FilterItems/FilterPlatform";
import FilterOS from "./FilterItems/FilterOS";
import FilterBrowsers from "./FilterItems/FilterBrowsers";
import {changeFilterFrom, changeFilterTo, changeFilterGroups, changeFilterPlatform, changeOS, changeBrowsers} from "../../actions/filters";
import {ajaxGetNewData} from "../../actions/ajax";

const Filters = (props) => {
    const [viewOperatingSystem, changeViewOperatingSystem] = useState(false);
    const [viewBrowsers, changeViewsBrowsers] = useState(false);

    const onChangeViewOperatingSystem = () => {
        if (!viewOperatingSystem) {
            changeViewOperatingSystem(true);
        }
    }

    const onChangeViewsBrowsers = () => {
        if (!viewBrowsers) {
            changeViewsBrowsers(true)
        }
    }

    const closeOperatingSystemBrowsers = useCallback((e) => {
        let el = document.getElementsByClassName("drop-down-list")
        if (viewOperatingSystem) {
            if (!el[0].contains(e.target)) {
                changeViewOperatingSystem(false);
            }
        } else if (viewBrowsers) {
            if (!el[1].contains(e.target)) {
                changeViewsBrowsers(false);
            }
        }
    }, [viewBrowsers, viewOperatingSystem])

    useEffect(() => {
        document.querySelector("body").addEventListener("click", closeOperatingSystemBrowsers);
        return () => {
            document.querySelector("body").removeEventListener("click", closeOperatingSystemBrowsers);
        };
    }, [closeOperatingSystemBrowsers])

    const onFiltersChange = (type, data) => {
        switch (type) {
            case "from":
                props.onChangeFilterFrom(data);
                break;
            case "to":
                props.onChangeFilterTo(data);
                break;
            case "groups":
                props.onChangeFilterGroups(data);
                break;
            case "platform":
                props.onChangeFilterPlatform(data);
                break;
            case "os":
                props.onChangeOS(data);
                break;
            default:
                props.onChangeBrowsers(data);
        }
        props.onAjaxGetNewData();
    }

    return (
        <form>
            <div className="row">
                <FilterFrom
                    currentValueFilters={props.filters.currentValueFilters}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterTo
                    currentValueFilters={props.filters.currentValueFilters}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterGroupBy
                    currentValueFilters={props.filters.currentValueFilters}
                    dataFilters={props.filters.dataFilters}
                    onFiltersChange = {onFiltersChange}
                />
            </div>
            <div className="row mt-20">
                <FilterPlatform
                    currentValueFilters={props.filters.currentValueFilters}
                    dataFilters={props.filters.dataFilters}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterOS
                    onChangeViewOperatingSystem={onChangeViewOperatingSystem}
                    viewOperatingSystem={viewOperatingSystem}
                    dataFilters={props.filters.dataFilters}
                    currentValueFilters={props.filters.currentValueFilters}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterBrowsers
                    onChangeViewsBrowsers={onChangeViewsBrowsers}
                    viewBrowsers={viewBrowsers}
                    dataFilters={props.filters.dataFilters}
                    currentValueFilters={props.filters.currentValueFilters}
                    onFiltersChange = {onFiltersChange}
                />
            </div>
        </form>
    )
}

export default connect(
    state => ({
        filters: state.filters,
    }),
    dispatch => ({
        onChangeFilterFrom: (data) => {
            dispatch(changeFilterFrom(data));
        },
        onChangeFilterTo: (data) => {
            dispatch(changeFilterTo(data));
        },
        onChangeFilterGroups: (data) => {
            dispatch(changeFilterGroups(data));
        },
        onChangeFilterPlatform: (data) => {
            dispatch(changeFilterPlatform(data));
        },
        onChangeOS: (data) => {
            dispatch(changeOS(data));
        },
        onChangeBrowsers: (data) => {
            dispatch(changeBrowsers(data));
        },
        onAjaxGetNewData: () => {
            dispatch(ajaxGetNewData());
        },
    })
)(Filters);


