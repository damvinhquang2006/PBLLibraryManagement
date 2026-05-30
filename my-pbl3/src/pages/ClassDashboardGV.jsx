import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';
import { useAuth } from '../context/AuthContext';

const ClassDashboardGV = () => {
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
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
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
                            : <i className="fas fa-user-tie" style={{ fontSize: '18px' }}></i>
                        }
                        {user?.email ?? 'Giảng viên'}
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
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#003366', fontSize: '14px' }}>{user?.username ?? '—'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>{user?.email ?? '—'}</p>
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
                <div className="class-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <button 
                        onClick={() => navigate('/my-classes-gv')} 
                        className="back-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#003366', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <i className="fas fa-arrow-left"></i> Danh sách lớp
                    </button>
                    <h2 style={{ color: '#003366', margin: 0 }}>Không gian lớp: 24T_DT01</h2>
                    <div style={{ width: '150px' }}></div>
                </div>

                <div className="card-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { title: 'Quản lý deadline và nhiệm vụ', icon: 'fa-tasks', primary: true, path: '/lecturer-deadlines' },
                        { title: 'Tạo milestone', icon: 'fa-flag' },
                        { title: 'Quản lý đề tài PBL', icon: 'fa-project-diagram', path: '/lecturer-topics' },
                        { title: 'Đánh giá báo cáo tiến độ', icon: 'fa-clipboard-check' },
                        { title: 'Quản lý điểm', icon: 'fa-sort-numeric-up', path: '/lecturer-grading' },
                        { title: 'Yêu cầu xuất bản PBL', icon: 'fa-upload', path: '/lecturer-publish' }
                    ].map((item, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => item.path && navigate(item.path)}
                            className="card clickable" 
                            style={{ 
                                flex: '0 1 300px', 
                                textAlign: 'center', 
                                padding: '30px 20px', 
                                background: item.primary ? '#eef2ff' : '#fff', 
                                borderRadius: '12px', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                                border: item.primary ? '2px solid #0066cc' : '1px solid #eee' 
                            }}
                        >
                            <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '15px', borderRadius: '8px' }}>
                                <i className={`fas ${item.icon}`} style={{ fontSize: '24px' }}></i>
                            </div>
                            <h3 style={{ fontSize: '18px', color: item.primary ? '#0066cc' : '#333', fontWeight: item.primary ? 'bold' : '600' }}>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ClassDashboardGV;
