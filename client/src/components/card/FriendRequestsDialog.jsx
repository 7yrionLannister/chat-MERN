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

export function FriendRequestsDialog({
    user,
    open,
    onClose,
    requests,
    setRequests
}) {
    const handleRespond = (action, target) =>
        respondToFriendRequest(user.token, action, target._id).then(() => {
            const requestsCopy = [...requests];
            requestsCopy.splice(requestsCopy.indexOf(target), 1);
            setRequests(requestsCopy);
        });

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
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
