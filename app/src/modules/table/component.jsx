import React, {useEffect, useState } from 'react';

import styles from './styles.module.scss';

const Table = ({ 
	statistics,
	getStatistics
}) => {
	if (statistics === null) getStatistics({ groupBy: 'day', from: '2019-07-01', to: '2019-07-12'});

	// useEffect(() => {
	//   getStatistics({ groupBy: 'day', from: '2019-07-01', to: '2019-07-12'});
	// });

	return (
		<div className={styles.table}>
			<table>
				<thead>
				<tr>
					<th>Day</th>
					<th>Impressions</th>
					<th>Conversions</th>
					<th>Money</th>
				</tr>
				</thead>
				<tbody>
					{statistics !== null && statistics.rows.map((item, index) => {
						return(
							<tr key={index}>
								<td>{item.day}</td>
								<td>{item.impressions}</td>
								<td>{item.clicks}</td>
								<td>{item.money}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Table;
