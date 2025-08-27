import React, { useEffect, useState } from 'react';
import './DashboardComponent.css';
import AssetService from '../services/AssetService';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';

const DashboardComponent = () => {
    const [assets, setAssets] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        AssetService.getAllAssets().then((res) => setAssets(res.data.slice(-10)));
        ProductService.getAllProducts().then((res) => setProducts(res.data.slice(-10)));
        UserService.getAllUsers().then((res) => setUsers(res.data.slice(-10)));
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="about-text">
                User management and product overview.
            </p>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Users</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-card">
                    <h2>Products</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-card">
                    <h2>Assets</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id}>
                                    <td>{asset.id}</td>
                                    <td>{asset.name}</td>
                                    <td>{asset.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
