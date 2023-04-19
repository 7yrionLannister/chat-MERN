import { Avatar, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export function AuthenticationFormTitle({ title }) {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{title}</Typography>
        </>
    );
}
