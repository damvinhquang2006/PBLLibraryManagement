import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';
import { useAuth } from '../context/AuthContext';

const DashboardSV = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    
    // States cho chức năng tự xuất bản PBL
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [publishData, setPublishData] = useState({
        title: '',
        category: 'web',
        desc: '',
        tech: '',
        fileName: ''
    });
    const [publishFile, setPublishFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePublishSubmit = (e) => {
        e.preventDefault();
        if (!publishData.title || !publishData.desc || !publishData.tech || !publishFile) {
            alert('Vui lòng nhập đầy đủ thông tin đề tài và đính kèm file báo cáo!');
            return;
        }

        setSuccessMsg('Đồ án của bạn đã được xuất bản trực tiếp lên Thư viện PBL thành công!');
        
        setTimeout(() => {
            setShowPublishModal(false);
            setPublishData({
                title: '',
                category: 'web',
                desc: '',
                tech: '',
                fileName: ''
            });
            setPublishFile(null);
            setSuccessMsg('');
        }, 3000);
    };

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
                        { title: 'Lớp PBL của tôi', path: `/sv-truy-cap-lop?userID=${user?.email}&role=SV` },
                        { title: 'Thư viện PBL', path: '/thu-vien-pbl' },
                        { title: 'Kết quả & Lịch sử PBL', path: '/student-results' },
                        { 
                            title: 'Xuất bản PBL', 
                            action: () => {
                                const isCompleted = localStorage.getItem('finalReportCompleted_PBL-CNPM-2025') === 'true';
                                if (!isCompleted) {
                                    alert('Nhóm của bạn chưa hoàn thành nộp báo cáo cuối kỳ! Sinh viên chỉ có thể tự xuất bản dự án PBL khi và chỉ khi đã hoàn thành báo cáo cuối kỳ.');
                                    return;
                                }
                                setShowPublishModal(true);
                            }
                        }
                    ].map((item, idx) => (
                        <li 
                            key={idx}
                            onClick={() => item.action ? item.action() : (item.path && navigate(item.path))}
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

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ padding: '80px 20px' }}>
                    <h1 style={{ color: '#003366', fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                        Dashboard Sinh Viên
                    </h1>
                    <p style={{ color: '#4a5568', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto', fontWeight: '500' }}>
                        Chào mừng bạn đến với Cổng học tập dự án PBL. Nơi gom góp tài liệu học tập từ các anh chị đi trước, thực hiện báo cáo và tự xuất bản đồ án. Mọi tính năng bao gồm **"Lớp PBL của tôi"**, **"Thư viện PBL"**, **"Kết quả & Lịch sử PBL"**, và **"Xuất bản PBL"** hiện đã được tích hợp đầy đủ trên thanh điều hướng phía trên.
                    </p>
                </div>
            </main>

            {/* Modal Xuất bản PBL */}
            {showPublishModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', zIndex: 10000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: '#ffffff', borderRadius: '16px', padding: '35px',
                        width: '90%', maxWidth: '600px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
                        animation: 'fadeIn 0.3s ease-out', textAlign: 'left'
                    }}>
                        {successMsg ? (
                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <div style={{ color: '#28a745', fontSize: '4rem', marginBottom: '20px' }}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3 style={{ color: '#003366', fontWeight: 'bold', marginBottom: '10px' }}>Xuất bản Thành công!</h3>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>{successMsg}</p>
                                <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
                                    <i className="fas fa-spinner fa-spin"></i> Đang tải lại thư viện...
                                </div>
                            </div>
                        ) : (
                            <>
                                <button 
                                    onClick={() => setShowPublishModal(false)} 
                                    style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#666' }}
                                >✕</button>
                                
                                <h2 style={{ color: '#003366', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-paper-plane" style={{ color: '#003366' }}></i>
                                    Tự xuất bản dự án PBL lên Thư viện số
                                </h2>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                    Chia sẻ đồ án xuất sắc của nhóm bạn lên thư viện dùng chung cho các khóa sau. Đồ án sẽ hiển thị công khai ngay sau khi xuất bản.
                                </p>

                                <form onSubmit={handlePublishSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', color: '#333', marginBottom: '6px', fontSize: '0.9rem' }}>Tên đề tài / Đồ án PBL *</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ví dụ: Hệ thống phân tích cảm xúc mạng xã hội tiếng Việt..."
                                            value={publishData.title}
                                            onChange={(e) => setPublishData({...publishData, title: e.target.value})}
                                            required
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontWeight: 'bold', color: '#333', marginBottom: '6px', fontSize: '0.9rem' }}>Danh mục đề tài *</label>
                                            <select 
                                                value={publishData.category}
                                                onChange={(e) => setPublishData({...publishData, category: e.target.value})}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box', backgroundColor: 'white' }}
                                            >
                                                <option value="web">Web Development</option>
                                                <option value="mobile">Mobile Development</option>
                                                <option value="iot">IoT & Embedded Systems</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontWeight: 'bold', color: '#333', marginBottom: '6px', fontSize: '0.9rem' }}>Công nghệ sử dụng (tags) *</label>
                                            <input 
                                                type="text" 
                                                placeholder="React, Python, OpenCV..."
                                                value={publishData.tech}
                                                onChange={(e) => setPublishData({...publishData, tech: e.target.value})}
                                                required
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', color: '#333', marginBottom: '6px', fontSize: '0.9rem' }}>Tóm tắt / Mô tả dự án *</label>
                                        <textarea 
                                            rows="3"
                                            placeholder="Mô tả chi tiết mục tiêu, giải pháp và kết quả đạt được của đồ án..."
                                            value={publishData.desc}
                                            onChange={(e) => setPublishData({...publishData, desc: e.target.value})}
                                            required
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', color: '#333', marginBottom: '6px', fontSize: '0.9rem' }}>Đính kèm Báo cáo cuối kỳ (.pdf/.docx) *</label>
                                        <div style={{
                                            border: '2px dashed #003366', borderRadius: '8px', padding: '20px',
                                            textAlign: 'center', backgroundColor: '#f9f9fb', cursor: 'pointer',
                                            position: 'relative'
                                        }} onClick={() => document.getElementById('report-file-input').click()}>
                                            <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: '#003366', marginBottom: '10px' }}></i>
                                            {publishFile ? (
                                                <p style={{ margin: 0, color: '#28a745', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                                    <i className="fas fa-file-alt"></i> {publishFile.name}
                                                </p>
                                            ) : (
                                                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
                                                    Kéo thả hoặc Click để tải tài liệu của nhóm lên
                                                </p>
                                            )}
                                            <input 
                                                id="report-file-input"
                                                type="file" 
                                                accept=".pdf,.docx,.doc"
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    if(e.target.files[0]) {
                                                        setPublishFile(e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                        <button 
                                            type="button"
                                            onClick={() => setShowPublishModal(false)}
                                            style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                                        >Hủy</button>
                                        <button 
                                            type="submit"
                                            style={{ padding: '10px 25px', borderRadius: '8px', border: 'none', backgroundColor: '#003366', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                                        >Xuất bản ngay</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSV;
