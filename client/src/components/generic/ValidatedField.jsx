import { TextField } from '@mui/material';
import { useState } from 'react';

export function ValidatedField({
    errorMessage = 'Invalid input',
    isValid = () => true,
    onChange = (e) => {},
    ...props
}) {
    const [valid, setValid] = useState(true);

    return (
        <TextField
            {...props}
            helperText={valid ? ' ' : errorMessage}
            error={!valid}
            onChange={(e) => {
                onChange(e);
                setValid(isValid(e.target.value));
            }}
        />
    );
}
