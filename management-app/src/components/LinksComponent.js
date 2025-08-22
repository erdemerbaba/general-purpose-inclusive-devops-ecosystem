import React from 'react';
import './LinksComponent.css';

const LinksComponent = () => {
    return (
        <div className="links-container">
            <h1 className="links-title">Useful Links</h1>
            <ul className="links-list">
                <li><a href="https://www.localhost.com" target="_blank" rel="noopener noreferrer">Example Website</a></li>
            </ul>
        </div>
    );
};

export default LinksComponent;
