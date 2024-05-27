class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, method = 'GET', body = null, token = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        return response.json();
    }
}

export default HttpClient;
