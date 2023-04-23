import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers } from '../../../services/api';

export function FriendsListItems({ user, onFriendClick }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getUsers(user.token, user._id).then((responseUser) =>
            responseUser.data.friends.forEach((friend) =>
                getUsers(user.token, friend).then((responseFriend) =>
                    setFriends((prevFriends) => [
                        ...prevFriends,
                        responseFriend.data
                    ])
                )
            )
        );
    }, [user]);

    return (
        <>
            {friends.map((friend) => (
                <>
                    <ListItem
                        disablePadding
                        key={friend._id}
                    >
                        <ListItemButton onClick={() => onFriendClick(friend)}>
                            <ListItemAvatar>
                                <Avatar src={friend.photoURL} />
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
        </>
    );
}
