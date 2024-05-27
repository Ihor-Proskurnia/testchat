import HttpClient from '../utils/httpClient.js';
import config from '../config.js';

class AuthService {
    constructor() {
        this.httpClient = new HttpClient(config.apiBaseUrl);
    }

    async login(email, password) {
        return this.httpClient.request('/login', 'POST', { email, password });
    }

    async register(email, password) {
        return this.httpClient.request('/register', 'POST', { email, password });
    }
}

export default AuthService;
