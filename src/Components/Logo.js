import React from 'react';
import styled from '@emotion/styled';


import { keyframes } from '@emotion/react'

const enter = keyframes`
  from, {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const LogoSpan = styled.span`
  animation: ${enter} 0.9s ease normal;
  animation-fill-mode: forwards;
  opacity: 0;
  animation-delay: 1s;
`;
const LogoWrapper = styled.div`
  font-family: 'Roboto Slab', serif;
  color: black;
  font-size: 2.1rem;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0);
  box-shadow: 0 0 0 20px rgba(0,0,0,1);
  margin-right: 160px;
  /* text-shadow:  4px 3px 0px rgba(255,255,255,0.3); */
`;
function Logo() {
  return (
    <LogoWrapper>
      <LogoSpan>
        astral <br /> recess
      </LogoSpan>
    </LogoWrapper>
  );
}

export default Logo;
