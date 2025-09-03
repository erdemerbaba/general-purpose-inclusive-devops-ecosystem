import React, { useEffect, useState } from 'react';
import './DashboardComponent.css';
import AssetService from '../../../services/AssetService';
import ProductService from '../../../services/ProductService';
import UserService from '../../../services/UserService';

const DashboardComponent = () => {
    const [assets, setAssets] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        AssetService.getAllAssets()
            .then((res) => {
                if (res.data && Array.isArray(res.data.content)) {
                    setAssets(res.data.content.slice(-10));
                } else {
                    console.error('Unexpected response format for assets:', res.data);
                    setAssets([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching assets:', error);
                setAssets([]);
            });

        ProductService.getAllProducts()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data.slice(-10));
                } else {
                    console.error('Unexpected response format for products:', res.data);
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setProducts([]);
            });

        UserService.getAllUsers()
            .then((res) => {
                if (res.data && Array.isArray(res.data.content)) {
                    setUsers(res.data.content.slice(-10));
                } else {
                    console.error('Unexpected response format for users:', res.data);
                    setUsers([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setUsers([]);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="about-text">
                Product, user and asset management overview.
            </p>
            <div className="dashboard-grid">
                                <div className="dashboard-card">
                    <h2>Products</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-card">
                    <h2>Users</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
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
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id}>
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
