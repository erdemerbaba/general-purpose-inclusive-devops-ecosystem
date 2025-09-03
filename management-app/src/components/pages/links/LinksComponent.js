import React from 'react';
import './LinksComponent.css';

const LinksComponent = () => {
    return (
        <div className="links-container">
            <h1 className="links-title">Useful Links</h1>
            <p className="links-text">
                You can reach our social media channels for more information.
            </p>
            <div className="information-section">
                <h2>Website</h2>
                <li><a href="https://eratechnology.org" target="_blank" rel="noopener noreferrer">https://eratechnology.org</a></li>
            </div>
            <div className="information-section">
                <h2>Linkedin</h2>
                <li><a href="https://www.linkedin.com/company/eratechnologyco" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/company/eratechnologyco</a></li>
            </div>
            <div className="information-section">
                <h2>Google Play Store</h2>
                <li><a href="https://play.google.com/store/apps/dev?id=8500230012647879249" target="_blank" rel="noopener noreferrer">https://play.google.com/store/apps/dev?id=8500230012647879249</a></li>
            </div>
                <div className="information-section">
                <h2>Instagram</h2>
                <li><a href="https://www.instagram.com/eratechnologyco" target="_blank" rel="noopener noreferrer">https://www.instagram.com/eratechnologyco</a></li>
            </div>
            <div className="information-section">
                <h2>X</h2>
                <li><a href="https://x.com/eratechnologyco" target="_blank" rel="noopener noreferrer">https://x.com/eratechnologyco</a></li>
            </div>
        </div>
    );
};

export default LinksComponent;
