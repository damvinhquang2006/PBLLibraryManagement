import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const ROLE_ROUTES = {
    SV: '/dashboard-sv',
    GV: '/dashboard-gv',
    AD: '/dashboard-admin',
};

const Login = () => {
    const [role, setRole] = useState('SV');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    // ── Chọn vai trò ──────────────────────────────────────────────────────────
    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setError('');
    };

    // ── Placeholder email theo vai trò ────────────────────────────────────────
    const getEmailPlaceholder = () => {
        if (role === 'SV') return 'sinhvien@gmail.com';
        if (role === 'GV') return 'giangvien@gmail.com';
        return 'admin@gmail.com';
    };

    // ── Submit form ───────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Gọi authService: truyền email, password, role
            // Nhận về: { username, avatar, phoneNumber, email, age, gender, role }
            const userData = await loginUser(email, password, role);

            // Lưu vào AuthContext (và sessionStorage)
            login(userData);

            // Điều hướng đến dashboard tương ứng
            navigate(ROLE_ROUTES[userData.role] ?? '/');
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
                <h6 className="text-secondary text-center mb-4">Hệ thống PBL</h6>

                {/* ── Chọn vai trò ── */}
                <label className="form-label text-secondary">Vai trò</label>
                <div className="d-flex gap-3 mb-4">
                    <div className={`role-option ${role === 'SV' ? 'active' : ''}`} onClick={() => handleRoleSelect('SV')}>
                        <i className="bi bi-mortarboard role-icon"></i>
                        <div>Sinh viên</div>
                    </div>
                    <div className={`role-option ${role === 'GV' ? 'active' : ''}`} onClick={() => handleRoleSelect('GV')}>
                        <i className="bi bi-people role-icon"></i>
                        <div>Giảng viên</div>
                    </div>
                    <div className={`role-option ${role === 'AD' ? 'active' : ''}`} onClick={() => handleRoleSelect('AD')}>
                        <i className="bi bi-person-gear role-icon"></i>
                        <div>Admin</div>
                    </div>
                </div>

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
                                placeholder={getEmailPlaceholder()}
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
                                ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Đang đăng nhập...</>
                                : 'Đăng nhập'
                            }
                        </button>
                    </div>

                    {/* Gợi ý tài khoản demo */}
                    <p className="text-center text-secondary mt-3" style={{ fontSize: '0.8rem' }}>
                        Demo — SV: <code>sinhvien@gmail.com</code> / <code>123456</code>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
