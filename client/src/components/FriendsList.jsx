import {
    Avatar,
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userSlice';
import { getUsers } from '../services/api';

export function FriendsList({ onFriendClick }) {
    const user = useSelector(selectUser);
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        console.log('friendslist');
        user?.friends.forEach((friend) =>
            getUsers(user.token, friend).then((res) =>
                setFriends((prevFriends) => [...prevFriends, res.data])
            )
        );
        getUsers(user.token).then((res) => setUsers(res.data));
    }, [user]);

    return (
        <List>
            <ListSubheader>
                <FormControl
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    <InputLabel>User</InputLabel>
                    <Select
                        label='User'
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        {users?.map((user) => (
                            <MenuItem
                                key={user._id}
                                value={user._id}
                            >
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ListSubheader>
            {friends.map((friend) => (
                <>
                    <ListItem
                        disablePadding
                        key={friend._id}
                        alignItems='flex-start'
                    >
                        <ListItemButton onClick={() => onFriendClick(friend)}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={friend.username}
                                    src={friend.photoURL}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={friend.username}
                                secondary='Last message sent'
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    );
}
