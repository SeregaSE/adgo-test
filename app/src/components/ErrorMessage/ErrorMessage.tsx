import * as React from 'react'
import { Error, Stack, Title } from './styled'

interface Props {
  error: Error
}

const ErrorMessage: React.FC<Props> = (props) => {
  const {
    error
  } = props

  return (
    <Error>
      <Title>
        Something went wrong.
      </Title>
      <Stack>
        {/*I think for review test-task error stack will be useful*/}
        {error.stack}
      </Stack>
    </Error>
  )
}

export default ErrorMessage
