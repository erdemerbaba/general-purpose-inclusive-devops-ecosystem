import api from './api';

const ASSET_API_BASE_URL = "http://localhost:8030/api/v1/products";

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
        let url = ASSET_API_BASE_URL;
        if (searchQuery) {
            url += `?name=${encodeURIComponent(searchQuery)}`;
        }
        return api.get(url);
    }

    async getAllProducts(params = {}) {
        await checkAuthAndRedirect();
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${ASSET_API_BASE_URL}?${queryString}` : ASSET_API_BASE_URL;
        return api.get(url);
    }

    async createProduct(product) {
        await checkAuthAndRedirect();
        return api.post(ASSET_API_BASE_URL, product);
    }

    async getProductById(productId) {
        await checkAuthAndRedirect();
        return api.get(`${ASSET_API_BASE_URL}/${productId}`);
    }

    async updateProduct(product, productId) {
        await checkAuthAndRedirect();
        return api.put(`${ASSET_API_BASE_URL}/${productId}`, product);
    }

    async deleteProduct(productId) {
        await checkAuthAndRedirect();
        return api.delete(`${ASSET_API_BASE_URL}/${productId}`);
    }
}

export default new ProductService();
