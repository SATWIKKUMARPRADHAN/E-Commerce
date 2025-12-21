import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Check localStorage on app start to keep user logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid user data in storage");
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // Call this function from Login.jsx after axios success
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Call this from Navbar logout button
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        // Optional: Redirect to home or login page here if needed
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);