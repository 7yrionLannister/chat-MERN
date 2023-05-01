import { Grid, Link, Button } from '@mui/material';
import { Password } from '../components/generic/Password';
import { Form } from '../components/generic/Form';
import { ResponseAlert } from '../components/generic/ResponseAlert';
import { AuthenticationFormTitle } from '../components/generic/AuthenticationFormTitle';
import { ValidatedField } from '../components/generic/ValidatedField';
import { useState } from 'react';
import { loginApi } from '../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../lib/redux/userSlice';
import { Link as RouterLink } from 'react-router-dom';

export function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        loginApi(username, password)
            .then((res) => {
                const { _id, username, photoURL, bio, token } = res.data;
                const payload = {
                    _id,
                    username,
                    photoURL,
                    bio,
                    token
                };
                dispatch(login(payload));
                localStorage.setItem('user', JSON.stringify(payload));
            })
            .catch((err) => setResponse(err));
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            title={<AuthenticationFormTitle title='Sign In' />}
        >
            <ResponseAlert
                response={response}
                onClick={() => setResponse(null)}
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
