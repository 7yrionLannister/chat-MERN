import axios from 'axios';
import constants from '../data/constants.json';

export const postRequest = (path, body) => {
    return axios.post(constants.path + path, body);
};
