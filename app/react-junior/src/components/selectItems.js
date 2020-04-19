import React from 'react';
import {Select} from "antd";
import PropTypes from "prop-types";

const {Option} = Select;

const SelectItems = (props) => {

    SelectItems.propTypes = {
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })),
        onChange: PropTypes.func,
    };

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