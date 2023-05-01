import { Box, Button, Grid, Link, TextField } from '@mui/material';
import { Form } from '../components/generic/Form';
import { ValidatedField } from '../components/generic/ValidatedField';
import { Password } from '../components/generic/Password';
import { ResponseAlert } from '../components/generic/ResponseAlert';
import { AuthenticationFormTitle } from '../components/generic/AuthenticationFormTitle';
import { signup, updateProfile } from '../services/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../lib/redux/userSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export function SignUp(props) {
    const [username, setUsername] = useState(props.user?.username || '');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState(props.user?.photoURL || '');
    const [bio, setBio] = useState(props.user?.bio || '');
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (props.user) {
            updateProfile(
                props.user.token,
                username,
                password,
                photoURL,
                bio
            ).then(() => logout());
        } else {
            signup(username, password, photoURL, bio)
                .then((res) => {
                    dispatch(login(res.data));
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/');
                })
                .catch((err) => setResponse(err));
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            title={
                <AuthenticationFormTitle
                    title={
                        props.user
                            ? 'Update your profile information'
                            : 'Sign Up'
                    }
                />
            }
        >
            <ResponseAlert
                response={response}
                onClick={() => setResponse(null)}
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
                        label='Username'
                        required
                        isValid={(value) => value.length >= 4}
                        errorMessage='At least 4 characters long'
                        onChange={(event) => setUsername(event.target.value)}
                        name='username'
                        value={username}
                    />
                </Grid>
                <Grid
                    item
                    xs
                >
                    <Password
                        margin='normal'
                        required={!props.user}
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
                value={photoURL}
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
                value={bio}
            />
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
            >
                {props.user ? 'Update information' : 'Sign Up'}
            </Button>
            {!props.user && (
                <Link
                    variant='body2'
                    component={RouterLink}
                    to='/'
                >
                    Already have an account? Sign In
                </Link>
            )}
        </Form>
    );
}
