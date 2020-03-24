import React from 'react';
import './App.css'
import { StoreContext } from 'redux-react-hook'
import PageRoutes from './router'
import store from './store'

function App() {
  return (
    <StoreContext.Provider value={store}>
      <PageRoutes />
    </StoreContext.Provider>
  );
}

export default App;
