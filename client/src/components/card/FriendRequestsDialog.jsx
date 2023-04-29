import { Cancel, CheckCircle } from '@mui/icons-material';
import {
    Avatar,
    Dialog,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { respondToFriendRequest } from '../../services/api';
import { useDispatch } from 'react-redux';
import { addFriend } from '../../lib/redux/friendsSlice';
import { useLogout } from '../../hooks/useLogout';

export function FriendRequestsDialog({
    user,
    requests,
    setRequests,
    setResponse,
    ...props
}) {
    const dispatch = useDispatch();
    const { logoutOnInvalidToken } = useLogout();

    const handleRespond = (action, target) =>
        respondToFriendRequest(user.token, action, target._id)
            .then((res) => {
                const requestsCopy = [...requests];
                requestsCopy.splice(requestsCopy.indexOf(target), 1);
                setRequests(requestsCopy);
                setResponse(res);
                if (action === 'accept') dispatch(addFriend(target));
            })
            .catch((err) => logoutOnInvalidToken(err));

    return (
        <Dialog {...props}>
            <DialogTitle>Friend requests</DialogTitle>
            <List>
                {requests.map((request) => (
                    <ListItem key={request._id}>
                        <ListItemAvatar>
                            <Avatar src={request.photoURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={request.username}
                            secondary='Confirm friend request'
                        />
                        <ListItemIcon>
                            <IconButton
                                onClick={() => handleRespond('accept', request)}
                            >
                                <CheckCircle />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemIcon>
                            <IconButton
                                onClick={() => handleRespond('reject', request)}
                            >
                                <Cancel />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
