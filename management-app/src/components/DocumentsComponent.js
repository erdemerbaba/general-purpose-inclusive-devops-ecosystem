import React from 'react';
import './DocumentsComponent.css';

const DocumentsComponent = () => {
    return (
        <div className="documents-container">
            <h1 className="documents-title">Documents</h1>
            <p className="documents-text">
                You can reach documents below.
            </p>
            <ul className="documents-list">
            <div className="documents-section">
                <li><a href="" target="_blank">User Guide</a></li>
            </div>
            <div className="documents-section">
                <li><a href="" target="_blank">API Documentation</a></li>
            </div>
            <div className="documents-section">
                <li><a href="" target="_blank">Technical Specifications</a></li>
            </div>

            </ul>
        </div>
    );
};

export default DocumentsComponent;
