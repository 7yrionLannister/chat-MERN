import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../lib/redux/userSlice';
import { useState } from 'react';
import { ChatsDrawer } from '../components/ChatsDrawer';
import { ChatView } from './ChatView';
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';

const drawerWidth = 400;

export const Home = () => {
    const user = useSelector(selectUser);
    const [currentFriend, setCurrentFriend] = useState(null);
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleLogout = () => {
        setOpenAvatarMenu(false);
        localStorage.removeItem('user');
        dispatch(logout());
    };

    const handleUserAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenAvatarMenu(true);
    };

    return (
        <>
            {currentFriend && (
                <ChatView
                    drawerWidth={drawerWidth}
                    sender={user}
                    receiver={currentFriend}
                />
            )}
            <ChatsDrawer
                width={drawerWidth}
                onFriendClick={(friend) => setCurrentFriend(friend)}
            >
                <Toolbar
                    sx={{
                        position: 'sticky',
                        bgcolor: 'primary.main',
                        width: drawerWidth
                    }}
                >
                    <Button onClick={handleUserAvatarClick}>
                        <Avatar src={user.photoURL} />
                    </Button>
                    <Typography
                        variant='h6'
                        color='#fff'
                    >
                        {user.username}
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={openAvatarMenu}
                        onClose={() => setOpenAvatarMenu(false)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </ChatsDrawer>
        </>
    );
};
