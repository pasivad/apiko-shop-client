import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/http';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ sort, page }: { sort: string; page: number }) => {
    sort = sort || 'latest';
    const { data } = await axios.get(`/products?limit=12&offset=${page * 12 - 12}&sortBy=${sort}`);
    return data;
  }
);

export const fetchProductsSearch = createAsyncThunk('products/fetchProductsSearch', async (search: string) => {
  const { data } = await axios.get(`/products/search?keywords=${search}&limit=12`);
  return data;
});

export const fetchProductsCategory = createAsyncThunk(
  'products/fetchProductsCategory',
  async ({ page, categoryId, sort }: { page: number; categoryId: number; sort: string }) => {
    sort = sort || 'latest';
    const { data } = await axios.get(
      `/categories/${categoryId}/products?offset=${page * 12 - 12}&limit=12&sortBy=${sort}`
    );
    return data;
  }
);

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
      state.products.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products.status = 'error';
    });
    builder.addCase(fetchProductsCategory.pending, (state) => {
      state.products.status = 'loading';
    });
    builder.addCase(fetchProductsCategory.fulfilled, (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    });
    builder.addCase(fetchProductsCategory.rejected, (state) => {
      state.products.status = 'error';
    });
    builder.addCase(fetchProductsSearch.pending, (state) => {
      state.products.status = 'loading';
    });
    builder.addCase(fetchProductsSearch.fulfilled, (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    });
    builder.addCase(fetchProductsSearch.rejected, (state) => {
      state.products.status = 'error';
    });
  },
});

export const productsReducer = productsSlice.reducer;
