import AuthService from '../services/authService.js';
import Storage from '../utils/storage.js';

class AuthComponent {
    constructor(onAuthSuccess) {
        this.authService = new AuthService();
        this.onAuthSuccess = onAuthSuccess;
        this.init();
    }

    init() {
        document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('register-form').addEventListener('submit', this.handleRegister.bind(this));
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await this.authService.login(email, password);

            if (response.access_token) {
                Storage.setItem('token', response.access_token);
                this.onAuthSuccess();
            } else {
                this.showError(response.msg || 'Login failed');
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await this.authService.register(email, password);

            if (response.access_token) {
                Storage.setItem('token', response.access_token);
                this.onAuthSuccess();
            } else {
                this.showError(response.msg || 'Registration failed');
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
