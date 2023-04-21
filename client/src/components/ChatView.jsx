import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';

export function ChatView({ sender, receiver, drawerWidth }) {
    const styleRightToDrawer = {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`
    };

    return (
        <>
            <AppBar
                position='fixed'
                sx={styleRightToDrawer}
            >
                <Toolbar>
                    <Avatar
                        alt={receiver.username}
                        src={receiver.photoURL}
                    />
                    <Typography
                        ml={2}
                        variant='h6'
                        flexGrow='1'
                    >
                        {receiver.username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                bgcolor='cyan'
                sx={styleRightToDrawer}
            >
                <h5>H5</h5>
                <p>Paragraph</p>
            </Box>
        </>
    );
}
