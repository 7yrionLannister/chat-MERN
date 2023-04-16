import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './lib/redux/userSlice';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#006064'
        },
        secondary: {
            main: '#d81b60'
        }
    }
});

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) dispatch(login(JSON.parse(u)));
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {Object.keys(user).length > 0 ? <Home /> : <SignIn />}
        </ThemeProvider>
    );
}

export default App;
