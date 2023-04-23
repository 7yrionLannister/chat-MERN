import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (_state, action) => {
            const { _id, username, photoURL, bio, token } = action.payload;
            return {
                _id,
                username,
                photoURL,
                bio,
                token
            };
        },
        logout: () => null
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
