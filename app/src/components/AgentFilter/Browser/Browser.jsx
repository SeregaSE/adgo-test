import React from 'react';
import Option from "../../DateFilter/GroupBy/Option/Option";

const Browser = props => {
    let browsers = props.browsers.filter(b => b.platform === props.currentPlatform);
    browsers = browsers.map((b, index) => {
        return <Option key={index}
                       value={b.value}
                       label={b.label}
                       selected={b.value === props.currentBrowser}/>
    });

    return (
        <>
            <div>Browser</div>
            <select defaultValue={1} onChange={e => {
                props.setCurrentBrowser(parseInt(e.target.options[e.target.selectedIndex].value));
            }}>
                {browsers}
            </select>
        </>
    )
};

export default Browser;