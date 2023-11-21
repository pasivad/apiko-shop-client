import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from './api/http';

import type { AppDispatch } from './redux/store';

import { fetchUser } from './redux/slices/user';

import Shop from './pages/Shop/Shop';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser())
  }, []);

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
        path="/cart"
        element={<Cart />}
      ></Route>
    </Routes>
  );
}

export default App;
