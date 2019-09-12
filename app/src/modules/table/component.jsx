import React, {useEffect } from 'react';

import styles from './styles.module.scss';

const Table = ({ 
	statistics,
	getStatistics,
	searchParam,
}) => {

	useEffect(() => {
	  if (searchParam.groups !== null) {
			getStatistics({ 
				groupBy: searchParam.groups, 
				dateRange: searchParam.dateRange,
				platform: searchParam.platforms,
				browser: searchParam.browsers,
				operatingSystem: searchParam.operatingSystems,
			})
		}
	}, [
		getStatistics, 
		searchParam.groups, 
		searchParam.platforms, 
		searchParam.browsers,
		searchParam.operatingSystems,
		searchParam.dateRange,
	]);

	return (
		<div className={styles.table}>
			{statistics !== null && statistics.rows[0] &&
			<table>
				<thead>
					<tr>
						{/* {searchParam.groups && searchParam.groups.map((item) => {
							return (
							<div>s</div>
							)
						})} */}
						{statistics.rows[0].day && 
							<th>Day</th>
						}
						{statistics.rows[0].platform && 
							<th>Platform</th>
						}
						{statistics.rows[0].browser && 
							<th>Browser</th>
						}
						{statistics.rows[0].operatingSystem && 
							<th>Operating System</th>
						}
						<th>Impressions</th>
						<th>Conversions</th>
						<th>Money</th>
					</tr>
				</thead>
				<tbody>
					{statistics.rows.map((item, index) => {
						return(
							<tr key={index}>
								{item.day &&
									<td>{item.day}</td>
								}
								{item.platform &&
									<td>{item.platform}</td>
								}
								{item.browser &&
									<td>{item.browser}</td>
								}
								{item.operatingSystem &&
									<td>{item.operatingSystem}</td>
								}
								<td>{item.impressions}</td>
								<td>{item.clicks}</td>
								<td>{item.money}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			}
		</div>
	)
}

export default Table;
