import { Alert, Snackbar } from '@mui/material';

export function ResponseSnackbar({
    response,
    onClose,
    autoHideDuration = 2500
}) {
    return (
        <Snackbar
            open={response != null}
            onClose={onClose}
            autoHideDuration={autoHideDuration}
        >
            {response && (
                <Alert
                    severity={response.status === 200 ? 'success' : 'error'}
                    onClose={onClose}
                >
                    {response.data}
                </Alert>
            )}
        </Snackbar>
    );
}
