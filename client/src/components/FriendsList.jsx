import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { SearchField } from './SearchField';

export function FriendsList({ user, onFriendClick }) {
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        user?.friends?.forEach((friend) =>
            getUsers(user.token, friend).then((res) =>
                setFriends((prevFriends) => [...prevFriends, res.data])
            )
        );
        getUsers(user.token).then((res) => setUsers(res.data));
    }, [user]);

    const usersList = users?.map((user) => (
        <>
            <ListItem
                disablePadding
                key={user._id}
            >
                <ListItemButton onClick={() => console.log('chupa')}>
                    <ListItemAvatar>
                        <Avatar
                            alt={user.username}
                            src={user.photoURL}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.username}
                        secondary='users list'
                    />
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    ));

    const friendsList = friends?.map((friend) => (
        <>
            <ListItem
                disablePadding
                key={friend._id}
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
    ));

    return (
        <List>
            <ListSubheader>
                <SearchField
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => setTimeout(() => setFocused(false), 150)} // set timeout so that click on search list is not mistaken for click on friends list
                    fullWidth
                    label='Search users'
                />
            </ListSubheader>
            {focused ? usersList : friendsList}
        </List>
    );
}
