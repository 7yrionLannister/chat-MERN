import {
    Container,
    TextField,
    Box,
    Grid,
    Avatar,
    Typography,
    Link
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    };
    return (
        <Container
            component='main'
            sx={{ bgcolor: '#f0f0f0' }}
            maxWidth='sm'
        >
            <Box
                borderRadius={3}
                mt={8}
                py={3}
                display='flex'
                flexDirection='column'
                alignItems='center'
                bgcolor='#afafaf'
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography
                    component='h1'
                    variant='h5'
                >
                    Sign Up
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    mt={3}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item>
                            <TextField
                                required
                                label='Username'
                                helperText='At least 4 characters long'
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                type='password'
                                label='Password'
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Link
                    dir='dir'
                    rel='rel'
                    resource='res'
                    href='#'
                >
                    <Typography variant='caption'>
                        Don't have an account? Sign Up
                    </Typography>
                </Link>
            </Box>
        </Container>
    );
}
