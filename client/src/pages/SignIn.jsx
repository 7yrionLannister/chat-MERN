import {
    Container,
    Box,
    Grid,
    Avatar,
    Typography,
    Link,
    Button,
    FormControlLabel,
    Checkbox,
    Paper,
    Backdrop,
    Alert,
    AlertTitle
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Password } from '../components/Password';
import { ValidatedField } from '../components/ValidatedField';
import { useState } from 'react';
import { loginApi } from '../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../lib/redux/userSlice';

export function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username, password);

        let res = await loginApi(username, password);
        if (res.status === 200) dispatch(login({ username, password }));
        setResponse(res);
    };

    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Paper elevation={8}>
                <Box
                    mt={8}
                    p={2}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <Backdrop
                        open={response != null}
                        sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1
                        }}
                        onClick={() => setResponse(null)}
                    >
                        <Alert
                            severity={
                                response?.status === 200 ? 'success' : 'info'
                            }
                        >
                            <AlertTitle>
                                {response?.status + ' ' + response?.statusText}
                            </AlertTitle>
                            {response?.status === 200
                                ? 'Succesfully logged in'
                                : response?.data}
                        </Alert>
                    </Backdrop>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant='h5'>Sign In</Typography>
                    <Box
                        mt={1}
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <ValidatedField
                            margin='normal'
                            fullWidth
                            required
                            label='Username'
                            isValid={(value) => value.length >= 4}
                            errorMessage='At least 4 characters long'
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            name='username'
                        />
                        <Password
                            margin='normal'
                            fullWidth
                            required
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
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
                                    href='#'
                                    variant='body2'
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
