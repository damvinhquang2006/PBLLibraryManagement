import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerDeadlineManagement = () => {
    const navigate = useNavigate();
    
    // Giả lập dữ liệu các nhóm và nhiệm vụ mới nhất của họ
    const [groupDeadlines, setGroupDeadlines] = useState([
        {
            id: 1,
            groupNumber: 1,
            topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên',
            memberCount: 3,
            latestTask: 'Hoàn thành chương 1 và thiết kế sơ đồ UML',
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * (24 * 3 + 5)), // Còn 3 ngày 5 giờ
            status: 'Chưa hoàn thành'
        },
        {
            id: 2,
            groupNumber: 2,
            topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh',
            memberCount: 2,
            latestTask: 'Thiết kế Database Schema và kết nối API Mockup',
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * (24 * 8 + 12)), // Còn 8 ngày 12 giờ
            status: 'Chưa hoàn thành'
        },
        {
            id: 3,
            groupNumber: 3,
            topicName: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý',
            memberCount: 3,
            latestTask: 'Lập trình frontend trang chủ và tích hợp thanh toán',
            deadlineDate: new Date(new Date().getTime() - 1000 * 60 * 60 * (24 * 2)), // Đã quá hạn 2 ngày
            status: 'Hoàn thành'
        },
        {
            id: 4,
            groupNumber: 4,
            topicName: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT',
            memberCount: 2,
            latestTask: 'Thu thập tập dữ liệu câu hỏi thường gặp (FAQs)',
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 18), // Còn 18 giờ
            status: 'Chưa hoàn thành'
        }
    ]);

    // Hàm tính toán thời gian còn lại động
    const getTimeRemaining = (deadlineDate, status) => {
        if (status === 'Hoàn thành') return 'Đã hoàn thành';
        const diff = deadlineDate - new Date();
        if (diff <= 0) {
            const overdueMs = Math.abs(diff);
            const days = Math.floor(overdueMs / (1000 * 60 * 60 * 24));
            if (days > 0) return `Quá hạn ${days} ngày`;
            return 'Đã quá hạn';
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        if (days > 0) return `Còn ${days} ngày ${hours} giờ`;
        return `Còn ${hours} giờ`;
    };

    // Hàm chuyển đổi trạng thái nhiệm vụ trực tiếp
    const toggleTaskStatus = (id) => {
        setGroupDeadlines(prev => 
            prev.map(g => {
                if (g.id === id) {
                    const newStatus = g.status === 'Hoàn thành' ? 'Chưa hoàn thành' : 'Hoàn thành';
                    return { ...g, status: newStatus };
                }
                return g;
            })
        );
    };

    // Tính toán các thống kê phụ
    const totalGroups = groupDeadlines.length;
    const completedTasks = groupDeadlines.filter(g => g.status === 'Hoàn thành').length;
    const pendingTasks = totalGroups - completedTasks;

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f4f7fe' }}>
            {/* Header đồng bộ */}
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-tasks" style={{ fontSize: '24px' }}></i>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Quản lý Deadline & Nhiệm vụ</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Hệ thống hướng dẫn & đánh giá</p>
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
                    <h2 style={{ color: '#003366', fontSize: '1.8rem', fontWeight: 'bold' }}>Quản lý deadline & nhiệm vụ các nhóm</h2>
                    <p style={{ color: '#666', marginTop: '5px' }}>Theo dõi chi tiết các nhiệm vụ mới nhất, thời gian hoàn thành và hạn chót của từng nhóm sinh viên</p>
                </div>

                {/* Thống kê nhanh */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px 25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid #003366' }}>
                        <div style={{ backgroundColor: '#eef2ff', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003366' }}>
                            <i className="fas fa-users" style={{ fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '1.6rem', fontWeight: 'bold', color: '#003366' }}>{totalGroups}</span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Tổng số nhóm</span>
                        </div>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '20px 25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid #10b981' }}>
                        <div style={{ backgroundColor: '#ecfdf5', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '1.6rem', fontWeight: 'bold', color: '#10b981' }}>{completedTasks}</span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Nhiệm vụ hoàn thành</span>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '20px 25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid #f59e0b' }}>
                        <div style={{ backgroundColor: '#fffbeb', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                            <i className="fas fa-clock" style={{ fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '1.6rem', fontWeight: 'bold', color: '#f59e0b' }}>{pendingTasks}</span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Nhiệm vụ chờ thực hiện</span>
                        </div>
                    </div>
                </div>

                {/* Khối danh sách dạng bảng */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: '#003366', fontSize: '1.2rem', fontWeight: 'bold' }}>Tiến độ nhiệm vụ hiện tại</h3>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '950px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Nhóm số</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Tên đề tài</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Số lượng thành viên</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Tên Nhiệm Vụ (Mới nhất)</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Deadline</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Trạng thái</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupDeadlines.map(item => {
                                    const timeRem = getTimeRemaining(item.deadlineDate, item.status);
                                    const isOverdue = timeRem.includes('Quá hạn') || timeRem === 'Đã quá hạn';
                                    
                                    return (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #f4f7fe', transition: 'background-color 0.2s' }}>
                                            {/* Cột 1: Nhóm số */}
                                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#003366' }}>
                                                Nhóm {item.groupNumber}
                                            </td>
                                            
                                            {/* Cột 2: Tên đề tài */}
                                            <td style={{ padding: '15px', fontWeight: '600', color: '#334155', maxWidth: '280px' }}>
                                                {item.topicName}
                                            </td>
                                            
                                            {/* Cột 3: Số lượng thành viên */}
                                            <td style={{ padding: '15px', color: '#64748b' }}>
                                                {item.memberCount} thành viên
                                            </td>
                                            
                                            {/* Cột 4: Tên Nhiệm Vụ */}
                                            <td style={{ padding: '15px', color: '#475569', fontWeight: '500', maxWidth: '240px' }}>
                                                {item.latestTask}
                                            </td>
                                            
                                            {/* Cột 5: Deadline có icon */}
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <span style={{ 
                                                    padding: '6px 14px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 'bold',
                                                    backgroundColor: 
                                                        item.status === 'Hoàn thành' ? '#f0fdf4' : 
                                                        isOverdue ? '#fff1f2' : '#fffbeb',
                                                    color: 
                                                        item.status === 'Hoàn thành' ? '#15803d' : 
                                                        isOverdue ? '#e11d48' : '#b45309',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <i className={
                                                        item.status === 'Hoàn thành' ? 'fas fa-check-circle' : 
                                                        isOverdue ? 'fas fa-exclamation-triangle' : 'fas fa-hourglass-half'
                                                    }></i>
                                                    {timeRem}
                                                </span>
                                            </td>
                                            
                                            {/* Cột 6: Trạng thái có icon */}
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <span style={{ 
                                                    padding: '6px 14px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 'bold',
                                                    backgroundColor: item.status === 'Hoàn thành' ? '#ecfdf5' : '#fffbeb', 
                                                    color: item.status === 'Hoàn thành' ? '#059669' : '#d97706',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <i className={item.status === 'Hoàn thành' ? 'fas fa-check-circle' : 'fas fa-clock'}></i>
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* Cột 7: Thao tác bo góc 6px có icon */}
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <button 
                                                    onClick={() => toggleTaskStatus(item.id)}
                                                    style={{ 
                                                        padding: '6px 14px', 
                                                        borderRadius: '6px', 
                                                        border: 'none',
                                                        backgroundColor: item.status === 'Hoàn thành' ? '#ef4444' : '#003366', 
                                                        color: 'white', 
                                                        fontSize: '0.85rem', 
                                                        fontWeight: 'bold', 
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (item.status === 'Hoàn thành') {
                                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                                        } else {
                                                            e.currentTarget.style.backgroundColor = '#002244';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (item.status === 'Hoàn thành') {
                                                            e.currentTarget.style.backgroundColor = '#ef4444';
                                                        } else {
                                                            e.currentTarget.style.backgroundColor = '#003366';
                                                        }
                                                    }}
                                                >
                                                    {item.status === 'Hoàn thành' ? (
                                                        <>
                                                            <i className="fas fa-undo"></i> Hoàn tác
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-check-double"></i> Đã xong
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LecturerDeadlineManagement;
