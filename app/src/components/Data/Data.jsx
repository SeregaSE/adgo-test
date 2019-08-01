import React from 'react';
import Row from "../Row/Row";

const Data = props => {
    let dataItems = props.data.map(i => {
        return <Row day={i.day} impressions={i.impressions} conversions={i.clicks} money={i.money} />
    });

    return (
        <>
            {dataItems}
        </>
    )
};

export default Data;