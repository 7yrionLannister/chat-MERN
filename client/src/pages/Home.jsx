import { useState } from 'react';
import { ChatsDrawer } from '../components/drawer/ChatsDrawer';
import { ChatView } from './ChatView';

const drawerWidth = 400;

export const Home = () => {
    const [currentFriend, setCurrentFriend] = useState(null);

    return (
        <>
            {currentFriend && (
                <ChatView
                    drawerWidth={drawerWidth}
                    receiver={currentFriend}
                    p={2}
                />
            )}
            <ChatsDrawer
                width={drawerWidth}
                onFriendClick={(friend) => setCurrentFriend(friend)}
            />
        </>
    );
};
