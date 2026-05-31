import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const StatNumber = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const speed = 200;
        const inc = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(current));
            }
        }, 50);

        return () => clearInterval(timer);
    }, [target]);

    return <span className="stat-number" style={{ display: 'block', fontSize: '2.5rem', fontWeight: 'bold', color: '#003366' }}>{count}</span>;
};

const DashboardAdmin = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="dashboard-body" style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            minHeight: '100vh', 
            backgroundImage: 'linear-gradient(rgba(248, 249, 250, 0.85), rgba(248, 249, 250, 0.85)), url("/picture/dai-hoc-bach-khoa-da-nang-2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            overflowY: 'auto'
        }}>
            
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                {/* Navbar Navigation Items */}
                <ul style={{ display: 'flex', listStyle: 'none', gap: '10px', margin: 0, padding: 0, alignItems: 'center' }}>
                    {[
                        { title: 'Quản lý lớp', path: '/my-classes-admin' },
                        { title: 'Quản lý thư viện PBL', path: '/thu-vien-pbl' },
                        { title: 'Quản lý tài khoản', path: '/account-management' },
                        { title: 'Xem thống kê PBL', path: '/statistics' }
                    ].map((item, idx) => (
                        <li 
                            key={idx}
                            onClick={() => item.path && navigate(item.path)}
                            style={{ 
                                color: 'white', 
                                fontSize: '18px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                padding: '8px 15px',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                                userSelect: 'none'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>

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
                        <i className="fas fa-user-shield" style={{ fontSize: '18px' }}></i>
                        {user?.email ?? 'Admin'}
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
                            width: '200px',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}>
                            <div 
                                className="menu-item" 
                                onClick={() => { setShowMenu(false); navigate('/profile'); }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s', color: '#003366' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-user-circle"></i> Hồ sơ cá nhân
                            </div>
                            <div 
                                className="menu-item" 
                                onClick={() => { setShowMenu(false); logout(); navigate('/'); }}
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

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ padding: '80px 20px' }}>
                    <h1 style={{ color: '#003366', fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                        Dashboard Quản Trị Viên
                    </h1>
                    <p style={{ color: '#4a5568', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto', fontWeight: '500' }}>
                        Chào mừng Quản trị viên. Nơi vận hành toàn bộ hệ thống đăng ký và quản lý tài liệu PBL. Các công cụ quản trị bao gồm **"Quản lý lớp"**, **"Quản lý thư viện PBL"**, **"Quản lý tài khoản"** và **"Xem thống kê PBL"** đã được di chuyển lên thanh menu điều hướng phía trên.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
