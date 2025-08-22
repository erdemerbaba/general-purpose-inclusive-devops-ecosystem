import api from './api';

const USER_API_BASE_URL = "http://localhost:8030/api/v1/products";

const checkAuthAndRedirect = async () => {
    try {
        const response = await api.get('/auth/check');
        console.log('Auth check successful:', response.data);
    } catch (error) {
        console.log('Auth check failed:', error.response ? error.response.data : error.message);
        localStorage.removeItem('product');
        window.location.href = '/login'; 
        
    }
}

class ProductService {
    async getProductsByName(searchQuery = '') {
        await checkAuthAndRedirect();
        let url = USER_API_BASE_URL;
        if (searchQuery) {
            url += `?name=${encodeURIComponent(searchQuery)}`;
        }
        return api.get(url);
    }

    async getAllProducts() {
        await checkAuthAndRedirect();
        return api.get(USER_API_BASE_URL);
    }

    async createProduct(product) {
        await checkAuthAndRedirect();
        return api.post(USER_API_BASE_URL, product);
    }

    async getProductById(productId) {
        await checkAuthAndRedirect();
        return api.get(`${USER_API_BASE_URL}/${productId}`);
    }

    async updateProduct(product, productId) {
        await checkAuthAndRedirect();
        return api.put(`${USER_API_BASE_URL}/${productId}`, product);
    }

    async deleteProduct(productId) {
        await checkAuthAndRedirect();
        return api.delete(`${USER_API_BASE_URL}/${productId}`);
    }
}

export default new ProductService();
