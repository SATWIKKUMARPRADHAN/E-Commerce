import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        } else {
            // Default to logged in for dev/demo purposes if desired, or false
            // For this task, let's default to TRUE as per previous Layout.js hardcoding,
            // but fully functional so logout works.
            // Actually, if I default to true without storage, refresh will keep it true but logout won't persist "false" well if I just default to true.
            // Let's mimic the previous hardcoded behavior:
            // "isLoggedIn = true" in Layout.jsx implies the user is always logged in.
            // To support "Logout", we must allow this to toggle.
            // I will set default to TRUE if no flag is set, to maintain current "demo mode" feel,
            // BUT if user explicitly logs out, we should respect that.

            // Better approach:
            // If localStorage 'auth_token' or 'user' exists -> true.
            // If not -> false.
            // BUT, since we don't have a login page working yet to SET this, 
            // if I set it to false, the user will see "Login" and can't go back to "Logged in" state easily.
            // So for now, I will Initialize with a dummy user if nothing is there, to keep the app "open".
            if (!localStorage.getItem('logout_flag')) {
                const demoUser = { name: 'User', email: 'user@example.com', role: 'user' };
                setIsLoggedIn(true);
                setUser(demoUser);
                localStorage.setItem('user', JSON.stringify(demoUser));
            }
        }
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('logout_flag');
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.setItem('logout_flag', 'true'); // Persist logout state so refresh doesn't auto-login
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
