import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userSlice';
import { useEffect, useState } from 'react';
import { ChatsDrawer } from '../components/ChatsDrawer';
import { getUsers } from '../services/api';
import { ChatView } from '../components/ChatView';

const drawerWidth = 240;

export const Home = () => {
    const user = useSelector(selectUser);
    const [friends, setFriends] = useState([]);
    const [currentFriend, setCurrentFriend] = useState({});

    useEffect(() => {
        user?.friends.forEach((friend) =>
            getUsers(user.token, { user_id: friend }).then((res) =>
                setFriends((frs) => [...frs, res.data])
            )
        );
    }, [user]);

    useEffect(() => {
        setCurrentFriend(friends[0]);
    }, [friends]);

    return (
        <>
            {currentFriend && (
                <ChatView
                    drawerWidth={drawerWidth}
                    sender={user}
                    receiver={currentFriend}
                />
            )}
            {/* TODO fetch users */}
            <ChatsDrawer
                user={user}
                width={drawerWidth}
                friends={friends}
            />
        </>
    );
};
