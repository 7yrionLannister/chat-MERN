import { Dialog, List, ListSubheader } from '@mui/material';
import { useState } from 'react';
import { SearchField } from '../../generic/SearchField';
import { AllUsersListItems } from './AllUsersListItems';
import { FriendsListItems } from './FriendsListItems';
import { ResponseSnackbar } from '../../generic/ResponseScackbar';
import { UserCard } from '../../card/UserCard';

export function DrawerList({ user, onFriendClick }) {
    const [focused, setFocused] = useState(false);
    const [filter, setFilter] = useState('');
    const [actionResponse, setActionResponse] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    return (
        <List>
            <ListSubheader>
                <SearchField
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => setTimeout(() => setFocused(false), 150)} // set timeout so that click on search list is not mistaken for click on friends list
                    fullWidth
                    label='Search users'
                    onChange={(event) => setFilter(event.target.value)}
                />
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
