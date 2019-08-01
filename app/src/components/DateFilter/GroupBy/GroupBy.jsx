import React from 'react';
import Option from "./Option/Option";

const GroupBy = props => {
    let groups = props.groups.map((g, index) => {
        return <Option key={index}
                       value={g.value}
                       label={g.label}
                       selected={g.value === props.currentGroup} />
    });

    return (
        <>
            <div>Group By</div>
            <select defaultValue={1} onChange={e => {
                props.setCurrentGroup(e.target.options[e.target.selectedIndex].value);
            }}>
                {groups}
            </select>
        </>
    )
};

export default GroupBy;