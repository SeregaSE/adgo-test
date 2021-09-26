import {connect} from "react-redux";
import {useState} from "react";
import FilterFrom from "./FilterItems/FilterFrom";
import FilterTo from "./FilterItems/FilterTo";
import FilterGroupBy from "./FilterItems/FilterGroupBy";
import FilterPlatform from "./FilterItems/FilterPlatform";
import FilterOS from "./FilterItems/FilterOS";
import FilterBrowsers from "./FilterItems/FilterBrowsers";

const Filters = (props) => {
    const [viewOperatingSystem, changeViewOperatingSystem] = useState(false);
    const [viewBrowsers, changeViewsBrowsers] = useState(false);

    const onChangeViewOperatingSystem = () => {
        if(!viewOperatingSystem) {
            changeViewOperatingSystem(true);
        }
    }

    const onChangeViewsBrowsers = () => {
        if(!viewBrowsers) {
            changeViewsBrowsers(true)
        }
    }

    const closeOperatingSystemBrowsers = (e) => {
        let el = document.getElementsByClassName("drop-down-list")
        if(viewOperatingSystem) {
            if(!el[0].contains(e.target)) {
                changeViewOperatingSystem(false);
            }
        } else if(viewBrowsers) {
            if(!el[1].contains(e.target)) {
                changeViewsBrowsers(false);
            }
        }
    }

    return (
        <form onClick={closeOperatingSystemBrowsers}>
            <div className="row">
                <FilterFrom
                    currentValueFilters = {props.currentValueFilters}
                />
               <FilterTo
                   currentValueFilters = {props.currentValueFilters}
               />
                <FilterGroupBy
                    currentValueFilters = {props.currentValueFilters}
                    dataFilters = {props.dataFilters}
                />
            </div>
            <div className="row mt-20">
                <FilterPlatform
                    currentValueFilters = {props.currentValueFilters}
                    dataFilters = {props.dataFilters}
                />
                <FilterOS
                    onChangeViewOperatingSystem = {onChangeViewOperatingSystem}
                    viewOperatingSystem = {viewOperatingSystem}
                    dataFilters = {props.dataFilters}
                />
                <FilterBrowsers
                    onChangeViewsBrowsers = {onChangeViewsBrowsers}
                    viewBrowsers = {viewBrowsers}
                    dataFilters = {props.dataFilters}
                />
            </div>
        </form>
    )
}

export default connect(
    state => ({
        currentValueFilters: state.filters.currentValueFilters,
        dataFilters: state.filters.dataFilters
    }),
    dispatch => ({
        // onAjaxGetDataForFilters: () => {
        //     dispatch(ajaxGetDataForFilters());
        // },
    })
)(Filters);
