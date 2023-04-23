import { Comment, Info, PersonAdd, PersonRemove } from '@mui/icons-material';
import {
    Avatar,
    Chip,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers, sendFriendRequest } from '../../../services/api';

export function AllUsersListItems({
    filter,
    user,
    onFriendClick,
    onActionResponse
}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers(user.token).then((res) => setUsers(res.data));
    }, [user]);

    const handleUnfriend = (friend) => {};

    const handleSendFriendRequest = (newFriend) => {
        sendFriendRequest(user.token, newFriend.username).then((res) =>
            onActionResponse(res.data)
        );
    };

    return (
        <>
            {users.map((u) => {
                const isFriend = u.friends.lastIndexOf(user._id) !== -1;
                return (
                    <>
                        <ListItem
                            sx={
                                filter !== '' &&
                                !u.username.startsWith(filter) && {
                                    display: 'none'
                                }
                            }
                            alignItems='flex-start'
                            key={u._id}
                            secondaryAction={
                                <IconButton
                                    edge='end'
                                    disabled={!isFriend}
                                    onClick={() => onFriendClick(u)}
                                >
                                    <Comment />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar onClick={() => alert('Show info')}>
                                <Avatar src={u.photoURL} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={u.username}
                                secondary={
                                    isFriend
                                        ? 'Send a message'
                                        : 'Send a friend request'
                                }
                            />
                            <ListItemIcon>
                                <Chip
                                    color={isFriend ? 'success' : 'info'}
                                    label={isFriend ? 'Friend' : 'Not friends'}
                                    icon={isFriend ? null : <PersonAdd />}
                                    onClick={
                                        isFriend
                                            ? null
                                            : () => handleSendFriendRequest(u)
                                    }
                                    onDelete={
                                        isFriend
                                            ? () => handleUnfriend(u)
                                            : null
                                    }
                                    deleteIcon={<PersonRemove />}
                                />
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton>
                                    <Info />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                    </>
                );
            })}
        </>
    );
}
