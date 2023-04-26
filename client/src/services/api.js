import { getRequest, postRequest, putRequest } from '../lib/axios';

const getResponse = async (req) =>
    await req.catch((err) => {
        throw err.response;
    });

export const loginApi = (username, password) =>
    getResponse(postRequest('/users/login', { username, password }));

export const signup = (username, password, photoURL, bio) =>
    getResponse(postRequest('/users', { username, password, photoURL, bio }));

export const updateProfile = (token, username, password, photoURL, bio) =>
    getResponse(
        putRequest('/users', { username, password, photoURL, bio }, token)
    );

export const unfriend = (token, friend) =>
    getResponse(postRequest('/users/unfriend/' + friend, null, token));

export const getUsers = (token, user_id, username) => {
    let query = '?';
    if (user_id) query += 'user_id=' + user_id;
    else if (username) query += 'username=' + username;
    return getResponse(getRequest('/users' + query, token));
};

export const sendFriendRequest = (token, username) =>
    getResponse(postRequest('/requests/send', { username }, token));

export const respondToFriendRequest = (token, response, user_id) =>
    getResponse(postRequest('/requests/respond', { response, user_id }, token));

export const getMessages = (token, receiver) =>
    getResponse(getRequest('/messages/' + receiver, token));

export const sendMessage = (token, receiver, message) =>
    getResponse(postRequest('/messages/' + receiver, { message }, token));
