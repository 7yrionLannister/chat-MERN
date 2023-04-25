import {
    Avatar,
    Button,
    Dialog,
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
import { UserCard } from '../card/UserCard';

export function ChatsDrawer({ user, width, onFriendClick }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('user');
        dispatch(logout());
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
                <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar src={user.photoURL} />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={anchorEl != null}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => setOpenProfile(true)}>
                        Profile
                    </MenuItem>
                    <Dialog
                        open={openProfile}
                        onClose={() => setOpenProfile(false)}
                    >
                        {openProfile && <UserCard user={user} />}
                    </Dialog>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Typography
                    variant='h6'
                    flexGrow={1}
                >
                    {user.username}
                </Typography>
            </Toolbar>
            <DrawerList
                user={user}
                onFriendClick={onFriendClick}
            />
        </Drawer>
    );
}
