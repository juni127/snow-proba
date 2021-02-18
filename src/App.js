import React from 'react';

import {
  Provider
} from 'react-redux';

import store from './redux/store';

import {
  TelaPrincipal
} from './telas';

function App() {
  return (
    <Provider store={store}>
      <TelaPrincipal />
    </Provider>
  );
}

export default App;
