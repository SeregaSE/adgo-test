import React from 'react';

const Row = props => {
    return (
        <tr>
            <td>{props.day}</td>
            <td>{props.impressions}</td>
            <td>{props.conversions}</td>
            <td>{props.money}</td>
        </tr>
    )
};

export default Row;