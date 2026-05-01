import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                    <i className="fas fa-user-shield" style={{ fontSize: '18px' }}></i> 
                    admin@system.com
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', marginBottom: '10px' }}>Dashboard Quản trị viên</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Bảng điều khiển quản lý toàn bộ hệ thống PBL</p>
                </div>

                <div className="card-grid" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    
                    <div className="card clickable" onClick={() => navigate('/my-classes-admin')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-university" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý lớp</h3>
                        <p style={{ color: '#666' }}>Tạo, chỉnh sửa và cấu hình các lớp học PBL</p>
                    </div>

                    <div className="card clickable" onClick={() => navigate('#')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-archive" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý thư viện PBL</h3>
                        <p style={{ color: '#666' }}>Tổ chức và quản lý các tài liệu, đồ án trong thư viện</p>
                    </div>
                    
                    <div className="card clickable" onClick={() => navigate('#')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-users-cog" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý tài khoản</h3>
                        <p style={{ color: '#666' }}>Quản lý tài khoản người dùng của giảng viên, sinh viên</p>
                    </div>

                    <div className="card clickable" onClick={() => navigate('#')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Duyệt xuất bản PBL</h3>
                        <p style={{ color: '#666' }}>Xem xét và phê duyệt các đồ án xuất sắc lên thư viện</p>
                    </div>
                    
                    <div className="card clickable" onClick={() => navigate('#')} style={{ flex: '0 1 350px', textAlign: 'center', padding: '40px 20px' }}>
                        <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                            <i className="fas fa-chart-bar" style={{ fontSize: '24px' }}></i>
                        </div>
                        <h3 style={{ marginBottom: '15px' }}>Xem thống kê PBL</h3>
                        <p style={{ color: '#666' }}>Báo cáo và số liệu đánh giá về tình hình học tập và đồ án</p>
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
                    <h3 style={{ color: '#003366', marginBottom: '30px', textAlign: 'center' }}>Thống kê hệ thống</h3>
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px', borderRight: '1px solid #eee' }}>
                            <StatNumber target={1500} />
                            <p style={{ color: '#666', marginTop: '10px' }}>Sinh viên hoạt động</p>
                        </div>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px', borderRight: '1px solid #eee' }}>
                            <StatNumber target={120} />
                            <p style={{ color: '#666', marginTop: '10px' }}>Giảng viên</p>
                        </div>
                        <div className="stat-item" style={{ textAlign: 'center', padding: '20px' }}>
                            <StatNumber target={450} />
                            <p style={{ color: '#666', marginTop: '10px' }}>Dự án trong thư viện</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
