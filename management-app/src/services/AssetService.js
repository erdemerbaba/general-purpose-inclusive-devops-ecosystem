import api from './api';

const ASSET_API_BASE_URL = "http://localhost:8020/api/v1/assets";

const checkAuthAndRedirect = async () => {
    try {
        const response = await api.get('/auth/check');
        console.log('Auth check successful:', response.data);
    } catch (error) {
        console.log('Auth check failed:', error.response ? error.response.data : error.message);
        localStorage.removeItem('asset');
        window.location.href = '/login'; 
    }
}

class AssetService {
    async getAssetsByName(searchQuery = '') {
        await checkAuthAndRedirect();
        let url = ASSET_API_BASE_URL;
        if (searchQuery) {
            url += `?name=${encodeURIComponent(searchQuery)}`;
        }
        return api.get(url);
    }

    async getAllAssets() {
        await checkAuthAndRedirect();
        return api.get(ASSET_API_BASE_URL);
    }

    async createAsset(asset) {
        await checkAuthAndRedirect();
        return api.post(ASSET_API_BASE_URL, asset);
    }

    async getAssetById(assetId) {
        await checkAuthAndRedirect();
        return api.get(`${ASSET_API_BASE_URL}/${assetId}`);
    }

    async updateAsset(asset, assetId) {
        await checkAuthAndRedirect();
        return api.put(`${ASSET_API_BASE_URL}/${assetId}`, asset);
    }

    async deleteAsset(assetId) {
        await checkAuthAndRedirect();
        return api.delete(`${ASSET_API_BASE_URL}/${assetId}`);
    }
}

export default new AssetService();
