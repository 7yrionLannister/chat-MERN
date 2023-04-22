import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userSlice';
import { useState } from 'react';
import { ChatsDrawer } from '../components/ChatsDrawer';
import { ChatView } from './ChatView';

const drawerWidth = 400;

export const Home = () => {
    const user = useSelector(selectUser);
    const [currentFriend, setCurrentFriend] = useState(null);

    return (
        <>
            {currentFriend && (
                <ChatView
                    drawerWidth={drawerWidth}
                    sender={user}
                    receiver={currentFriend}
                />
            )}
            <ChatsDrawer
                user={user}
                width={drawerWidth}
                onFriendClick={(friend) => setCurrentFriend(friend)}
            />
        </>
    );
};
