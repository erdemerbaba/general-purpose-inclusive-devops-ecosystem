import React from 'react';
import './AboutComponent.css';

const AboutComponent = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-text">
                ERA Technology is an initiative that provides innovative engineering services for the benefit of people in the fields of product development and software Services.
            </p>
            <div className="about-section" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1,  textAlign: 'center', marginRight: '10px' }}>
                    <h2 style={{ color: '#007bff' }}>Mission</h2>
                    <p>
                        Our mission is to leverage technology to create innovative solutions that improve the quality of life for individuals and communities.
                    </p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', marginLeft: '10px' }}>
                    <h2 style={{ color: '#007bff' }}>Vision</h2>
                    <p>
                        Our vision is to be a global leader in technology-driven solutions, empowering individuals and organizations to achieve their goals.
                    </p>
                </div>
            </div>
            <div className="about-section" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#007bff', textAlign: 'center', marginBottom: '20px' }}>Why and How to Use This Application</h2>
                <div style={{ lineHeight: '1.6', fontSize: '16px', color: '#333' }}>
                    <p>
                        <strong>General Purpose Inclusive DevOps Ecosystem</strong><br />
                        Inclusive DevOps Ecosystem is a general-purpose environment for maintaining both full-stack and DevOps projects. This ecosystem offers a configurable management web application that provides a DevOps environment, which can be calibrated and used for other projects such as maintaining, monitoring, and infrastructure practices of this web application.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <strong>General Sections of Ecosystem</strong>
                            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                                <li>Continuous Development</li>
                                <li>Continuous Integration</li>
                                <li>Continuous Testing</li>
                                <li>Continuous Deployment</li>
                                <li>Continuous Delivery</li>
                                <li>Continuous Monitoring</li>
                                <li>Continuous Feedback</li>
                                <li>Continuous Operations</li>
                            </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                            <strong>Sector Summary of Ecosystem</strong>
                            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                                <li>Frontend</li>
                                <li>Backend</li>
                                <li>Dataservice</li>
                                <li>Gateway</li>
                                <li>Docker</li>
                                <li>Kubernetes</li>
                                <li>Pipeline</li>
                                <li>Infrastructure</li>
                                <li>Monitoring</li>
                                <li>Logging</li>
                                <li>Network</li>
                                <li>Security</li>
                                <li>Traffic Management</li>
                                <li>Scalability</li>
                                <li>Upgradeability</li>
                                <li>Migration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <h2 style={{ textAlign: 'center',color: '#007bff' }}>Technology Stacks</h2>
                <div style={{ lineHeight: '1.6', fontSize: '16px', color: '#333' }}>
                    <p>
                        <strong>Backend</strong><br />
                        - <strong>Framework</strong>: Spring Boot 2.7.0<br />
                        - <strong>Language</strong>: Java 17<br />
                        - <strong>Security</strong>: Spring Security + JWT<br />
                        - <strong>Validation</strong>: Bean Validation (JSR-303)<br />
                        - <strong>Logging</strong>: SLF4J + Logback<br />
                        - <strong>Monitoring</strong>: Spring Boot Actuator + Prometheus
                    </p>
                    <p>
                        <strong>Frontend</strong><br />
                        - <strong>Framework</strong>: React 17<br />
                        - <strong>Language</strong>: JavaScript/JSX<br />
                        - <strong>Styling</strong>: Bootstrap 4.5<br />
                        - <strong>HTTP Client</strong>: Axios<br />
                        - <strong>Routing</strong>: React Router DOM<br />
                        - <strong>State Management</strong>: Context API
                    </p>
                    <p>
                        <strong>Dataservice</strong><br />
                        - <strong>Framework</strong>: MongoDB
                    </p>
                    <p>
                        <strong>Container Tools</strong><br />
                        - <strong>Containerization</strong>: Docker-ready<br />
                        - <strong>Monitoring</strong>: Health checks, metrics<br />
                        - <strong>Configuration</strong>: Environment-based configuration<br />
                        - <strong>Logging</strong>: Structured logging with rotation
                    </p>
                    <p>
                        <strong>Automation Tools</strong><br />
                        - <strong>Continuous Delivery</strong>: Jenkins
                    </p>
                    <p>
                        <strong>Kubernetes Tools</strong><br />
                        - <strong>Infrastructure</strong>: Terraform<br />
                        - <strong>Configuration</strong>: Ansible<br />
                        - <strong>Environment</strong>: Istio<br />
                        - <strong>Maintenance</strong>: Rancher
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;
