import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField
} from '@mui/material';
import { Form } from '../components/Form';
import { ValidatedField } from '../components/ValidatedField';
import { Password } from '../components/Password';
import { ResponseAlert } from '../components/ResponseAlert';
import { signupApi } from '../services/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../lib/redux/userSlice';
import { AuthenticationFormTitle } from '../components/AuthenticationFormTitle';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [bio, setBio] = useState('');
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = await signupApi(username, password, photoURL, bio);
        if (res.status === 201) {
            dispatch(login({ username, password }));
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/');
        } else {
            setResponse(res);
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            title={<AuthenticationFormTitle title='Sign Up' />}
        >
            <ResponseAlert
                response={response}
                onClick={() => setResponse(null)}
                errorMessage={response?.data}
            />
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs
                >
                    <ValidatedField
                        margin='normal'
                        required
                        label='Username'
                        isValid={(value) => value.length >= 4}
                        errorMessage='At least 4 characters long'
                        onChange={(event) => setUsername(event.target.value)}
                        name='username'
                    />
                </Grid>
                <Grid
                    item
                    xs
                >
                    <Password
                        margin='normal'
                        required
                        onChange={(event) => setPassword(event.target.value)}
                        name='password'
                    />
                </Grid>
            </Grid>
            <TextField
                type='url'
                margin='normal'
                fullWidth
                label='Photo URL'
                onChange={(event) => setPhotoURL(event.target.value)}
                name='photoURL'
            />
            <Box
                component='img'
                width='100%'
                src={photoURL}
                alt='Profile picture'
            />
            <TextField
                rows={3}
                margin='normal'
                fullWidth
                label='Bio'
                onChange={(event) => setBio(event.target.value)}
                name='bio'
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
                Sign Up
            </Button>
            <Link
                variant='body2'
                component={RouterLink}
                to='/'
            >
                Already have an account? Sign In
            </Link>
        </Form>
    );
}
