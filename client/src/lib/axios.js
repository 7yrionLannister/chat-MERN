import axios from 'axios';
import constants from '../data/constants.json';

export const loginRequest = (path, body) => {
    const controller = new AbortController();
    return axios.post(constants.path + path, body, {
        signal: controller.signal
    });
};
