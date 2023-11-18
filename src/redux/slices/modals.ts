import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerModal: false,
  loginModal: false,
  authModal: false,
  cartModal: false,
  productModal: false,
  orderModal: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    registerModal(state) {
      state.registerModal = !state.registerModal;
    },
    loginModal(state) {
      state.loginModal = !state.loginModal;
    },
    authModal(state) {
      state.authModal = !state.authModal;
    },
    cartModal(state) {
      state.cartModal = !state.cartModal;
    },
    productModal(state) {
      state.productModal = !state.productModal;
    },
    orderModal(state) {
      state.orderModal = !state.orderModal;
    },
  },
});

export const modalsReducer = modalsSlice.reducer;

export const { registerModal, loginModal, authModal, cartModal, productModal, orderModal } = modalsSlice.actions;
