import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

interface CartItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  quantity: number;
  favorite: boolean;
}

const initialState = {
  products: {
    items: [] as Array<CartItemProps>,
    status: 'loading',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      try {
        axios.post(`/products/${action.payload}/favorite`);

        const index = state.products.items.findIndex((it: CartItemProps) => it.id === action.payload);
        const newItems = [...state.products.items];
        let objCopy = { ...state.products.items[index] };
        objCopy.favorite = true;
        newItems[index] = objCopy;

        return { ...state, products: { items: newItems, status: 'loaded' } };
      } catch (e) {
        console.error(e);
      }
    },
    deleteFavorite: (state, action: PayloadAction<number>) => {
      try {
        axios.delete(`/products/${action.payload}/favorite`);

        const index = state.products.items.findIndex((it: CartItemProps) => it.id === action.payload);
        const newItems = [...state.products.items];
        let objCopy = { ...state.products.items[index] };
        objCopy.favorite = false;
        newItems[index] = objCopy;

        return { ...state, products: { items: newItems, status: 'loaded' } };
      } catch (e) {
        console.error(e);
      }
    },
  },
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

export const { addFavorite, deleteFavorite } = productsSlice.actions;
