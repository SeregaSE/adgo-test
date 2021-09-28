import {connect} from "react-redux";
import {useEffect, useState, useCallback} from "react";
import FilterSelect from "./FilterItems/FilterSelect";
import FilterCheckList from "./FilterItems/FilterCheckList";
import FilterDate from "./FilterItems/FilterDate";
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
                <FilterDate
                    type = "from"
                    label = "From"
                    value = {props.filters.currentValueFilters.from}
                    max = {props.filters.currentValueFilters.to}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterDate
                    type = "to"
                    label = "To"
                    value = {props.filters.currentValueFilters.to}
                    min = {props.filters.currentValueFilters.from}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterSelect
                    type = "groups"
                    label = "Group by"
                    value = {props.filters.currentValueFilters.groups.value}
                    data = {props.filters.dataFilters.groups}
                    onFiltersChange = {onFiltersChange}
                />
            </div>
            <div className="row mt-20">
                <FilterSelect
                    type = "platform"
                    label = "Platform"
                    value = {props.filters.currentValueFilters.platforms.value}
                    data = {props.filters.dataFilters.platforms}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterCheckList
                    type = "os"
                    onChangeView={onChangeViewOperatingSystem}
                    view={viewOperatingSystem}
                    label = "Operating system"
                    labelButton = "Choose operating system"
                    platform = {props.filters.currentValueFilters.platforms.value}
                    data = {props.filters.currentValueFilters.operatingSystems}
                    onFiltersChange = {onFiltersChange}
                />
                <FilterCheckList
                    type = "browsers"
                    onChangeView={onChangeViewsBrowsers}
                    view={viewBrowsers}
                    label = "Browsers"
                    labelButton = "Choose browsers"
                    platform = {props.filters.currentValueFilters.platforms.value}
                    data = {props.filters.currentValueFilters.browsers}
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


