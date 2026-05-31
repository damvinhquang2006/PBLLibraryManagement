import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';
import { useAuth } from '../context/AuthContext';

const DashboardSV = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                    <div 
                        className="user-info clickable" 
                        onClick={() => setShowMenu(!showMenu)}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '15px', 
                            backgroundColor: '#ffffff', 
                            color: '#003366', 
                            padding: '8px 20px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        {user?.avatar
                            ? <img src={user.avatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                            : <i className="fas fa-user-circle" style={{ fontSize: '18px' }}></i>
                        }
                        {user?.email ?? 'Người dùng'}
                        <i className={`fas fa-chevron-${showMenu ? 'up' : 'down'}`} style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    </div>

                    {showMenu && (
                        <div style={{ 
                            position: 'absolute', 
                            top: 'calc(100% + 10px)', 
                            right: 0, 
                            backgroundColor: '#ffffff', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                            width: '220px',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}>
                            {/* Thông tin user */}
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#003366', fontSize: '14px' }}>{user?.username ?? '—'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>{user?.email ?? '—'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#888' }}>
                                    {user?.age ? `${user.age} tuổi` : ''}{user?.gender ? ` · ${user.gender}` : ''}
                                </p>
                            </div>

                            <div 
                                className="menu-item" 
                                onClick={() => { setShowMenu(false); navigate('/profile'); }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s', color: '#003366' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-user-circle"></i> Kiểm tra tài khoản
                            </div>
                            <div 
                                className="menu-item" 
                                onClick={handleLogout}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#dc3545', borderTop: '1px solid #eee', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-sign-out-alt"></i> Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', marginBottom: '10px', fontWeight: 'bold' }}>Dashboard Sinh viên</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Chào mừng bạn đến với Hệ thống quản lý học tập PBL</p>
                </div>

                {/* Grid 3 thẻ Card song song đồng bộ */}
                <div className="card-grid" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    
                    {/* Thẻ 1: Lớp PBL của tôi */}
                    <div className="card clickable" onClick={() => navigate(`/sv-truy-cap-lop?userID=${user?.email}&role=SV`)} style={{ flex: '0 1 320px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-graduation-cap" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px', color: '#003366', fontWeight: 'bold' }}>Lớp PBL của tôi</h3>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>Xem và quản lý các lớp học PBL mà bạn đang tham gia</p>
                    </div>

                    {/* Thẻ 2: Thư viện PBL */}
                    <div className="card clickable" onClick={() => navigate('/thu-vien-pbl')} style={{ flex: '0 1 320px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-columns" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px', color: '#003366', fontWeight: 'bold' }}>Thư viện PBL</h3>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>Truy cập tài liệu, mẫu dự án và tài nguyên học tập mẫu</p>
                    </div>

                    {/* Thẻ 3: Kết quả & Lịch sử PBL (Mới - Điều hướng sang Trang riêng) */}
                    <div className="card clickable" onClick={() => navigate('/student-results')} style={{ flex: '0 1 320px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-file-invoice" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px', color: '#003366', fontWeight: 'bold' }}>Kết quả & Lịch sử PBL</h3>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>Xem lại chi tiết điểm số, đánh giá và nhận xét qua từng học kỳ</p>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default DashboardSV;
