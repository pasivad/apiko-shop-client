import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Shop from './pages/Shop/Shop';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';

function App() {
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
