import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (state, action) => {
            const { _id, username, photoURL, friends, requests, bio, token } =
                action.payload;
            state.user_id = _id;
            state.username = username;
            state.photoURL = photoURL;
            state.friends = friends;
            state.requests = requests;
            state.bio = bio;
            state.token = token;
        },
        logout: () => null
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;