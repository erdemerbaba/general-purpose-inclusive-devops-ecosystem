import api from './api';

const USER_API_BASE_URL = "http://localhost:8070/api/v1/users";

const checkAuthAndRedirect = async () => {
    try {
        const response = await api.get('/auth/check');
        console.log('Auth check successful:', response.data);
    } catch (error) {
        console.log('Auth check failed:', error.response ? error.response.data : error.message);
        localStorage.removeItem('user');
        window.location.href = '/login'; 
        
    }
}

class UserService {
    async getUsersByName(searchName = '') {
        await checkAuthAndRedirect();
        let url = USER_API_BASE_URL;
        if (searchName) {
            url += `?name=${encodeURIComponent(searchName)}`;
        }
        return api.get(url);
    }

    async getUsersBySurname(searchSurname = '') {
        await checkAuthAndRedirect();
        let url = USER_API_BASE_URL;
        if (searchSurname) {
            url += `?surname=${encodeURIComponent(searchSurname)}`;
        }
        return api.get(url);
    }

    async getAllUsers() {
        await checkAuthAndRedirect();
        return api.get(USER_API_BASE_URL);
    }

    async createUser(user) {
        await checkAuthAndRedirect();
        return api.post(USER_API_BASE_URL, user);
    }

    async getUserById(userId) {
        await checkAuthAndRedirect();
        return api.get(`${USER_API_BASE_URL}/${userId}`);
    }

    async updateUser(user, userId) {
        await checkAuthAndRedirect();
        return api.put(`${USER_API_BASE_URL}/${userId}`, user);
    }

    async deleteUser(userId) {
        await checkAuthAndRedirect();
        return api.delete(`${USER_API_BASE_URL}/${userId}`);
    }
}

export default new UserService();
