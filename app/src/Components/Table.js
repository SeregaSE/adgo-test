import React from 'react';

const Table = ({items, groupBy, filter}) => {

    return(<table>
        <thead>
        <tr>
            {groupBy.map(item => {
                if (item.value === filter) {
                    return <th key={item.value}>{item.label}</th>
                }
            })}
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Money</th>
        </tr>
        </thead>
        <tbody>
            {items.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>{item.day || item.platform || item.browser || item.operatingSystem}</td>
                        <td>{item.impressions}</td>
                        <td>{item.clicks}</td>
                        <td>{item.money}</td>
                    </tr>
                )
            })}
        </tbody>

    </table>
    )
};

export default Table;