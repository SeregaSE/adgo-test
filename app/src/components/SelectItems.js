import React from 'react';
import {Select} from "antd";

const { Option } = Select;

const SelectItems = (props) => {
    return (
        (props.values !== null) ?
        <Select defaultValue={props.values[0].value} style={{width: 150, marginLeft: "10px"}}
                onChange={props.onChange}>
            {props.values.map((option, index) => <Option key={index}
                                                        value={option.value}>{option.label}</Option>)}
        </Select> : null
    )
};

export default SelectItems;