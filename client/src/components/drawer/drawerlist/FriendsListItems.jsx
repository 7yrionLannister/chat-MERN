import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { useEffect } from 'react';
import { getUsers } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import {
    addFriend,
    clearFriends,
    selectFriends
} from '../../../lib/redux/friendsSlice';
import { useLogout } from '../../../hooks/useLogout';

export function FriendsListItems({ user, onFriendClick }) {
    const friends = useSelector(selectFriends);
    const dispatch = useDispatch();
    const { logoutOnInvalidToken } = useLogout();

    useEffect(() => {
        dispatch(clearFriends());
        getUsers(user.token, user._id)
            .then((responseUser) =>
                responseUser.data.friends.forEach((friend) =>
                    getUsers(user.token, friend).then((responseFriend) =>
                        dispatch(addFriend(responseFriend.data))
                    )
                )
            )
            .catch((err) => logoutOnInvalidToken(err));
    }, [user, dispatch, logoutOnInvalidToken]);

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
