import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate.push('/dashboard'); 
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        width: '200px'
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <div>
            <th></th>
                <label>Username</label>
                <th></th>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Password</label>
                <th></th>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <button className="btn btn-primary" type="submit" style={buttonStyle}>Login</button>
            <div>
                <a href="/register">Register</a>
            </div>
        </form>
    );
};

export default LoginComponent;
