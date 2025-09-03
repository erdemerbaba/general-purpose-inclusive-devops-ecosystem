import React from 'react';
import './InformationComponent.css';

const InformationComponent = () => {
    return (
        <div className="information-container">
            <h1 className="information-title">Information Page</h1>
            <p className="information-text">
                If you have any questions, reach out to our support team.
            </p>

            <div className="information-section">
                <h2>Version</h2>
                <p>Current Version: 1.0.0</p>
            </div>
            <div className="information-section">
                <h2>Contact Us</h2>
                <p>Email: info@eratechnology.org</p>
            </div>
        </div>
    );
};

export default InformationComponent;
