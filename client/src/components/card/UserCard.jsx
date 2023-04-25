import {
    Avatar,
    Badge,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../lib/redux/userSlice';
import { PersonAddAlt1 } from '@mui/icons-material';
import { getUsers, sendFriendRequest } from '../../services/api';
import { useEffect, useState } from 'react';
import { ResponseSnackbar } from '../generic/ResponseScackbar';
import { FriendRequestsDialog } from './FriendRequestsDialog';

export function UserCard({ user }) {
    const authUser = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const [actionResponse, setActionResponse] = useState(null);
    const [requests, setRequests] = useState([]);
    const isCurrentUser = authUser._id === user._id;

    useEffect(() => {
        if (isCurrentUser)
            getUsers(authUser.token, authUser._id).then((resUser) =>
                resUser.data.requests.forEach((req) =>
                    getUsers(authUser.token, req).then((resReq) =>
                        setRequests((rs) => [...rs, resReq.data])
                    )
                )
            );
    }, [isCurrentUser, authUser]);

    const handleSendFriendRequest = () =>
        sendFriendRequest(authUser.token, user.username).then((res) =>
            setActionResponse(res)
        );

    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={user.photoURL} />}
                action={
                    <IconButton
                        onClick={
                            isCurrentUser
                                ? () => setOpen(true)
                                : handleSendFriendRequest
                        }
                    >
                        <Badge
                            badgeContent={isCurrentUser ? requests.length : 0}
                            color='secondary'
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                        >
                            <PersonAddAlt1 color='action' />
                        </Badge>
                    </IconButton>
                }
                title={user.username}
                subheader={
                    isCurrentUser ? 'Update your profile' : 'User profile'
                }
            />
            <CardContent>
                <Typography>{user.bio}</Typography>
                <ResponseSnackbar
                    response={actionResponse}
                    onClose={() => setActionResponse(null)}
                />
            </CardContent>
            {isCurrentUser && (
                <FriendRequestsDialog
                    open={open}
                    user={authUser}
                    onClose={() => setOpen(false)}
                    requests={requests}
                    setRequests={setRequests}
                />
            )}
        </Card>
    );
}
