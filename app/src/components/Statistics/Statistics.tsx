import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import FilterContext from '../../context/Filter/FilterContext'
import GroupsContext from '../../context/Groups/GroupsContext'
import { generateSearchParamsQuery, getConversions } from '../../utils'
import { useFetch } from '../../hooks/useFetch'
import { requestStatistics } from '../../api'
import DataHandler from '../DataHandler'
import Pagination from '../FilterPanel/Pagination'
import { StatisticsResponse } from '../../types'
import { TableContainer } from './styled'

const Statistics = () => {
  const filterState = React.useContext(FilterContext)
  const {groups} = React.useContext(GroupsContext)
  const {response, doFetch, error, isLoading} = useFetch()

  const searchQuery = generateSearchParamsQuery(filterState)

  React.useEffect(() => {
    doFetch(requestStatistics(searchQuery))
  }, [searchQuery, doFetch])

  const groupByLabel = React.useMemo(
    () => groups?.find(group => group.value === filterState.groupBy)?.label,
    [filterState.groupBy, groups]
  )

  const statistics = response as StatisticsResponse

  return (
    <DataHandler
      isLoading={isLoading}
      error={error}
      isEmptyResponse={!statistics?.count}
    >
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='th'>{groupByLabel}</TableCell>
                <TableCell className='th'>Impressions</TableCell>
                <TableCell className='th'>Conversions</TableCell>
                <TableCell className='th'>Money</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statistics?.rows.map((statistic, index) =>
                <TableRow key={index}>
                  <TableCell>{statistic[filterState.groupBy]}</TableCell>
                  <TableCell>{statistic.impressions}</TableCell>
                  <TableCell>{getConversions(statistic.impressions, statistic.clicks)}</TableCell>
                  <TableCell>{statistic.money}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={statistics?.count}/>
      </>
    </DataHandler>
  )
}

export default Statistics