import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const DashboardGuest = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-book-open" style={{ fontSize: '28px' }}></i>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                {/* Phần thông tin Khách đã được thay thế bằng Nút Đăng nhập */}
                <div 
                    className="login-btn clickable" 
                    onClick={() => navigate('/login')}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '15px', 
                        cursor: 'pointer', 
                        backgroundColor: '#ffffff', 
                        color: '#003366', 
                        padding: '8px 20px', 
                        borderRadius: '6px', 
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i> 
                    Đăng nhập
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', marginBottom: '10px' }}>Dashboard Khách</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Chào mừng bạn đến với Hệ thống PBL</p>
                </div>

                <div className="card-grid" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    
                    {/* Card Đăng nhập đã được loại bỏ, chỉ giữ lại Thư viện PBL */}
                    <div className="card clickable" onClick={() => navigate('/thu-vien-pbl')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-columns" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Thư viện PBL</h3>
                        <p style={{ color: '#666' }}>Truy cập tài liệu, mẫu dự án và tài nguyên học tập</p>
                    </div>

                    <div className="card clickable" onClick={() => navigate('/statistics')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-chart-line" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Xem thống kê PBL</h3>
                        <p style={{ color: '#666' }}>Báo cáo số liệu và tình hình học tập đồ án qua các năm</p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardGuest;