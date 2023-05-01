import {
    Avatar,
    Badge,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    IconButton,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../lib/redux/userSlice';
import { Edit, PersonAddAlt1 } from '@mui/icons-material';
import { getUsers, sendFriendRequest } from '../../services/api';
import { useEffect, useState } from 'react';
import { ResponseSnackbar } from '../generic/ResponseScackbar';
import { FriendRequestsDialog } from './FriendRequestsDialog';
import { SignUp } from '../../pages/SignUp';
import { useLogout } from '../../hooks/useLogout';

export function UserCard({ user }) {
    const authUser = useSelector(selectUser);
    const [openRequestsDialog, setOpenRequestsDialog] = useState(false);
    const [openUpdateInformationDialog, setOpenUpdateInformationDialog] =
        useState(false);
    const [actionResponse, setActionResponse] = useState(null);
    const [requests, setRequests] = useState([]);
    const isCurrentUser = authUser._id === user._id;
    const { logoutOnInvalidToken } = useLogout();

    useEffect(() => {
        if (isCurrentUser)
            getUsers(authUser.token, authUser._id)
                .then((resUser) =>
                    resUser.data.requests.forEach((req) =>
                        getUsers(authUser.token, req).then((resReq) =>
                            setRequests((rs) => [...rs, resReq.data])
                        )
                    )
                )
                .catch((err) => logoutOnInvalidToken(err));
    }, [isCurrentUser, authUser, logoutOnInvalidToken]);

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
                                ? () => setOpenRequestsDialog(true)
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
                {isCurrentUser && (
                        <FriendRequestsDialog
                            open={openRequestsDialog && requests.length}
                            user={authUser}
                            onClose={() => setOpenRequestsDialog(false)}
                            requests={requests}
                            setRequests={setRequests}
                            setResponse={setActionResponse}
                        />
                    ) && (
                        <Dialog
                            open={openUpdateInformationDialog}
                            onClose={() =>
                                setOpenUpdateInformationDialog(false)
                            }
                            onKeyDown={(e) => e.stopPropagation()}
                        >
                            {/* had to do this because the TextFields inside the Dialog did not allow you to use some capital letters. I know it is not the best practice but I also do not know the cause of the issue or a better solution */}
                            <SignUp user={authUser} />
                        </Dialog>
                    )}
            </CardContent>
            <CardActions>
                {isCurrentUser && (
                    <Chip
                        icon={<Edit />}
                        onClick={() => setOpenUpdateInformationDialog(true)}
                        label='Update profile information'
                    />
                )}
            </CardActions>
        </Card>
    );
}
