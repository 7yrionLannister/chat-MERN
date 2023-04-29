import { useDispatch } from 'react-redux';
import { logout as logoutActionCreator } from '../lib/redux/userSlice';
import { useState } from 'react';

export function useLogout() {
    const dispatch = useDispatch();

    const [logout] = useState(() => () => {
        localStorage.removeItem('user');
        dispatch(logoutActionCreator());
    });
    const [logoutOnInvalidToken] = useState(() => (err) => {
        if (err.status === 401) logout();
    });

    return { logout, logoutOnInvalidToken };
}
