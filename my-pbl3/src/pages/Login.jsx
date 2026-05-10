import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

// Ánh xạ vai trò từ Backend sang Route của Frontend
const ROLE_CONFIG = {
    'STUDENT': { role: 'SV', route: '/dashboard-sv', label: 'Sinh viên' },
    'LECTURER': { role: 'GV', route: '/dashboard-gv', label: 'Giảng viên' },
    'ADMIN': { role: 'AD', route: '/dashboard-admin', label: 'Admin' },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    // ── Submit form ───────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Gọi API: chỉ truyền email và password theo thiết kế mới
            const backendResponse = await loginUser(email, password);

            // 2. Phân tích Role từ Backend (ví dụ: 'LECTURER', 'ADMIN', 'STUDENT')
            const config = ROLE_CONFIG[backendResponse.role];

            if (!config) {
                throw new Error('Vai trò người dùng không hợp lệ từ hệ thống.');
            }

            // 3. Chuẩn bị dữ liệu cho AuthContext (kèm các trường mockup để giao diện không bị trống)
            const userData = {
                id: backendResponse.Id,
                email: backendResponse.email,
                role: config.role, // Chuyển sang 'SV', 'GV', hoặc 'AD'
                username: backendResponse.email.split('@')[0], // Tạm lấy email làm tên
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendResponse.Id}`,
                message: backendResponse.message
            };

            // 4. Lưu vào AuthContext
            login(userData);

            // 5. Điều hướng
            navigate(config.route);
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <div className="logo-box"><i className="bi bi-lock"></i></div>
                <h2 className="title-dangnhap text-center">Đăng nhập</h2>
                <h6 className="text-secondary text-center mb-4">Hệ thống PBL - Kết nối API</h6>

                {/* ── Form đăng nhập ── */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label text-secondary">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin6@pbl.com"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="inputPassword" className="form-label text-secondary">Mật khẩu</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="alert alert-danger py-2 mb-3" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>{error}
                        </div>
                    )}

                    {/* Nút đăng nhập */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-dangnhap btn-lg"
                            disabled={loading}
                        >
                            {loading
                                ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Đang xác thực...</>
                                : 'Đăng nhập hệ thống'
                            }
                        </button>
                    </div>

                    <div className="mt-4 p-3 bg-light rounded" style={{ fontSize: '0.85rem' }}>
                        <strong>Ghi chú API:</strong><br/>
                        - Request: <code>{"{ email, password }"}</code><br/>
                        - Role hỗ trợ: <code>ADMIN, LECTURER, STUDENT</code>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
