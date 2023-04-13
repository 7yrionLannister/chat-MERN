import { useSelector } from 'react-redux';
import { selectUser } from './lib/redux/userSlice';
import { Home, SignIn } from './pages';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const user = useSelector(selectUser);

    return (
        <>
            <CssBaseline />
            {user ? <Home /> : <SignIn />}
        </>
    );
}

export default App;
