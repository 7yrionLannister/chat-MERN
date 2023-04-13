import { TextField } from '@mui/material';
import { useState } from 'react';

export function ValidatedField({ errorMessage, isValid, ...props }) {
    const [valid, setValid] = useState(true);

    return (
        <TextField
            {...props}
            helperText={valid ? ' ' : errorMessage}
            error={!valid}
            onChange={(e) => setValid(isValid(e.target.value))}
        />
    );
}
