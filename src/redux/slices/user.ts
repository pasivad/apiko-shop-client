import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/http';

export const fetchRegister = createAsyncThunk('/user/fetchRegister', async (params: Object) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchLogin = createAsyncThunk('/user/fetchLogin', async (params: Object) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchUser = createAsyncThunk('/user/fetchUser', async () => {
  const { data } = await axios.get('/account');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
  },
});

export const selectIsLogin = (state: any) => Boolean(state.user.data);

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
