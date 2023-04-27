import { Alert, AlertTitle, Backdrop } from '@mui/material';

export function ResponseAlert({ response, errorMessage, ...props }) {
    return (
        <Backdrop
            {...props}
            open={response != null}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Alert severity='error'>
                <AlertTitle>
                    {response?.status + ' ' + response?.statusText}
                </AlertTitle>
                {response?.data}
            </Alert>
        </Backdrop>
    );
}
