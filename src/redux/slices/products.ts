import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/http';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await axios.get('/products?limit=12');
  return data;
});

const initialState = {
  products: {
    items: [],
    status: 'loading',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products.items = [];
      state.products.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products.items = [];
      state.products.status = 'error';
    });
  },
});

export const productsReducer = productsSlice.reducer;
