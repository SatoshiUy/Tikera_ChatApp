import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: rgb(33,33,33);
`

const fade = keyframes`
  to {
    transform: scale(2);
    opacity: 0;
  }
`
const StyledLoading = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 5rem;
  margin: 2rem auto;
  position: relative;
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: inherit;
    animation-name: ${fade};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`

function Loading() {
  return (
    <StyledContainer>
      <StyledLoading></StyledLoading>
    </StyledContainer>
  )
}

export default Loading