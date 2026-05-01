import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const DashboardGV = () => {
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
                
                <div 
                    className="user-info clickable" 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '14px', 
                        backgroundColor: 'rgba(255,255,255,0.2)', 
                        padding: '8px 15px', 
                        borderRadius: '20px'
                    }}
                >
                    <i className="fas fa-user-tie" style={{ fontSize: '18px' }}></i> 
                    giangvien@gmail.com
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', marginBottom: '10px' }}>Dashboard Giảng viên</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Chào mừng bạn đến với Hệ thống quản lý PBL dành cho Giảng viên</p>
                </div>

                <div className="card-grid" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    
                    <div className="card clickable" onClick={() => navigate('/my-classes-gv')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-chalkboard-teacher" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Lớp PBL của tôi</h3>
                        <p style={{ color: '#666' }}>Xem và quản lý các lớp học PBL mà bạn đang hướng dẫn</p>
                    </div>

                    <div className="card clickable" onClick={() => navigate('#')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-tasks" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý deadline và nhiệm vụ</h3>
                        <p style={{ color: '#666' }}>Giao việc, theo dõi tiến độ và chấm điểm cho sinh viên</p>
                    </div>

                    <div className="card account-card" style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box gray" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-user" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Tài khoản</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn btn-outline" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Xem Profile</button>
                            <button className="btn btn-outline" onClick={() => navigate('/')} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                                <i className="fas fa-sign-out-alt"></i> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>

                <div className="stats-card" style={{ marginTop: '50px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <h3 style={{ color: '#003366', marginBottom: '30px', textAlign: 'center' }}>Thống kê tổng quan</h3>
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px', borderRight: '1px solid #eee' }}>
                            <span className="stat-number" style={{ display: 'block', fontSize: '2.5rem', fontWeight: 'bold', color: '#003366' }}>4</span>
                            <p style={{ color: '#666', marginTop: '10px' }}>Lớp đang phụ trách</p>
                        </div>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px', borderRight: '1px solid #eee' }}>
                            <span className="stat-number" style={{ display: 'block', fontSize: '2.5rem', fontWeight: 'bold', color: '#003366' }}>15</span>
                            <p style={{ color: '#666', marginTop: '10px' }}>Nhiệm vụ cần duyệt</p>
                        </div>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px' }}>
                            <span className="stat-number" style={{ display: 'block', fontSize: '2.5rem', fontWeight: 'bold', color: '#003366' }}>20</span>
                            <p style={{ color: '#666', marginTop: '10px' }}>Đồ án đã hướng dẫn</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardGV;
