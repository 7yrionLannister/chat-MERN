import { loginRequest } from '../lib/axios';

export const loginApi = async (username, password) => {
    let response = null;
    await loginRequest('/users/login', { username, password })
        .then((data) => (response = data))
        .catch((err) => {
            if (err.name === 'AbortError') console.log('Request cancelled');
            else response = err.response;
        });
    return response;
};
