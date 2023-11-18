import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './App';
import './styles/globals.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route
          path="/*"
          element={<App />}
        ></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
