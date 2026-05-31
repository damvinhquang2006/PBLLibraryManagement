import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const DashboardGuest = () => {
    const navigate = useNavigate();

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
                <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0, padding: 0, alignItems: 'center' }}>
                    {[
                        { title: 'Thư viện PBL', path: '/thu-vien-pbl' },
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
                
                {/* Login Button with 18px text and icon */}
                <div 
                    className="login-btn clickable" 
                    onClick={() => navigate('/login')}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        fontSize: '18px', 
                        cursor: 'pointer', 
                        backgroundColor: '#ffffff', 
                        color: '#003366', 
                        padding: '10px 24px', 
                        borderRadius: '6px', 
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        userSelect: 'none'
                    }}
                >
                    <i className="fas fa-sign-in-alt" style={{ fontSize: '18px' }}></i> 
                    Đăng nhập
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ padding: '80px 20px' }}>
                    <h1 style={{ color: '#003366', fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                        Dashboard Khách
                    </h1>
                    <p style={{ color: '#4a5568', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto', fontWeight: '500' }}>
                        Chào mừng bạn đến với Cổng thông tin học tập dự án PBL. Nơi tra cứu tài liệu học tập, thống kê dự án và tài nguyên mẫu công khai. Các tính năng bao gồm **"Thư viện PBL"** và **"Xem thống kê PBL"** hiện đã được tích hợp đầy đủ trên thanh điều hướng phía trên.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default DashboardGuest;