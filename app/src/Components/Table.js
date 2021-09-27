import React from 'react';
import {useGroupBy} from "./Hooks/useFilters";

const Table = ({items, groupBy}) => {
    const groups = useGroupBy();
    return(<table>
        <thead>
        <tr>
            {groups.map(item => {
                if (item.value === groupBy) {
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