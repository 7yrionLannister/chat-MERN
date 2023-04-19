import { Grid, Link, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Password } from '../components/Password';
import { ValidatedField } from '../components/ValidatedField';
import { useState } from 'react';
import { loginApi } from '../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../lib/redux/userSlice';
import { Form } from '../components/Form';
import { ResponseAlert } from '../components/ResponseAlert';
import { AuthenticationFormTitle } from '../components/AuthenticationFormTitle';
import { Link as RouterLink } from 'react-router-dom';

export function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let res = await loginApi(username, password);
        if (res.status === 200) {
            dispatch(login({ username, password }));
            localStorage.setItem('user', JSON.stringify(res.data));
        } else {
            setResponse(res);
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            title={<AuthenticationFormTitle title='Sign In' />}
        >
            <ResponseAlert
                response={response}
                onClick={() => setResponse(null)}
                errorMessage={response?.data}
            />
            <ValidatedField
                margin='normal'
                fullWidth
                required
                label='Username'
                isValid={(value) => value.length >= 4}
                errorMessage='At least 4 characters long'
                onChange={(event) => setUsername(event.target.value)}
                name='username'
            />
            <Password
                margin='normal'
                fullWidth
                required
                onChange={(event) => setPassword(event.target.value)}
                name='password'
            />
            <FormControlLabel
                control={<Checkbox value='remember' />}
                label='Remember me'
            />
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid
                    item
                    xs
                >
                    <Link
                        href='#'
                        variant='body2'
                    >
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        component={RouterLink}
                        variant='body2'
                        to='/signup'
                    >
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Form>
    );
}
