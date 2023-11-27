import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { modalsReducer } from './slices/modals';
import { productsReducer } from './slices/products';
import { userReducer } from './slices/user';
import { cartReducer } from './slices/cart';

const persistConfigUser = {
  key: 'user',
  storage,
};

const persistConfigCart = {
  key: 'cart',
  storage,
};

const persistedUserReducer = persistReducer(persistConfigUser, userReducer);
const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    products: productsReducer,
    user: persistedUserReducer,
    cart: persistedCartReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
