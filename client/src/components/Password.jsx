import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { ValidatedField } from './ValidatedField';

export function Password({ label = 'Password', ...props }) {
    const [visible, setVisible] = useState(false);

    return (
        <ValidatedField
            {...props}
            type={visible ? 'text' : 'password'}
            label={label}
            InputProps={{
                endAdornment: (
                    <IconButton onClick={() => setVisible((v) => !v)}>
                        {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                )
            }}
            errorMessage='Password must be at least 8 characters long, contain both uppercase and lowercase letters, and a special character'
            isValid={(value) =>
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])(?=.{8,})/.test(
                    value
                )
            }
        />
    );
}
