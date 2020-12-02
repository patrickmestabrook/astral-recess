import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { Wrapper } from 'Components/Styled';

function App() {
  return (
    <StoreProvider store={store}>
      <Wrapper />
    </StoreProvider>
  );
}

export default App;
