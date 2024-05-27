class Storage {
    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        localStorage.setItem(key, value);
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }
}

export default Storage;
