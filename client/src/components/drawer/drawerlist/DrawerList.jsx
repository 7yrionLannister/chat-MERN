import { IconButton, List, ListSubheader, Snackbar } from '@mui/material';
import { useState } from 'react';
import { SearchField } from '../../generic/SearchField';
import { AllUsersListItems } from './AllUsersListItems';
import { FriendsListItems } from './FriendsListItems';
import { Close } from '@mui/icons-material';

export function DrawerList({ user, onFriendClick }) {
    const [focused, setFocused] = useState(false);
    const [filter, setFilter] = useState('');
    const [actionResponse, setActionResponse] = useState(null);

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
                    onActionResponse={setActionResponse}
                />
            ) : (
                <FriendsListItems
                    user={user}
                    onFriendClick={onFriendClick}
                />
            )}
            <Snackbar
                open={actionResponse}
                onClose={() => setActionResponse(null)}
                autoHideDuration={5000}
                message={actionResponse}
                action={
                    <IconButton onClick={() => setActionResponse(null)}>
                        <Close />
                    </IconButton>
                }
            />
        </List>
    );
}
