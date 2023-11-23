import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './redux/store';

import Shop from './pages/Shop/Shop';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';

function App() {
  const modals = useSelector((state: RootState) => state.modals);

  if (Object.values(modals).includes(true)) {
    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'scroll';
  } else {
    document.body.style.position = 'static';
    document.body.style.overflowY = 'auto';
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Shop />}
      ></Route>
      <Route
        path="/p/:id"
        element={<Shop />}
      ></Route>
      <Route
        path="/account"
        element={<Account />}
      ></Route>
      <Route
        path="/account/orders"
        element={<Account />}
      ></Route>
      <Route
        path="/account/favourites"
        element={<Account />}
      ></Route>
      <Route
        path="/cart"
        element={<Cart />}
      ></Route>
    </Routes>
  );
}

export default App;
