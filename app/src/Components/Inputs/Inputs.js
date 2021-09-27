import React from 'react';
import SelectorOne from "./SelectorOne";
import {useBrowser, useGroupBy, useOS, usePlatform} from "../Hooks/useFilters";
import Day from "./Day";

const Inputs = ({setGroupBy, setDayFrom, setDayTo, dayTo, dayFrom, setPlatform, setOS, setBrowser}) => {
    const groupByList = useGroupBy();
    const platformList = usePlatform();
    const osList = useOS();
    const browsersList = useBrowser();

    return(
        <>
            <div className="inputsRow">
                <div>
                     <label htmlFor="timeFrom">From</label>
                     <Day name="timeFrom" setDay={setDayFrom} day={dayFrom}/>
                </div>
                <div>
                    <label htmlFor="timeTo">To</label>
                    <Day name="timeTo" setDay={setDayTo} day={dayTo}/>
                </div>
                <div>
                    <label htmlFor="groupBy">Group By</label>
                    <SelectorOne list={groupByList} name="groupBy" setItem={setGroupBy}/>
                </div>
            </div>
            <div className="inputsRow">
                <div>
                    <label htmlFor="platform">Platform</label>
                    <SelectorOne list={platformList} name="platform" setItem={setPlatform}/>
                </div>
                <div>
                    <label htmlFor="os">Operating System</label>
                    <SelectorOne list={osList} name="os" setItem={setOS}/>
                </div>
                <div>
                    <label htmlFor="browser">Browser</label>
                    <SelectorOne list={browsersList} name="browser" setItem={setBrowser}/>
                </div>
            </div>
        </>
    )
};

export default Inputs;