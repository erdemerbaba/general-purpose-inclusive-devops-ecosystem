import React from 'react';
import './InformationComponent.css';

const InformationComponent = () => {
    return (
        <div className="information-container">
            <h1 className="information-title">Information Page</h1>
            <p className="information-text">
                Welcome to the Information Page! Here you can find details about our application,
                its features, and how to use it effectively. If you have any questions, feel free
                to reach out to our support team.
            </p>

            <div className="information-section">
                <h2>Version</h2>
                <p>Current Version: 1.0.0</p>
            </div>
            <div className="information-section">
                <h2>Contact Us</h2>
                <p>Email: info@eratechnology.org</p>
                <p>Phone: +90 000 000 00 00</p>
            </div>
        </div>
    );
};

export default InformationComponent;
