import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const MyClassesGV = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-book-open" style={{ fontSize: '28px' }}></i>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                <div className="search-container" style={{ flex: '0 1 400px', margin: '0 20px', position: 'relative' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}></i>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm lớp học PBL..." 
                        style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '14px' }}
                    />
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
                        <i className="fas fa-user-tie" style={{ fontSize: '18px' }}></i> 
                        giangvien@gmail.com
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
                                onClick={() => { setShowMenu(false); /* navigate to profile */ }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-user-circle"></i> Kiểm tra tài khoản
                            </div>
                            <div 
                                className="menu-item" 
                                onClick={() => navigate('/')}
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
                        onClick={() => navigate('/dashboard-gv')} 
                        className="back-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#003366', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                    <h2 style={{ color: '#003366', margin: 0 }}>Các lớp đang hướng dẫn</h2>
                    <div style={{ width: '150px' }}></div>
                </div>

                <div className="card-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {[
                        { id: '24.Nh10A', topic: 'Ứng dụng quản lý thư viện', icon: 'fa-laptop-code' },
                        { id: '24.Nh10B', topic: 'Hệ thống nhúng IoT', icon: 'fa-microchip' },
                        { id: '24.Nh10C', topic: 'Phân tích dữ liệu lớn', icon: 'fa-database' }
                    ].map((cls, idx) => (
                        <div 
                            key={idx} 
                            className="card clickable" 
                            onClick={() => navigate('/class-dashboard-gv')}
                            style={{ flex: '0 1 calc(33.333% - 14px)', minWidth: '280px', textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}
                        >
                            <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', marginBottom: '20px', borderRadius: '8px' }}>
                                <i className={`fas ${cls.icon}`} style={{ fontSize: '24px' }}></i>
                            </div>
                            <h3 style={{ marginBottom: '15px', fontSize: '20px' }}>{cls.id}</h3>
                            <p style={{ color: '#666', fontSize: '15px' }}>Đề tài: {cls.topic}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyClassesGV;
