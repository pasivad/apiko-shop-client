import { configureStore } from '@reduxjs/toolkit';

import { modalsReducer } from './slices/modals';
import { productsReducer } from './slices/products';
import { userReducer } from './slices/user';

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    products: productsReducer,
    user: userReducer,
  },
  devTools: true,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
