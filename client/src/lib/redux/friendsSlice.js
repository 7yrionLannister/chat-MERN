import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: [],
    reducers: {
        addFriend: (state, action) => {
            const { _id, username, photoURL, bio } = action.payload;
            state.push({ _id, username, photoURL, bio });
        },
        removeFriendById: (state, action) => {
            let index = state.findIndex(
                (friend) => friend._id === action.payload
            );
            if (index > -1) state.splice(index, 1);
        },
        clearFriends: (state) => {
            state.splice(0, state.length);
        }
    }
});

export const { addFriend, removeFriendById, clearFriends } =
    friendsSlice.actions;
export const selectFriends = (state) => state.friends;
export default friendsSlice.reducer;
