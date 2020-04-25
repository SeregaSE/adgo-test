import * as React from 'react'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

interface Props {
  isLoading: boolean,
  error: Error | null,
  isEmptyResponse?: boolean
  children: React.ReactElement
}

const DataHandler: React.FC<Props> = (props) => {
  const {
    isLoading,
    error,
    isEmptyResponse,
    children
  } = props

  if (isLoading) return <Loader/>
  if (error) return <ErrorMessage error={error}/>
  if (isEmptyResponse) return <p>Sorry, we did not find anything, try changing the query</p>
  return children
}

export default DataHandler
