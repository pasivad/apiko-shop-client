import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  quantity: number;
}

const initialState = {
  cart: [] as Array<CartItemProps>,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemProps>) => {
      const index = state.cart.findIndex((it) => it.id === action.payload.id);
      if (index !== -1) {
        const objCopy = { ...action.payload };
        const newItems = [...state.cart];
        objCopy.quantity = newItems[index].quantity + action.payload.quantity;
        newItems[index] = objCopy;
        return { ...state, cart: newItems };
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const newItems = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, cart: newItems };
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((it) => it.id === action.payload);
      const newItems = [...state.cart];
      newItems[index].quantity--;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((it) => it.id === action.payload);
      const newItems = [...state.cart];
      newItems[index].quantity++;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteFromCart, decrementQuantity, incrementQuantity, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
