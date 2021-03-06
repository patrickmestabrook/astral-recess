import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'

const enter = keyframes`
  from, {
    transform: translate(30px, 30px);
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.18), 0px 0px 0px 0px rgba(127,127,127,0.18);
  }



  to {
    transform: translate(0px, 0px);
    box-shadow: 60px 60px 0px 0px rgba(0,0,0,0.18), 30px 30px 0px 0px rgba(255,255,255,0.18);
  }
`
const fade = keyframes`
  from, {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`


export const Background = styled.div`
  background: rgb(33, 72, 167);
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
  opacity: 0;

  animation: ${fade} .8s ease normal;
  animation-fill-mode: forwards;
  animation-delay: .5s;
`;

export const InteractionBox = styled.div`
  width: 300px;
  height: 300px;
  background: rgba(250,250,250,1);
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.18), 0px 0px 0px 0px rgba(255,255,255,0.18);
  /* 60px 60px 0px 0px rgba(0,0,0,0.18); */
  /* transform: translate(0, 0); */
  /* box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.12),
  -10px -10px 0px 0px rgba(255,255,255,0.2),
  10px -10px 0px 0px rgba(255,255,255,0.12),
  -10px 10px 0px 0px rgba(255,255,255,0.12),
  -4px 4px 0px 0px rgba(0,0,0,0.15),
  4px -4px 0px 0px rgba(0,0,0,0.15),
  -4px -4px 0px 0px rgba(0,0,0,0.15),
  4px 4px 0px 0px rgba(0,0,0,0.15); */
  animation: ${enter} 0.5s ease normal;
  animation-fill-mode: forwards;
  animation-delay: 1s;
`;
