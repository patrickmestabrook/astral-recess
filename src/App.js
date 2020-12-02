import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { Meditation } from 'Components';

function App() {
  return (
    <StoreProvider store={store}>
      <Meditation />
    </StoreProvider>
  );
}

export default App;
