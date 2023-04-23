import {
    Avatar,
    Button,
    Drawer,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import { DrawerList } from './drawerlist/DrawerList';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../lib/redux/userSlice';

export function ChatsDrawer({ user, width, onFriendClick }) {
    const dispatch = useDispatch();
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
            <Toolbar
                sx={{
                    position: 'sticky',
                    bgcolor: 'primary.main',
                    color: 'white',
                    width
                }}
            >
                <Button onClick={handleUserAvatarClick}>
                    <Avatar src={user.photoURL} />
                </Button>
                <Typography variant='h6'>{user.username}</Typography>
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
            <DrawerList
                user={user}
                onFriendClick={onFriendClick}
            />
        </Drawer>
    );
}
