import { useDispatch } from 'react-redux';
import { logout } from '../lib/redux/userSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('user');
        dispatch(logout());
    };
    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};
