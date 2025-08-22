import React from 'react';
import './DashboardComponent.css';

const DashboardComponent = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Users</h2>
                    <p>Manage users and their roles.</p>
                    <a href="/users" className="btn btn-primary">Go to Users</a>
                </div>
                <div className="dashboard-card">
                    <h2>Products</h2>
                    <p>View and manage products.</p>
                    <a href="/product" className="btn btn-primary">Go to Products</a>
                </div>
                <div className="dashboard-card">
                    <h2>Settings</h2>
                    <p>Configure application settings.</p>
                    <a href="/settings" className="btn btn-primary">Go to Settings</a>
                </div>
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>View and edit your profile.</p>
                    <a href="/profile" className="btn btn-primary">Go to Profile</a>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
