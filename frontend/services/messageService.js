import HttpClient from '../utils/httpClient.js';
import config from '../config.js';

class MessageService {
    constructor() {
        this.httpClient = new HttpClient(config.apiBaseUrl);
    }

    async sendMessage(token, receiver, message) {
        return this.httpClient.request('/send_message', 'POST', { receiver, message }, token);
    }

    async getMessages(token, user2) {
        return this.httpClient.request('/get_messages', 'POST', { user2 }, token);
    }
}

export default MessageService;
