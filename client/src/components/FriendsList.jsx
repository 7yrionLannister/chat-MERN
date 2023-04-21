import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';

export function FriendsList({ friends }) {
    return (
        <List>
            {friends.map((friend) => (
                <>
                    <ListItem
                        key={friend._id}
                        alignItems='flex-start'
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={friend.username}
                                src={friend.photoURL}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={friend.username}
                            secondary='Last message sent'
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    );
}
