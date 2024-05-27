import HttpClient from '../utils/httpClient.js';
import config from '../config.js';

class UserService {
    constructor() {
        this.httpClient = new HttpClient(config.apiBaseUrl);
    }

    async getUsers(token) {
        return this.httpClient.request('/users', 'GET', null, token);
    }
}

export default UserService;
