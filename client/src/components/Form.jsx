import { Container, Box, Paper } from '@mui/material';

export function Form({ children, title, handleSubmit }) {
    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Paper elevation={8}>
                <Box
                    mt={8}
                    p={2}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    {title}
                    <Box
                        mt={1}
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
