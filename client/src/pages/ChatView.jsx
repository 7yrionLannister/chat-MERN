import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMessages } from '../services/api';

export function ChatView({ sender, receiver, drawerWidth }) {
    const styleRightToDrawer = {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`
    };

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages(sender.token, receiver._id)
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    }, [sender, receiver]);

    return (
        <Box sx={styleRightToDrawer}>
            <AppBar position='sticky'>
                <Toolbar>
                    <Avatar src={receiver.photoURL} />
                    <Typography
                        ml={2}
                        variant='h6'
                        flexGrow='1'
                    >
                        {receiver.username}
                    </Typography>
                </Toolbar>
            </AppBar>
            {messages.map((msg) => (
                <Box>
                    <h1>From: {msg.sender}</h1>
                    <h1>To: {msg.receiver}</h1>
                    <p>{msg.message}</p>
                </Box>
            ))}
        </Box>
    );
}
