import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { Layout } from 'Components';

function App() {
  return (
    <StoreProvider store={store}>
      <Layout />
    </StoreProvider>
  );
}

export default App;
