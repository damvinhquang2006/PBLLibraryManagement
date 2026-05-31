import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const MyClassesAdmin = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    // Trạng thái lưu lớp học đang chọn kiểm tra
    const [selectedClass, setSelectedClass] = useState(null);

    // Tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    // Cơ sở dữ liệu lớp học hệ thống cao cấp của Admin
    const classesData = [
        { 
            id: '24.Nh10A', 
            gv: 'Nguyễn Văn A', 
            mon: 'PBL3 _ Ứng dụng quản lý thư viện',
            studentCount: 9,
            groups: [
                {
                    groupNumber: 1,
                    topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên',
                    members: [
                        { id: '102220101', name: 'Nguyễn Như Quỳnh', homeClass: '22T_DT2', role: 'Trưởng nhóm' },
                        { id: '102220102', name: 'Lê Văn An', homeClass: '22T_DT2', role: 'Thành viên' },
                        { id: '102220103', name: 'Trần Minh Hải', homeClass: '22T_DT2', role: 'Thành viên' }
                    ]
                },
                {
                    groupNumber: 2,
                    topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh',
                    members: [
                        { id: '102220201', name: 'Phạm Hoàng Nam', homeClass: '22T_DT1', role: 'Trưởng nhóm' },
                        { id: '102220202', name: 'Lê Thị Thu Thảo', homeClass: '22T_DT1', role: 'Thành viên' }
                    ]
                }
            ],
            unassignedStudents: [
                { id: '102220301', name: 'Bùi Anh Tuấn', homeClass: '22T_CLC2' },
                { id: '102220302', name: 'Nguyễn Hoàng Long', homeClass: '22T_CLC2' },
                { id: '102220303', name: 'Hoàng Văn Dũng', homeClass: '22T_CLC1' },
                { id: '102220304', name: 'Nguyễn Thị Hoa', homeClass: '22T_CLC1' }
            ]
        },
        { 
            id: '24.Nh10B', 
            gv: 'Trần Thị B', 
            mon: 'PBL3 _ Ứng dụng quản lý thư viện',
            studentCount: 8,
            groups: [
                {
                    groupNumber: 1,
                    topicName: 'Website bán hàng điện máy gia dụng tích hợp gợi ý',
                    members: [
                        { id: '102220401', name: 'Đỗ Tiến Đạt', homeClass: '22T_DT2', role: 'Trưởng nhóm' },
                        { id: '102220402', name: 'Bùi Xuân Huấn', homeClass: '22T_DT2', role: 'Thành viên' }
                    ]
                },
                {
                    groupNumber: 2,
                    topicName: 'Xây dựng chatbot tư vấn tuyển sinh trường DUT',
                    members: [
                        { id: '102220501', name: 'Trần Văn Cường', homeClass: '22T_CLC1', role: 'Trưởng nhóm' },
                        { id: '102220502', name: 'Lê Thị Hoa', homeClass: '22T_CLC1', role: 'Thành viên' },
                        { id: '102220503', name: 'Nguyễn Minh Quân', homeClass: '22T_CLC1', role: 'Thành viên' }
                    ]
                }
            ],
            unassignedStudents: [
                { id: '102220601', name: 'Trần Văn Hoàng', homeClass: '22T_DT1' },
                { id: '102220602', name: 'Vũ Thị Lan', homeClass: '22T_DT1' },
                { id: '102220603', name: 'Lê Tấn Phát', homeClass: '22T_DT1' }
            ]
        },
        { 
            id: '24.Nh10C', 
            gv: 'Phạm Văn C', 
            mon: 'PBL3 _ Ứng dụng lập trình web',
            studentCount: 7,
            groups: [
                {
                    groupNumber: 1,
                    topicName: 'Hệ thống quản lý khách sạn trực tuyến',
                    members: [
                        { id: '102210701', name: 'Nguyễn Văn Đạt', homeClass: '21T_DT1', role: 'Trưởng nhóm' },
                        { id: '102210702', name: 'Phạm Hồng Thái', homeClass: '21T_DT1', role: 'Thành viên' }
                    ]
                }
            ],
            unassignedStudents: [
                { id: '102210801', name: 'Lê Hoài Thương', homeClass: '21T_CLC2' },
                { id: '102210802', name: 'Đặng Ngọc Huy', homeClass: '21T_CLC2' },
                { id: '102210803', name: 'Vũ Quốc Anh', homeClass: '21T_DT2' },
                { id: '102210804', name: 'Lê Thị Thu', homeClass: '21T_DT2' },
                { id: '102210805', name: 'Nguyễn Hoàng Việt', homeClass: '21T_DT2' }
            ]
        },
        { 
            id: '24.Nh10D', 
            gv: 'Lê Văn D', 
            mon: 'PBL3 _ Ứng dụng lập trình web',
            studentCount: 6,
            groups: [
                {
                    groupNumber: 1,
                    topicName: 'Hệ thống thi trắc nghiệm trực tuyến',
                    members: [
                        { id: '102220901', name: 'Phan Minh Tiến', homeClass: '22T_CLC1', role: 'Trưởng nhóm' },
                        { id: '102220902', name: 'Nguyễn Thu Phương', homeClass: '22T_CLC1', role: 'Thành viên' },
                        { id: '102220903', name: 'Trần Đại Nghĩa', homeClass: '22T_CLC1', role: 'Thành viên' }
                    ]
                }
            ],
            unassignedStudents: [
                { id: '102220951', name: 'Nguyễn Văn Hùng', homeClass: '22T_DT2' },
                { id: '102220952', name: 'Lê Thị Cúc', homeClass: '22T_DT2' },
                { id: '102220953', name: 'Đặng Văn Khoa', homeClass: '22T_DT2' }
            ]
        }
    ];

    // Lọc tìm kiếm lớp
    const filteredClasses = classesData.filter(cls => 
        cls.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.gv.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.mon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                {/* Thanh tìm kiếm lớp của Admin */}
                <div className="search-container" style={{ flex: '0 1 400px', margin: '0 20px', position: 'relative' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}></i>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm lớp học PBL..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
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
                        <i className="fas fa-user-shield" style={{ fontSize: '18px' }}></i> 
                        admin@system.com
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
                                onClick={() => { setShowMenu(false); }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s', color: '#003366' }}
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
                        onClick={() => navigate('/dashboard-admin')} 
                        className="back-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#003366', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                    <h2 style={{ color: '#003366', margin: 0, fontWeight: 'bold', fontSize: '1.8rem' }}>Quản lý toàn bộ lớp hệ thống</h2>
                    <div style={{ width: '150px' }}></div>
                </div>

                {/* Grid Lớp học PBL */}
                <div className="card-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {filteredClasses.map((cls, idx) => (
                        <div 
                            key={idx} 
                            className="card clickable" 
                            onClick={() => setSelectedClass(cls)} // Click vào mở Modal kiểm tra chi tiết
                            style={{ 
                                flex: '0 1 calc(25% - 15px)', 
                                minWidth: '260px', 
                                textAlign: 'center', 
                                padding: '30px 20px', 
                                background: '#fff', 
                                borderRadius: '12px', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                                border: '1px solid #eee',
                                transition: 'all 0.2s' 
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div className="icon-box blue" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', marginBottom: '15px', borderRadius: '8px' }}>
                                <i className="fas fa-chalkboard" style={{ fontSize: '20px' }}></i>
                            </div>
                            <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold', color: '#003366' }}>{cls.id}</h3>
                            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                                Giảng viên: <strong>{cls.gv}</strong>
                                <br/>
                                <span style={{ fontSize: '12px', color: '#888' }}>{cls.mon}</span>
                            </p>
                            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '5px', fontSize: '12px', color: '#0066cc', fontWeight: 'bold' }}>
                                <i className="fas fa-users"></i> {cls.studentCount} sinh viên
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* HỘP THOẠI MODAL KIỂM TRA LỚP CHI TIẾT (PREMIUM) */}
            {selectedClass && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedClass(null); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(5px)', animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    <div style={{
                        backgroundColor: '#f8f9fa', borderRadius: '16px',
                        width: '90%', maxWidth: '900px', maxHeight: '85vh',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        display: 'flex', flexDirection: 'column',
                        animation: 'scaleUp 0.2s ease-out'
                    }}>
                        
                        {/* Header Modal - Navy Blue đồng bộ ITFDUT */}
                        <header className="navbar" style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            padding: '12px 30px', width: '100%', boxSizing: 'border-box',
                            backgroundColor: '#003366', color: 'white', position: 'relative', flexShrink: 0
                        }}>
                            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '3px' }} />
                                <div style={{ textAlign: 'left' }}>
                                    <h1 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: 'bold' }}>
                                        Kiểm tra Chi tiết Lớp: {selectedClass.id}
                                    </h1>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedClass(null)} 
                                style={{ 
                                    border: 'none', background: 'none', color: 'white', 
                                    fontSize: '1.4rem', cursor: 'pointer', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', padding: '0 5px' 
                                }}
                            >✕</button>
                        </header>

                        {/* Body Modal */}
                        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, textAlign: 'left' }}>
                            
                            {/* 1. Hộp thông tin tóm tắt lớp */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Tên lớp học</span>
                                    <strong style={{ fontSize: '1.1rem', color: '#003366' }}>{selectedClass.id}</strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Giảng viên hướng dẫn</span>
                                    <strong style={{ fontSize: '1.1rem', color: '#333' }}>{selectedClass.gv}</strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Học phần / Môn học</span>
                                    <strong style={{ fontSize: '1.1rem', color: '#333' }}>{selectedClass.mon}</strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Tổng số lượng sinh viên</span>
                                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>{selectedClass.studentCount} Học viên</strong>
                                </div>
                            </div>

                            {/* 2. Danh sách các Nhóm Đồ án */}
                            <h3 style={{ color: '#003366', fontWeight: 'bold', fontSize: '1.15rem', marginBottom: '15px' }}>
                                <i className="fas fa-users-cog" style={{ marginRight: '8px' }}></i>
                                Danh sách các nhóm đồ án ({selectedClass.groups.length} nhóm)
                            </h3>
                            
                            {selectedClass.groups.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#888', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
                                    Lớp chưa thành lập nhóm đồ án nào.
                                </div>
                            ) : (
                                selectedClass.groups.map(group => (
                                    <div key={group.groupNumber} style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                        <div style={{ backgroundColor: '#003366', color: 'white', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ color: 'white' }}>Nhóm {group.groupNumber}</strong>
                                            <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', color: 'white' }}>
                                                Đề tài: {group.topicName || 'Chưa đăng ký đề tài'}
                                            </span>
                                        </div>

                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                    <th style={{ padding: '10px 20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', width: '25%' }}>Mã SV</th>
                                                    <th style={{ padding: '10px 20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', width: '35%' }}>Họ và tên</th>
                                                    <th style={{ padding: '10px 20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', width: '20%' }}>Lớp sinh hoạt</th>
                                                    <th style={{ padding: '10px 20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', width: '20%' }}>Vai trò</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {group.members.map(member => (
                                                    <tr key={member.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <td style={{ padding: '10px 20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{member.id}</td>
                                                        <td style={{ padding: '10px 20px', fontSize: '0.9rem' }}>{member.name}</td>
                                                        <td style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#666' }}>{member.homeClass}</td>
                                                        <td style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                                                            {member.role === 'Trưởng nhóm' ? (
                                                                <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                                    👑 Trưởng nhóm
                                                                </span>
                                                            ) : (
                                                                <span style={{ color: '#64748b' }}>Thành viên</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            )}

                            {/* 3. Sinh viên chưa có nhóm tham gia */}
                            <h3 style={{ color: '#be123c', fontWeight: 'bold', fontSize: '1.15rem', marginTop: '30px', marginBottom: '15px' }}>
                                <i className="fas fa-user-slash" style={{ marginRight: '8px' }}></i>
                                Danh sách sinh viên chưa có nhóm tham gia ({selectedClass.unassignedStudents.length} sinh viên)
                            </h3>

                            {selectedClass.unassignedStudents.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#059669', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0', fontWeight: 'bold' }}>
                                    Tuyệt vời! Tất cả sinh viên trong lớp đã có nhóm đầy đủ.
                                </div>
                            ) : (
                                <div style={{ backgroundColor: '#fff1f2', borderRadius: '10px', border: '1px solid #fecdd3', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#ffe4e6', borderBottom: '1px solid #fecdd3' }}>
                                                <th style={{ padding: '12px 20px', fontSize: '0.8rem', color: '#be123c', fontWeight: 'bold', width: '30%' }}>Mã SV</th>
                                                <th style={{ padding: '12px 20px', fontSize: '0.8rem', color: '#be123c', fontWeight: 'bold', width: '45%' }}>Họ và tên</th>
                                                <th style={{ padding: '12px 20px', fontSize: '0.8rem', color: '#be123c', fontWeight: 'bold', width: '25%' }}>Lớp sinh hoạt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedClass.unassignedStudents.map(student => (
                                                <tr key={student.id} style={{ borderBottom: '1px solid #ffe4e6', color: '#9f1239' }}>
                                                    <td style={{ padding: '10px 20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{student.id}</td>
                                                    <td style={{ padding: '10px 20px', fontSize: '0.9rem', fontWeight: '500' }}>{student.name}</td>
                                                    <td style={{ padding: '10px 20px', fontSize: '0.9rem' }}>{student.homeClass}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>

                        {/* Footer Modal */}
                        <div style={{ padding: '15px 30px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
                            <button 
                                className="btn" 
                                style={{ width: 'auto', padding: '8px 24px', fontWeight: 'bold', borderRadius: '6px' }}
                                onClick={() => setSelectedClass(null)}
                            >
                                Đóng hộp thoại
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Thêm CSS animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default MyClassesAdmin;
