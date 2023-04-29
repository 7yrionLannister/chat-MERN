import { Chat, PersonAdd, PersonRemove } from '@mui/icons-material';
import {
    Avatar,
    Chip,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers, sendFriendRequest, unfriend } from '../../../services/api';
import { removeFriendById } from '../../../lib/redux/friendsSlice';
import { useDispatch } from 'react-redux';
import { useLogout } from '../../../hooks/useLogout';

export function AllUsersListItems({
    filter,
    user,
    onFriendClick,
    onActionResponse,
    onShowUserInfo
}) {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const { logoutOnInvalidToken } = useLogout();

    useEffect(() => {
        getUsers(user.token)
            .then((res) => setUsers(res.data))
            .catch((err) => logoutOnInvalidToken(err));
    }, [user, logoutOnInvalidToken]);

    const handleUnfriend = (friend) =>
        unfriend(user.token, friend._id).then((res) => {
            dispatch(removeFriendById(friend._id));
            onActionResponse(res);
        });

    const handleSendFriendRequest = (newFriend) =>
        sendFriendRequest(user.token, newFriend.username).then((res) =>
            onActionResponse(res)
        );

    return (
        <>
            {users.map((u) => {
                const isFriend = u.friends.indexOf(user._id) !== -1;
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
                                    <Chat />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar onClick={() => onShowUserInfo(u)}>
                                <Tooltip
                                    title='See user info'
                                    arrow
                                >
                                    <Avatar src={u.photoURL} />
                                </Tooltip>
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
                        </ListItem>
                        <Divider />
                    </>
                );
            })}
        </>
    );
}
