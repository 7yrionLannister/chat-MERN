import { Alert, AlertTitle, Backdrop } from '@mui/material';

export function ResponseAlert({ response, onClick, errorMessage }) {
    return (
        <Backdrop
            open={response != null}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            onClick={onClick}
        >
            <Alert severity='error'>
                <AlertTitle>
                    {response?.status + ' ' + response?.statusText}
                </AlertTitle>
                {errorMessage}
            </Alert>
        </Backdrop>
    );
}
