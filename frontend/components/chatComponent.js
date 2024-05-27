import UserService from '../services/userService.js';
import MessageService from '../services/messageService.js';
import Storage from '../utils/storage.js';
import MessageComponent from './messageComponent.js';

class ChatComponent {
    constructor() {
        this.userService = new UserService();
        this.messageService = new MessageService();
        this.token = Storage.getItem('token');
        this.currentUser = Storage.getItem('currentUser');
        this.selectedUser = null;
        this.messageComponent = new MessageComponent();
        this.init();
    }

    async init() {
        document.getElementById('send-message-form').addEventListener('submit', this.sendMessage.bind(this));
        await this.loadUsers();
        this.startPollingMessages();
    }

    async loadUsers() {
        const response = await this.userService.getUsers(this.token);

        if (response) {
            const users = response.filter(user => user !== this.currentUser);
            const userList = document.getElementById('user-list');
            userList.innerHTML = users.map(user => `<option value="${user}">${user}</option>`).join('');
            if (users.length > 0) {
                this.selectedUser = users[0];
                this.messageComponent.loadMessages(this.selectedUser);
            }

            userList.addEventListener('change', this.handleUserChange.bind(this));
        } else {
            console.error('Failed to load users');
        }
    }

    handleUserChange(event) {
        this.selectedUser = event.target.value;
        this.messageComponent.loadMessages(this.selectedUser);
    }

    async sendMessage(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        await this.messageService.sendMessage(this.token, this.selectedUser, message);
        document.getElementById('message').value = '';
        this.messageComponent.loadMessages(this.selectedUser);
    }

    startPollingMessages() {
        setInterval(() => {
            if (this.selectedUser) {
                this.messageComponent.loadMessages(this.selectedUser);
            }
        }, 5000);
    }
}

export default ChatComponent;
