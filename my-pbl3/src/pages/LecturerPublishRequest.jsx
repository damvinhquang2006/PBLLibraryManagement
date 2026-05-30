import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerPublishRequest = () => {
    const navigate = useNavigate();

    // Dữ liệu giả lập các nhóm đăng ký yêu cầu xuất bản
    const [publishRequests, setPublishRequests] = useState([
        {
            id: 1,
            groupNumber: 1,
            topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên',
            members: [
                { id: '102220123', fullName: 'Nguyễn Như Quỳnh', email: 'quynh.nn@sv.dut.udn.vn', homeClass: '22T_DT2' },
                { id: '102220456', fullName: 'Lê Văn An', email: 'an.lv@sv.dut.udn.vn', homeClass: '22T_DT2' },
                { id: '102220789', fullName: 'Trần Minh Hải', email: 'hai.tm@sv.dut.udn.vn', homeClass: '22T_DT2' }
            ],
            localFolderLink: 'file:///D:/PBLLibraryManagement/submissions/group1',
            processScore: 8.5,
            finalScore: 9.0,
            status: 'Đang chờ duyệt xuất bản' // 'Đang chờ duyệt xuất bản' / 'Đã xuất bản'
        },
        {
            id: 2,
            groupNumber: 2,
            topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh',
            members: [
                { id: '102210111', fullName: 'Phạm Hoàng Nam', email: 'nam.ph@sv.dut.udn.vn', homeClass: '21T_DT1' },
                { id: '102210222', fullName: 'Lê Thị Thu Thảo', email: 'thao.ltt@sv.dut.udn.vn', homeClass: '21T_DT1' }
            ],
            localFolderLink: 'file:///D:/PBLLibraryManagement/submissions/group2',
            processScore: 7.0,
            finalScore: 8.0,
            status: 'Đang chờ duyệt xuất bản'
        },
        {
            id: 3,
            groupNumber: 3,
            topicName: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý',
            members: [
                { id: '102220999', fullName: 'Hoàng Văn Dũng', email: 'dung.hv@sv.dut.udn.vn', homeClass: '22T_CLC1' },
                { id: '102220888', fullName: 'Nguyễn Thị Hoa', email: 'hoa.nt@sv.dut.udn.vn', homeClass: '22T_CLC1' },
                { id: '102220777', fullName: 'Đỗ Tiến Đạt', email: 'dat.dt@sv.dut.udn.vn', homeClass: '22T_CLC1' }
            ],
            localFolderLink: 'file:///D:/PBLLibraryManagement/submissions/group3',
            processScore: 9.0,
            finalScore: 9.5,
            status: 'Đã xuất bản'
        }
    ]);

    const [selectedGroup, setSelectedGroup] = useState(null);

    // Xử lý gửi yêu cầu xuất bản
    const handleRequestPublish = (id, topicName) => {
        setPublishRequests(prev =>
            prev.map(item => {
                if (item.id === id) {
                    alert(`Đã gửi yêu cầu xuất bản thành công cho đề tài: "${topicName}"!`);
                    return { ...item, status: 'Đã xuất bản' };
                }
                return item;
            })
        );
    };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f4f7fe' }}>
            {/* Header đồng bộ */}
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-upload" style={{ fontSize: '24px' }}></i>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Yêu cầu xuất bản PBL</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Hệ thống quản lý & lưu trữ đồ án</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="back-btn" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'transparent' }}>
                    <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                </button>
            </header>

            {/* Container chính */}
            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                
                {/* Tiêu đề căn lề trái đồng bộ */}
                <div className="welcome-text" style={{ marginBottom: '30px', textAlign: 'left' }}>
                    <h2 style={{ color: '#003366', fontSize: '1.8rem', fontWeight: 'bold' }}>Quản lý & Yêu cầu xuất bản đề tài PBL</h2>
                    <p style={{ color: '#666', marginTop: '5px' }}>Phê duyệt hồ sơ báo cáo của các nhóm và gửi yêu cầu xuất bản dự án lên Thư viện số</p>
                </div>

                {/* Bảng hồ sơ yêu cầu xuất bản */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: '#003366', fontSize: '1.2rem', fontWeight: 'bold' }}>Danh sách đề tài đủ điều kiện xuất bản</h3>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '950px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Nhóm số</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Tên đề tài</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Chi tiết thành viên</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Bài làm</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Điểm tổng kết</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Trạng thái</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publishRequests.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f4f7fe', transition: 'background-color 0.2s' }}>
                                        {/* Cột 1: Nhóm số */}
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#003366' }}>
                                            Nhóm {item.groupNumber}
                                        </td>
                                        
                                        {/* Cột 2: Tên đề tài */}
                                        <td style={{ padding: '15px', fontWeight: '600', color: '#334155', maxWidth: '280px' }}>
                                            {item.topicName}
                                        </td>
                                        
                                        {/* Cột 3: Chi tiết thành viên (Nút có viền premium) */}
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '5px' }}>{item.members.length} thành viên</div>
                                            <button 
                                                onClick={() => setSelectedGroup(item)}
                                                style={{ 
                                                    padding: '5px 12px', 
                                                    borderRadius: '6px', 
                                                    border: '1px solid #003366', 
                                                    backgroundColor: '#eef2ff', 
                                                    color: '#003366', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 'bold', 
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#003366';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#eef2ff';
                                                    e.currentTarget.style.color = '#003366';
                                                }}
                                            >
                                                Xem thêm
                                            </button>
                                        </td>
                                        
                                        {/* Cột 4: Bài làm (Local Folder link) */}
                                        <td style={{ padding: '15px' }}>
                                            <a 
                                                href={item.localFolderLink} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                style={{ 
                                                    color: '#0066cc', 
                                                    textDecoration: 'none', 
                                                    fontSize: '0.85rem', 
                                                    fontWeight: 'bold',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <i className="fas fa-folder-open" style={{ fontSize: '1rem', color: '#f59e0b' }}></i> Xem thư mục local
                                            </a>
                                        </td>
                                        
                                        {/* Cột 5: Điểm tổng kết */}
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                                                Quá trình: <strong style={{ color: '#003366' }}>{item.processScore}</strong>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '3px' }}>
                                                Cuối kỳ: <strong style={{ color: '#003366' }}>{item.finalScore}</strong>
                                            </div>
                                        </td>
                                        
                                        {/* Cột 6: Trạng thái (Badge tích hợp icon) */}
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <span style={{ 
                                                padding: '6px 14px', 
                                                borderRadius: '20px', 
                                                fontSize: '0.8rem', 
                                                backgroundColor: item.status === 'Đã xuất bản' ? '#ecfdf5' : '#fffbeb', 
                                                color: item.status === 'Đã xuất bản' ? '#059669' : '#d97706',
                                                fontWeight: 'bold',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <i className={item.status === 'Đã xuất bản' ? 'fas fa-check-circle' : 'fas fa-clock'}></i>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Cột 7: Thao tác (Button yêu cầu xuất bản bo góc 6px) */}
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <button 
                                                onClick={() => handleRequestPublish(item.id, item.topicName)}
                                                disabled={item.status === 'Đã xuất bản'}
                                                style={{ 
                                                    padding: '8px 16px', 
                                                    borderRadius: '6px', 
                                                    border: 'none',
                                                    backgroundColor: '#003366', 
                                                    color: 'white', 
                                                    fontSize: '0.85rem', 
                                                    fontWeight: 'bold', 
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s',
                                                    opacity: item.status === 'Đã xuất bản' ? 0.4 : 1,
                                                    pointerEvents: item.status === 'Đã xuất bản' ? 'none' : 'auto'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002244'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003366'}
                                            >
                                                <i className="fas fa-paper-plane"></i> Yêu cầu xuất bản
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal Chi tiết Thành viên */}
            {selectedGroup && (
                <div 
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSelectedGroup(null);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px 40px',
                        borderRadius: '16px',
                        maxWidth: '750px',
                        width: '90%',
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                    }}>
                        {/* Nút đóng góc phải */}
                        <button 
                            onClick={() => setSelectedGroup(null)} 
                            style={{ 
                                position: 'absolute', 
                                top: '20px', 
                                right: '25px', 
                                border: 'none', 
                                background: 'none', 
                                fontSize: '1.5rem', 
                                cursor: 'pointer',
                                color: '#94a3b8'
                            }}
                        >
                            ✕
                        </button>
                        
                        <h2 style={{ color: '#003366', marginBottom: '8px', fontSize: '1.4rem', fontWeight: 'bold' }}>
                            Thông tin thành viên Nhóm {selectedGroup.groupNumber}
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Đề tài: <strong style={{ color: '#1e293b' }}>{selectedGroup.topicName}</strong>
                        </p>
                        
                        <div style={{ overflowX: 'auto', marginBottom: '25px', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Mã SV (id)</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Họ và tên (fullName)</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Email (email)</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Lớp sinh hoạt (homeClass)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedGroup.members.map((member) => (
                                        <tr key={member.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                                            <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#0f172a', fontSize: '0.9rem' }}>
                                                {member.id}
                                            </td>
                                            <td style={{ padding: '12px 15px', fontSize: '0.9rem', fontWeight: '500' }}>
                                                {member.fullName}
                                            </td>
                                            <td style={{ padding: '12px 15px', fontSize: '0.9rem', color: '#2563eb' }}>
                                                {member.email}
                                            </td>
                                            <td style={{ padding: '12px 15px' }}>
                                                <span style={{ backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
                                                    {member.homeClass}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setSelectedGroup(null)}
                                style={{ 
                                    padding: '10px 24px', 
                                    borderRadius: '8px', 
                                    border: 'none', 
                                    backgroundColor: '#003366', 
                                    color: 'white', 
                                    cursor: 'pointer', 
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerPublishRequest;
