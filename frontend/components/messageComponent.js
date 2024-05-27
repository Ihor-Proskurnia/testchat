import MessageService from '../services/messageService.js';
import Storage from '../utils/storage.js';

class MessageComponent {
    constructor() {
        this.messageService = new MessageService();
        this.token = Storage.getItem('token');
    }

    async loadMessages(user2) {
        const response = await this.messageService.getMessages(this.token, user2);

        if (response) {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = response.map(msg => `
                <div class="message">
                    <strong>${msg.sender}:</strong> ${msg.message}
                </div>
            `).join('');
        } else {
            console.error('Failed to load messages');
        }
    }
}

export default MessageComponent;
