import {
    Avatar,
    Button,
    Divider,
    Drawer,
    Menu,
    MenuItem,
    Toolbar
} from '@mui/material';
import { FriendsList } from './FriendsList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../lib/redux/userSlice';

export function ChatsDrawer({ user, width, friends }) {
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleLogout = (event) => {
        setOpenAvatarMenu(false);
        localStorage.removeItem('user');
        dispatch(logout());
    };

    const handleUserAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenAvatarMenu(true);
    };

    return (
        <Drawer
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box'
                }
            }}
            variant='permanent'
            anchor='left'
        >
            <Toolbar>
                <Button onClick={handleUserAvatarClick}>
                    <Avatar src={user.photoURL} />
                </Button>
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
            <Divider />
            <FriendsList friends={friends} />
        </Drawer>
    );
}
