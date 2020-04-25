import * as React from 'react'
import { TablePagination } from '@material-ui/core'
import FilterContext from '../../../context/Filter/FilterContext'

interface Props {
  count: number
}

const Pagination: React.FC<Props> = (props) => {
  const {
    count
  } = props

  const {limit, offset, setFilterFields} = React.useContext(FilterContext)

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setFilterFields({offset: page})
  }

  if (count < limit) return null

  return (
    <TablePagination
      rowsPerPageOptions={[limit]}
      component="div"
      count={count}
      rowsPerPage={limit}
      page={offset}
      onChangePage={handleChangePage}
    />
  )
}

export default Pagination
