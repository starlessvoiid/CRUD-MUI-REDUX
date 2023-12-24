import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Company from './Component/Company';
import { Provider } from 'react-redux';
import { store } from './Redux/app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Company />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
