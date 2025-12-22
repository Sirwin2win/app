import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//import api from './api/axiosInstance'; // <-- optional if you're using axios wrapper

const TOKEN_KEY = 'userToken';
const API_URL = 'https://api.buywaterh2o.com/api/auth' 

/**
 * Load token from AsyncStorage on app start
 */
export const loadToken = createAsyncThunk('auth/loadToken', async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token;
});

/**
 * Update Role Code
 */

export const updateRole = createAsyncThunk(
  'users/update',
  async ({ id, role }, thunkAPI) => {
    try {
       const res = await axios.put(`${API_URL}/update-role`, {
        role,
        id
       })
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Get Users
 */
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL)
      return res.data // { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Something went wrong' })

    }
  }
)

/**
 * REGISTER user
 * @param {name, email, password}
 */
export const create = createAsyncThunk(
  'auth/create',
  async ({ name, email, password,address, phone },thunkAPI)  => {
    // Replace this with your registration API endpoint
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      address,
      phone
    });

    const data = response.data;

    if (!data) {
      throw new Error('Registration failed: user not created');
    }

    // await AsyncStorage.setItem(TOKEN_KEY, data.token);

    return data;
  }
);

/**
 * LOGIN user
 */
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const data = response.data;

    if (!data.token) {
      throw new Error('Login failed: No token returned');
    }

    await AsyncStorage.setItem(TOKEN_KEY, data.token);

    return data;
  }
);

/**
 * LOGOUT user
 */
export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users:[],
    token: null,
    loading: false,
    status:'idle',
    error: null,
    user:null,
    isLoaded: false, // after AsyncStorage has been checked
  },
  reducers: {},

  extraReducers: builder => {
    builder
      // LOAD TOKEN
      .addCase(loadToken.pending, state => {
        state.loading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        state.isLoaded = true;
      })
      .addCase(loadToken.rejected, state => {
        state.loading = false;
        state.isLoaded = true;
      })

      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
       state.error = action.payload;
      })
     // update user
           .addCase(updateRole.pending, (state) => {
             state.status = 'loading';
             state.error = null;
           })
          .addCase(updateRole.fulfilled, (state, action) => {
             state.loading = false;
             const index = state.users.findIndex(p => p.id === action.payload.id);
             if (index !== -1) {
               state.users[index] = action.payload;
             }
             state.currentProduct = action.payload;
           })
           .addCase(updateRole.rejected, (state, action) => {
             state.status = 'failed';
             state.error = action.payload;
           })

      // REGISTER
      .addCase(create.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        // state.token = action.payload; // token returned from API
        state.user = action.payload.user
        state.loading = false;
        state.status = 'success'
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // LOGIN
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // LOGOUT
      .addCase(logout.fulfilled, state => {
        state.token = null;
      });
  },
});

export default authSlice.reducer;
