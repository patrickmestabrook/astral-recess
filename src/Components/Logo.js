import React from 'react';
import styled from '@emotion/styled';


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
      astral <br /> recess
    </LogoWrapper>
  );
}

export default Logo;
