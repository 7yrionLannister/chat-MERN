import { getRequest, postRequest } from '../lib/axios';

export const loginApi = async (username, password) => {
    let response = null;
    await postRequest('/users/login', { username, password })
        .then((data) => (response = data))
        .catch((err) => (response = err.response));
    return response;
};

export const signupApi = async (username, password, photoURL, bio) => {
    let response = null;
    await postRequest('/users', { username, password, photoURL, bio })
        .then((data) => (response = data))
        .catch((err) => (response = err.response));
    return response;
};

export const getUsers = async (token, user_id, username) => {
    let response = null;
    let query = '?';
    if (user_id) query += 'user_id=' + user_id;
    else if (username) query += 'username=' + username;
    await getRequest('/users' + query, token)
        .then((data) => (response = data))
        .catch((err) => (response = err.response));
    return response;
};

export const sendFriendRequest = async (token, username) => {
    let response = null;
    await postRequest('/requests/send', { username }, token)
        .then((data) => (response = data))
        .catch((err) => (response = err.response));
    return response;
};

export const getMessages = async (token, receiver) => {
    let response = null;
    await getRequest('/messages/' + receiver, token)
        .then((data) => (response = data))
        .catch((err) => (response = err.response));
    return response;
};
