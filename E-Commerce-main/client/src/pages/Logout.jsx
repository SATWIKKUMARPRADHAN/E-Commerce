import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        // Redirect to login or home after styling
        // For now, redirect to home with a slight delay or immediately
        const timer = setTimeout(() => {
            navigate('/');
        }, 1500);
        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div style={{
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <h2>Logging out...</h2>
            <p>Come back soon! 👋</p>
        </div>
    );
};

export default Logout;
