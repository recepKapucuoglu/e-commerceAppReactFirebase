import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isLoggedIn: null,
  // email: null,
  // userName: null,
  // userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log('Action Payload:');
      console.log(action.payload);
      const { email, userName, userID } = action.payload;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.isLoggedIn = true;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.isLoggedIn = false;
      // console.log(state.isLoggedIn);
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectEmail = (state) => state.auth.email;

export const selectUserName = (state) => state.auth.userName;

export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
