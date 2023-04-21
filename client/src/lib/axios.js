import axios from 'axios';
import constants from '../data/constants.json';

export const postRequest = (path, body, token) =>
    axios.post(constants.path + path, body, {
        headers: { 'x-access-token': token }
    });

export const getRequest = (path, token) =>
    axios.get(constants.path + path, { headers: { 'x-access-token': token } });

export const putRequest = (path, body, token) =>
    axios.put(constants.path + path, body, {
        headers: { 'x-access-token': token }
    });
