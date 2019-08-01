import React from 'react';
import Option from "../../DateFilter/GroupBy/Option/Option";

const OS = props => {
    let systems = props.systems.filter(s => s.platform === props.currentPlatform);
    systems = systems.map((s, index) => {
        return <Option key={index}
                       value={s.value} label={s.label}
                       selected={s.value === props.currentSystem}/>
    });

    return (
        <>
            <div>Operating System</div>
            <select defaultValue={1} onChange={e => {
                props.setCurrentSystem(parseInt(e.target.options[e.target.selectedIndex].value));
            }}>
                {systems}
            </select>
        </>
    )
};

export default OS;