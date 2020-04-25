import * as React from 'react'
import { StyledLoader, Container } from './styled'

const Loader = () => {
  return (
    <Container>
      <StyledLoader>
        <div></div>
        <div></div>
      </StyledLoader>
    </Container>
  )
}

export default Loader
