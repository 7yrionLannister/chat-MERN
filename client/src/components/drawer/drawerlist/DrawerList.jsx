import {
    Dialog,
    Grid,
    IconButton,
    List,
    ListSubheader,
    Tooltip
} from '@mui/material';
import { useState } from 'react';
import { SearchField } from '../../generic/SearchField';
import { AllUsersListItems } from './AllUsersListItems';
import { FriendsListItems } from './FriendsListItems';
import { ResponseSnackbar } from '../../generic/ResponseScackbar';
import { UserCard } from '../../card/UserCard';
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';

export function DrawerList({ onFriendClick }) {
    const user = useSelector(selectUser);
    const [focused, setFocused] = useState(false);
    const [filter, setFilter] = useState('');
    const [actionResponse, setActionResponse] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    return (
        <List>
            <ListSubheader>
                <Grid
                    container
                    gap={1}
                >
                    <Grid
                        item
                        xs
                    >
                        <SearchField
                            sx={{ mt: 0.5 }}
                            size='small'
                            onFocus={() => setFocused(true)}
                            onBlur={(e) =>
                                setTimeout(() => setFocused(false), 150)
                            } // set timeout so that click on search list is not mistaken for click on friends list
                            fullWidth
                            label='Search users'
                            onChange={(event) => setFilter(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        item
                        xs='auto'
                    >
                        <Tooltip
                            title='Refresh friends list'
                            arrow
                        >
                            <IconButton
                                onClick={() => {
                                    setFocused(true);
                                    setTimeout(() => setFocused((f) => !f), 50);
                                }}
                            >
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </ListSubheader>
            {focused ? (
                <AllUsersListItems
                    filter={filter}
                    user={user}
                    onFriendClick={onFriendClick}
                    onShowUserInfo={setUserInfo}
                    onActionResponse={setActionResponse}
                />
            ) : (
                <FriendsListItems
                    user={user}
                    onFriendClick={onFriendClick}
                />
            )}
            <ResponseSnackbar
                response={actionResponse}
                onClose={() => setActionResponse(null)}
            />
            <Dialog
                open={userInfo != null}
                onClose={() => setUserInfo(null)}
            >
                {userInfo && (
                    <UserCard
                        user={userInfo}
                        onActionResponse={setActionResponse}
                    />
                )}
            </Dialog>
        </List>
    );
}
