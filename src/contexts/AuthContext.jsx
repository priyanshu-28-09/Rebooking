// Auth Context - Global authentication state management
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as loginService, logout as logoutService, register as registerService } from '../services/authService';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initialize = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };
        initialize();
    }, []);
    const login = async (email, password) => {
        const response = await loginService(email, password);
        if (response.success && response.user && response.token) {
            localStorage.setItem('authToken', response.token);
            setUser(response.user);
        }
        return {
            success: response.success,
            message: response.message,
        };
    };
    const register = async (userData) => {
        const response = await registerService(userData);
        if (response.success && response.user && response.token) {
            localStorage.setItem('authToken', response.token);
            setUser(response.user);
        }
        return {
            success: response.success,
            message: response.message,
        };
    };
    const logout = () => {
        logoutService();
        setUser(null);
    };
    const refreshUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };
    return (<AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
