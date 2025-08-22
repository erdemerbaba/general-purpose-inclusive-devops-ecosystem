import React, { useState } from 'react';
import authService from '../services/auth.service';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(username, password);
            alert('Registration successful! Logging in...');
            const loginResponse = await authService.login(username, password);
            if (loginResponse) {
                window.location.href = '/'; 
            }
        } catch (error) {
            console.error('Failed to register:', error);
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
            <button className="btn btn-primary" type="submit" style={buttonStyle}>Register</button>
            <div>
                <a href="/login">Login</a>
            </div>
        </form>
    );
};

export default RegisterComponent;
