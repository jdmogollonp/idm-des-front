import axios from 'axios';
import { API_SERVER_USERS } from '../config/constant';

class Request {
    getRequestInstance(externalUrl, token) {
        var headers = {
            'Content-Type': 'application/json'
        };
        //if (token != null && externalUrl == null) {
        //    headers.Authorization = `Bearer ${token}`;
        //}

        return axios.create({
            baseURL: externalUrl == null ? API_SERVER_USERS : externalUrl,
            timeout: 10000000
            //headers: headers
        });
    }
}

export default Request;
export { Request };
