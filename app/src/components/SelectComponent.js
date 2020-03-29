import React, {useEffect, useState, Fragment} from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './index.css';

function SelectComponent({items, title, onChange, ...props} ) {
    return(
        <div className="SelectComponent">
            <InputLabel className="label" id="label">{title}</InputLabel>
            <Select labelId="label" 
            className="select"
            id="select" 
            value={props.default}
            onChange={onChange}
            >
                {items.map(item => 
                    <MenuItem 
                    key={item.value} 
                    value={item.value}
                    >{item.label}</MenuItem>
                )}
            </Select>
        </div>
    )
}

export default SelectComponent;