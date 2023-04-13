import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const fetchQuestions = async () => {
        const res = await axios.get('/api/questions');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className='flex flex-col flex-1 p-2 md:flex-[0.6]'>
            {posts.map((post, index) => (
                <>
                    <Post post={post} />
                </>
            ))}
        </div>
    );
};

export default Feed;
