import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    clearUser(state) {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
