import axios from 'axios';
import { API_URL } from '../extension/AppURL';


const callAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json'
    }
});


export default callAPI;