import axios from 'axios';
import { apiUrl } from './../config/config';

export const checkWordValidity = (guess) => {
    return axios.get(`${apiUrl}/validity/${guess}`, {
            headers: {
                'custom-header-to-force-preflight': 'lol'
            }
        })
        .then(res => {
            return res.data.valid;
        });
}

export const checkWord = (guess) => {
    return axios.get(`${apiUrl}/guess/${guess}`, {
        headers: {
            'custom-header-to-force-preflight': 'lol'
        }
    })
    .then(res => {
        return res.data;
    });
}
