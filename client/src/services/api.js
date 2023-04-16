import { loginRequest } from '../lib/axios';

export const loginApi = async (username, password) => {
    let response = null;
    await loginRequest('/users/login', { username, password })
        .then((data) => {
            response = data;
            const user = data.data;
            localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((err) => {
            if (err.name === 'AbortError') console.log('Request cancelled');
            else response = err.response;
        })
        .finally(() => console.log('Loading...'));
    return response;
};
