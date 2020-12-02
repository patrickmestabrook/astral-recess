import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import {
  Background,
  InteractionBox,
  Wrapper
} from 'Components/Styled';
import { BlueSkySVG, Logo } from 'Components';

function App() {
  return (
    <StoreProvider store={store}>
      <Background>
        <BlueSkySVG />
      </Background>
      <Wrapper>
        <Logo />
        <InteractionBox></InteractionBox>
      </Wrapper>
    </StoreProvider>
  );
}

export default App;
