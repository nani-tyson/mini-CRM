import { createSlice } from '@reduxjs/toolkit';

// --- START: MODIFIED SECTION ---

// 1. Get the stored items first
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

// 2. Parse only if the item exists and is not 'undefined'
const user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
const token = storedToken ? storedToken : null;

const initialState = {
  user,
  token,
};

// --- END: MODIFIED SECTION ---


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Save the credentials to localStorage
      // Ensure user object is not undefined before stringifying
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      if (token) {
        localStorage.setItem('token', token);
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;

      // Clear the credentials from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;