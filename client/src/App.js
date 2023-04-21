import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './lib/redux/userSlice';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { decodeJwt } from 'jose';
import { Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';

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
        const userObj = JSON.parse(u);
        if (
            userObj &&
            new Date(decodeJwt(userObj.token).exp * 1000) - new Date() > 0
        ) {
            dispatch(login(userObj));
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route
                    path='/'
                    element={user ? <Home /> : <SignIn />}
                />
                <Route
                    path='/signup'
                    element={<SignUp />}
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
