import React from 'react';
import '../scss/App.scss';
import DatePicker from "./fields/DatePicker";
import MultiSelect from "./fields/MultiSelect";
import OneSelect from "./fields/OneSelect";

const Toolbar = (props) => {
    return (
        <div className="toolbar">
          <DatePicker 
            label={"From"} 
            initialDate={"2019/08/31"} 
            changeDate={props.changeDate}
            />
          <DatePicker 
            label={"To"} 
            initialDate={"2019/09/21"} 
            changeDate={props.changeDate}
            />
          <MultiSelect 
            label={"Browsers"} 
            data={props.initialQueries.browsers}
            parentValueChange={props.changeBrowsers}
            />
          <MultiSelect 
            label={"Operating System"} 
            data={props.initialQueries.os}
            parentValueChange={props.changeOperatingSystems}
            />
          <OneSelect 
            parentValueChange={props.changePlatform} 
            label={"Platforms"} 
            data={props.initialQueries.platforms} 
            parentValue={props.platform}
            />
          <OneSelect 
            parentValueChange={props.changeGroupBy} 
            label={"Group by"} 
            data={props.initialQueries.groups}
            parentValue={props.groupBy}
            />
        </div>
      )
}

export default Toolbar;