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
    Paper
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Password } from '../components/Password';
import { ValidatedField } from '../components/ValidatedField';

export function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    };
    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Paper elevation={5}>
                <Box
                    mt={8}
                    p={2}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
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
                        />
                        <Password
                            margin='normal'
                            fullWidth
                            required
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
