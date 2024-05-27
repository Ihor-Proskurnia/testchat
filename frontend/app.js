import AuthComponent from './components/authComponent.js';
import ChatComponent from './components/chatComponent.js';
import Storage from './utils/storage.js';

document.addEventListener("DOMContentLoaded", () => {
    const token = Storage.getItem('token');
    console.log('Token:', token);

    if (token) {
        showChatSection();
        new ChatComponent();
    } else {
        new AuthComponent(() => {
            showChatSection();
            new ChatComponent();
        });
    }
});

function showChatSection() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
}
