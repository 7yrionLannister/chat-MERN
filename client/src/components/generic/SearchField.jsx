import { ArrowBack, Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';

export function SearchField({
    label = 'Search',
    onFocus = () => {},
    onBlur = () => {},
    ...props
}) {
    const [focused, setFocused] = useState(false);

    return (
        <TextField
            {...props}
            id='search-field'
            type='search'
            label={label}
            focused={focused}
            onFocus={(e) => {
                onFocus(e);
                setFocused(true);
            }}
            onBlur={(e) => {
                onBlur(e);
                setFocused(false);
            }}
            InputProps={{
                endAdornment: (
                    <label htmlFor='search-field'>
                        <IconButton onClick={() => setFocused((v) => !v)}>
                            {focused ? <ArrowBack /> : <Search />}
                        </IconButton>
                    </label>
                )
            }}
        />
    );
}
