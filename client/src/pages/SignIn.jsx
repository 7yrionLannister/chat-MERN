import { Grid, Link, Button, FormControlLabel, Checkbox } from '@mui/material';
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        let res = await loginApi(username, password);
        if (res.status === 200) {
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
