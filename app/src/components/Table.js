import React, {useEffect, useState, Fragment} from 'react';

function Table({data, group}) {
    console.log(Object.keys(data.rows[0]));
    const headers = Object.keys(data.rows[0]);
    return(
        <Fragment>
            <table>
                <tr>
                {headers.map((item, index) => 
                    <th key={index}>
                        {item}
                    </th>
                    )
                }
                </tr>
                {data.rows.map((item, index) => 
                    <tr key={index}>
                        <td>{item[group]}</td>
                        <td>{item.impressions}</td>
                        <td>{item.clicks}</td>
                        <td>{item.money}</td>
                    </tr>
                    )
                }
            </table>
        </Fragment>
    )
}

export default Table;