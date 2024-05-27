import AuthService from '../services/authService.js';
import Storage from '../utils/storage.js';

class AuthComponent {
    constructor(onAuthSuccess) {
        this.authService = new AuthService();
        this.onAuthSuccess = onAuthSuccess;
        this.init();
    }

    init() {
        document.getElementById('auth-form').addEventListener('submit', this.handleAuth.bind(this));
    }

    async handleAuth(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await this.authService.login(email, password);

            if (response.access_token) {
                Storage.setItem('token', response.access_token);
                this.onAuthSuccess();
            } else {
                this.showError(response.msg || 'Auth failed');
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    showError(message) {
        document.getElementById('auth-error').textContent = message;
    }
}

export default AuthComponent;
