import React from 'react';


function Table(props){
    return (
        <table className="table">
             <thead>
                <tr>
                    <th scope="col"> { props.groupName }</th>
                    <th scope="col">Clicks</th>
                    <th scope="col">Impressions</th>
                    <th scope="col">Money</th>
                </tr>
            </thead>
            <tbody>
                { props.data.map((element, key) => 
                    <tr key={key}>
                        <td>{ element[props.groupBy] }</td>
                        <td>{ element.clicks }</td>
                        <td>{ element.impressions }</td>
                        <td>{ element.money }</td>
                    </tr>
                )}
            </tbody>
            
        </table>
    );
}

export default Table;
