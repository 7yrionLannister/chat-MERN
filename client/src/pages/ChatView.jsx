import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../services/api';
import { Send } from '@mui/icons-material';
import { MessageCard } from '../components/card/MessageCard';

export function ChatView({ sender, receiver, drawerWidth, ...props }) {
    const styleRightToDrawer = {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`
    };

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(sender.token, receiver._id, message).then(() => {
            setMessages((msgs) => [
                ...msgs,
                { receiver: receiver._id, message }
            ]);
            setMessage('');
        });
    };

    useEffect(() => {
        getMessages(sender.token, receiver._id)
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    }, [sender, receiver]);

    return (
        <>
            <AppBar
                position='sticky'
                sx={styleRightToDrawer}
            >
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
            <Box
                display='flex'
                flexDirection='column'
                sx={styleRightToDrawer}
                {...props}
            >
                {messages.map((msg) => (
                    <MessageCard
                        key={msg._id}
                        sender={
                            msg.receiver === receiver._id ? sender : receiver
                        }
                        message={msg}
                        alignSelf={
                            msg.receiver === receiver._id
                                ? 'flex-end'
                                : 'flex-start'
                        }
                    />
                ))}
            </Box>
            <Toolbar />
            <Toolbar
                fullWidth
                sx={{
                    position: 'fixed',
                    bgcolor: 'primary.main',
                    top: 'auto',
                    bottom: 0,
                    ...styleRightToDrawer
                }}
            >
                <TextField
                    multiline
                    fullWidth
                    size='small'
                    color='secondary'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{
                        sx: { bgcolor: 'white' }
                    }}
                />
                <IconButton onClick={handleSendMessage}>
                    <Send />
                </IconButton>
            </Toolbar>
        </>
    );
}
