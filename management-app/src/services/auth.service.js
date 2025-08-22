import api from './api';

const register = (username, password) => {
    return api.post('auth/register', {
        username,
        password
    });
};

const login = (username, password) => {
    return api.post('auth/login', {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    register,
    login,
    logout
};
