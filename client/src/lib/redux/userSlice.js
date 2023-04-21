import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (state, action) => {
            const { _id, username, photoURL, friends, requests, bio, token } =
                action.payload;
            return {
                user_id: _id,
                username: username,
                photoURL: photoURL,
                friends: friends,
                requests: requests,
                bio: bio,
                token: token
            };
        },
        logout: () => null
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
