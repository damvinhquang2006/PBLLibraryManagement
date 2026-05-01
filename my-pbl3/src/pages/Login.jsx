import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
    const [role, setRole] = useState('SV');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Giả lập đăng nhập thành công
        if (role === 'SV') {
            navigate('/dashboard-sv');
        } else if (role === 'GV') {
            navigate('/dashboard-gv');
        } else if (role === 'AD') {
            navigate('/dashboard-admin');
        } else {
            navigate('/');
        }
    };

    const getPlaceholder = () => {
        if (role === 'SV') return '102240400';
        if (role === 'GV') return 'Mã giảng viên';
        return 'Tài khoản Admin';
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <div className="logo-box"><i className="bi bi-lock"></i></div>
                <h2 className="title-dangnhap text-center">Đăng nhập</h2>
                <h6 className="text-secondary text-center mb-4">Hệ thống PBL</h6>

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

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputMaUser" className="form-label text-secondary">Tài khoản</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                id="inputMaUser"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={getPlaceholder()}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="inputPassword" className="form-label text-secondary">Mật khẩu</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="........"
                                required
                            />
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-dangnhap btn-lg">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
