import { Drawer } from '@mui/material';
import { FriendsList } from './FriendsList';

export function ChatsDrawer({ children, width, onFriendClick }) {
    return (
        <Drawer
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box'
                }
            }}
            variant='permanent'
            anchor='left'
        >
            {children}
            <FriendsList onFriendClick={onFriendClick} />
        </Drawer>
    );
}
