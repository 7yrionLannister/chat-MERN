import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import friendsReducer from './friendsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        friends: friendsReducer
    }
});
