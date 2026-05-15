/**
 * AuthContext.jsx
 * React Context toàn cục lưu trữ thông tin người dùng sau khi đăng nhập.
 *
 * Sử dụng:
 *   const { user, login, logout } = useAuth();
 */

import React, { createContext, useContext, useState, useCallback } from 'react';


// ─── Tạo context ──────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
    // Khởi tạo từ sessionStorage để không mất khi F5
    const [user, setUser] = useState(() => {
        try {
            const stored = sessionStorage.getItem('pbl_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    /**
     * Lưu thông tin user sau khi login thành công.
     * @param {{ username, avatar, phoneNumber, email, age, gender, role }} userData
     */
    const login = useCallback((userData) => {
        setUser(userData);
        sessionStorage.setItem('pbl_user', JSON.stringify(userData));
    }, []);

    /**
     * Cập nhật một phần thông tin user (merge vào dữ liệu hiện tại).
     * Dùng sau khi fetch profile thật từ API.
     * @param {object} partialData
     */
    const updateUser = useCallback((partialData) => {
        setUser(prev => {
            const merged = { ...prev, ...partialData };
            sessionStorage.setItem('pbl_user', JSON.stringify(merged));
            return merged;
        });
    }, []);

    /** Xoá thông tin user khi đăng xuất. */
    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('pbl_user');
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Custom hook tiện dụng ────────────────────────────────────────────────────
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
    return ctx;
}
