import { useSelector } from 'react-redux';
import { selectUser } from './lib/redux/userSlice';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { createTheme, ThemeProvider } from '@mui/material';

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {user ? <Home /> : <SignIn />}
        </ThemeProvider>
    );
}

export default App;
