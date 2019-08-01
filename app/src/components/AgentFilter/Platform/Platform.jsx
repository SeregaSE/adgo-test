import React from 'react';
import Option from "../../DateFilter/GroupBy/Option/Option";

const Platform = props => {
    let platforms = props.platforms.map((p, index) => {
        return <Option
            key={index}
            value={p.value}
            label={p.label}
            selected={p.value === props.currentPlatform}/>;
    });

    return (
        <>
            <div>Platform</div>
            <select defaultValue={1} onChange={e => {
                let value = parseInt(e.target.options[e.target.options.selectedIndex].value);
                props.setCurrentPlatform(value);

                let systems = props.systems.filter(s => s.platform === value);
                props.setCurrentSystem(systems[0].value);

                let browsers = props.browsers.filter(b => b.platform === value);
                props.setCurrentBrowser(browsers[0].value);
            }}>
                {platforms}
            </select>
        </>
    )
};

export default Platform;