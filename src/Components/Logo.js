import React from 'react';
import styled from '@emotion/styled';


const LogoWrapper = styled.div`
  font-family: 'Comfortaa', cursive;
  color: black;
  font-size: 3rem;
  width: 270px;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgba(0,0,0,0.1); */
  box-shadow: 0 0 0 25px rgba(0,0,0,1);
  margin-right: 160px;
`;
function Logo() {
  return (
    <LogoWrapper>
      Astral <br /> Recess
    </LogoWrapper>
  );
}

export default Logo;
