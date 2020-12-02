import styled from '@emotion/styled';

export const Background = styled.div`
  background: rgb(17, 140, 254);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`

  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InteractionBox = styled.div`
  width: 250px;
  height: 250px;
  background: rgba(255,255,255,0.9);
  text-align: center;
  border-radius: 4px;
  /* border: 7px solid #fff; */
  padding: 50px;
  box-shadow: 86px 86px 0px 0px rgba(0,0,0,0.32), -86px -86px 0px 0px rgba(0,0,0,0.32);
`;
