import { postRequest } from '../lib/axios';

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
