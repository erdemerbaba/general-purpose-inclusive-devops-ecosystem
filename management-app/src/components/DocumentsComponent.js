import React from 'react';
import './DocumentsComponent.css';

const DocumentsComponent = () => {
    return (
        <div className="documents-container">
            <h1 className="documents-title">Documents</h1>
            <ul className="documents-list">
                <li><a href="/docs/user-guide.pdf" target="_blank">User Guide</a></li>
            </ul>
        </div>
    );
};

export default DocumentsComponent;
