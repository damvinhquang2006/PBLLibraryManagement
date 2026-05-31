import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerDeadlineManagement = () => {
    const navigate = useNavigate();
    
    // Nhiệm vụ thống nhất hiện tại của cả lớp
    const [unifiedTaskName, setUnifiedTaskName] = useState("Hoàn thành chương 1, vẽ sơ đồ UML & thiết kế Database chi tiết");

    // Giả lập dữ liệu các nhóm với tiến độ hiện tại
    const [groupDeadlines, setGroupDeadlines] = useState([
        {
            id: 1,
            groupNumber: 1,
            topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên',
            memberCount: 3,
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * (24 * 3 + 5)),
            status: 'Chưa hoàn thành'
        },
        {
            id: 2,
            groupNumber: 2,
            topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh',
            memberCount: 2,
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * (24 * 8 + 12)),
            status: 'Chưa hoàn thành'
        },
        {
            id: 3,
            groupNumber: 3,
            topicName: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý',
            memberCount: 3,
            deadlineDate: new Date(new Date().getTime() - 1000 * 60 * 60 * (24 * 2)),
            status: 'Hoàn thành'
        },
        {
            id: 4,
            groupNumber: 4,
            topicName: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT',
            memberCount: 2,
            deadlineDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 18),
            status: 'Chưa hoàn thành'
        }
    ]);

    // Danh sách các nhiệm vụ cũ đã qua của lớp học
    const [pastTasks, setPastTasks] = useState([
        {
            id: 1,
            title: "Nghiên cứu tài liệu tham khảo & Viết đề xuất dự án",
            deadlineDate: "10/05/2026",
            groupStatuses: [
                { groupNumber: 1, topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên', status: 'Hoàn thành', completedDate: '08/05/2026' },
                { groupNumber: 2, topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh', status: 'Hoàn thành', completedDate: '09/05/2026' },
                { groupNumber: 3, topicName: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý', status: 'Hoàn thành', completedDate: '10/05/2026' },
                { groupNumber: 4, topicName: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT', status: 'Hoàn thành', completedDate: '10/05/2026' }
            ]
        },
        {
            id: 2,
            title: "Phân tích yêu cầu bài toán & Đặc tả SRS sơ bộ",
            deadlineDate: "20/05/2026",
            groupStatuses: [
                { groupNumber: 1, topicName: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên', status: 'Hoàn thành', completedDate: '18/05/2026' },
                { groupNumber: 2, topicName: 'Ứng dụng quản lý tài chính cá nhân thông minh', status: 'Hoàn thành', completedDate: '19/05/2026' },
                { groupNumber: 3, topicName: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý', status: 'Hoàn thành', completedDate: '20/05/2026' },
                { groupNumber: 4, topicName: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT', status: 'Chưa hoàn thành', completedDate: '—' }
            ]
        }
    ]);

    const [selectedPastTaskId, setSelectedPastTaskId] = useState(2);

    // ID của nhiệm vụ cũ đang được mở rộng dưới dạng Accordion
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const toggleExpandTask = (taskId) => {
        setExpandedTaskId(prev => prev === taskId ? null : taskId);
    };

    // Trạng thái modal Tạo Milestone
    const [showMilestoneModal, setShowMilestoneModal] = useState(false);
    const [newMilestone, setNewMilestone] = useState({
        title: '',
        deadline: ''
    });

    // Hàm tạo Milestone mới
    const handleCreateMilestoneSubmit = (e) => {
        e.preventDefault();
        if (!newMilestone.title || !newMilestone.deadline) {
            alert('Vui lòng điền đầy đủ tiêu đề nhiệm vụ và hạn chót!');
            return;
        }

        // 1. Đóng gói nhiệm vụ hiện tại thành 1 entry lịch sử cho cả lớp
        const archivedTask = {
            id: pastTasks.length + 1,
            title: unifiedTaskName,
            deadlineDate: groupDeadlines[0]?.deadlineDate.toLocaleDateString('vi-VN') || new Date().toLocaleDateString('vi-VN'),
            groupStatuses: groupDeadlines.map(g => ({
                groupNumber: g.groupNumber,
                topicName: g.topicName,
                status: g.status,
                completedDate: g.status === 'Hoàn thành' ? new Date().toLocaleDateString('vi-VN') : '—'
            }))
        };

        // 2. Thêm vào danh sách nhiệm vụ cũ và mở rộng nó ngay lập tức
        setPastTasks(prev => [...prev, archivedTask]);
        setExpandedTaskId(archivedTask.id);

        // 3. Cập nhật Nhiệm vụ thống nhất mới
        setUnifiedTaskName(newMilestone.title);

        // 4. Đặt lại hạn chót và trạng thái "Chưa hoàn thành" cho các nhóm đối với Milestone mới
        setGroupDeadlines(prev =>
            prev.map(g => ({
                ...g,
                deadlineDate: new Date(newMilestone.deadline),
                status: 'Chưa hoàn thành'
            }))
        );

        setShowMilestoneModal(false);
        setNewMilestone({ title: '', deadline: '' });
        alert('Tạo Milestone mới và cập nhật Deadline thành công!');
    };

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
                    <p style={{ color: '#666', marginTop: '5px' }}>Theo dõi chi tiết các nhiệm vụ mới nhất, thời gian hoàn thành và hạn chót của từng nhóm sinh viên (Hệ thống tự động cập nhật trạng thái khi sinh viên hoàn thành nộp báo cáo tiến độ)</p>
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

                {/* Khối Bảng điều khiển Milestone (Tách riêng biệt) */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '25px 30px', 
                    borderRadius: '16px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '30px',
                    borderLeft: '5px solid #003366'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ margin: 0, color: '#003366', fontSize: '1.15rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-flag-checkered" style={{ color: '#003366' }}></i>
                            Bảng điều khiển Milestone & Cột mốc lớp học
                        </h3>
                        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>Giao nhiệm vụ thống nhất và thiết lập hạn chót đồng loạt cho tất cả các nhóm sinh viên trong lớp học.</p>
                    </div>
                    <button 
                        onClick={() => setShowMilestoneModal(true)}
                        style={{
                            padding: '10px 24px', borderRadius: '8px', border: 'none',
                            backgroundColor: '#003366', color: 'white', fontWeight: 'bold',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                            fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,51,102,0.15)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002244'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003366'}
                    >
                        <i className="fas fa-plus-circle"></i> Thiết lập Milestone mới
                    </button>
                </div>

                {/* Khối danh sách dạng bảng */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: '#003366', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            Nhiệm vụ hiện tại: <span style={{ color: '#0066cc', fontStyle: 'italic' }}>"{unifiedTaskName}"</span>
                        </h3>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '950px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Nhóm số</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Tên đề tài</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Số lượng thành viên</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Deadline</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Trạng thái</th>
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
                                            <td style={{ padding: '15px', fontWeight: '600', color: '#334155', maxWidth: '380px' }}>
                                                {item.topicName}
                                            </td>
                                            
                                            {/* Cột 3: Số lượng thành viên */}
                                            <td style={{ padding: '15px', color: '#64748b' }}>
                                                {item.memberCount} thành viên
                                            </td>
                                            
                                            {/* Cột 4: Deadline có icon */}
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
                                            
                                            {/* Cột 5: Trạng thái có icon */}
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
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Khối Lịch sử nhiệm vụ dạng Accordion (Đóng/Mở linh hoạt) */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginTop: '40px' }}>
                    <div style={{ marginBottom: '25px', textAlign: 'left' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#003366', fontSize: '1.2rem', fontWeight: 'bold' }}>Lịch sử nhiệm vụ của Lớp học (Đã lưu trữ)</h3>
                        <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 20px 0' }}>Bấm chọn vào thanh tiêu đề của từng nhiệm vụ cũ dưới đây để mở rộng hoặc thu gọn chi tiết tiến độ mốc nộp bài của toàn bộ các nhóm.</p>
                    </div>

                    {/* Danh sách nhiệm vụ cũ dạng Accordion */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {pastTasks.map(task => {
                            const isExpanded = expandedTaskId === task.id;
                            return (
                                <div key={task.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    {/* Thanh tiêu đề đóng vai trò là button/span */}
                                    <span
                                        onClick={() => toggleExpandTask(task.id)}
                                        role="button"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '16px 24px',
                                            backgroundColor: isExpanded ? '#eef2ff' : '#f8fafc',
                                            border: isExpanded ? '1px solid #003366' : '1px solid #cbd5e1',
                                            borderRadius: isExpanded ? '12px 12px 0 0' : '12px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            color: '#003366',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.2s',
                                            userSelect: 'none',
                                            boxShadow: isExpanded ? '0 4px 10px rgba(0,51,102,0.05)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isExpanded) {
                                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                                                e.currentTarget.style.borderColor = '#003366';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isExpanded) {
                                                e.currentTarget.style.backgroundColor = '#f8fafc';
                                                e.currentTarget.style.borderColor = '#cbd5e1';
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                            <i className="fas fa-check-circle" style={{ color: isExpanded ? '#003366' : '#10b981' }}></i>
                                            <span style={{ fontSize: '0.95rem' }}>{task.title}</span>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b', backgroundColor: 'white', padding: '3px 10px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                                                Hạn chót: {task.deadlineDate}
                                            </span>
                                        </div>
                                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} style={{ color: '#003366', fontSize: '0.85rem' }}></i>
                                    </span>

                                    {/* Nội dung bảng tiến độ khi được mở rộng */}
                                    {isExpanded && (
                                        <div style={{ 
                                            overflowX: 'auto', 
                                            backgroundColor: '#ffffff', 
                                            borderRadius: '0 0 12px 12px', 
                                            padding: '20px 25px', 
                                            border: '1px solid #003366',
                                            borderTop: 'none',
                                            boxShadow: '0 6px 15px rgba(0,0,0,0.03)'
                                        }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '950px' }}>
                                                <thead>
                                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                                                        <th style={{ padding: '12px 15px', color: '#475569', fontWeight: 'bold' }}>Nhóm số</th>
                                                        <th style={{ padding: '12px 15px', color: '#475569', fontWeight: 'bold' }}>Tên đề tài</th>
                                                        <th style={{ padding: '12px 15px', color: '#475569', fontWeight: 'bold', textAlign: 'center' }}>Trạng thái mốc này</th>
                                                        <th style={{ padding: '12px 15px', color: '#475569', fontWeight: 'bold', textAlign: 'center' }}>Ngày hoàn thành</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {task.groupStatuses.map((gs, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                            <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#003366' }}>Nhóm {gs.groupNumber}</td>
                                                            <td style={{ padding: '12px 15px', color: '#334155', fontWeight: '500' }}>{gs.topicName}</td>
                                                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                                                <span style={{ 
                                                                    padding: '4px 12px', 
                                                                    borderRadius: '12px', 
                                                                    fontSize: '0.75rem', 
                                                                    fontWeight: 'bold',
                                                                    backgroundColor: gs.status === 'Hoàn thành' ? '#ecfdf5' : '#fffbeb', 
                                                                    color: gs.status === 'Hoàn thành' ? '#059669' : '#d97706'
                                                                }}>
                                                                    {gs.status}
                                                                </span>
                                                            </td>
                                                            <td style={{ padding: '12px 15px', textAlign: 'center', color: gs.status === 'Hoàn thành' ? '#059669' : '#64748b', fontWeight: '500' }}>
                                                                {gs.completedDate}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal Tạo Milestone mới */}
                {showMilestoneModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 10000,
                        backdropFilter: 'blur(5px)'
                    }}>
                        <div style={{
                            backgroundColor: 'white', padding: '35px 40px', borderRadius: '16px',
                            maxWidth: '550px', width: '90%', position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            textAlign: 'left'
                        }}>
                            <button 
                                onClick={() => setShowMilestoneModal(false)} 
                                style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
                            >✕</button>

                            <h3 style={{ color: '#003366', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fas fa-flag" style={{ color: '#003366' }}></i>
                                Tạo Milestone mới cho Lớp học
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.5' }}>
                                Khi tạo Milestone mới, nhiệm vụ cũ hiện tại sẽ tự động được đóng lại và lưu trữ vào Lịch sử nhiệm vụ. Hạn chót mới sẽ được áp dụng cho toàn bộ các nhóm.
                            </p>

                            <form onSubmit={handleCreateMilestoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 'bold', color: '#334155', marginBottom: '6px', fontSize: '0.9rem' }}>Tên nhiệm vụ Milestone mới *</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ví dụ: Thiết kế sơ đồ chi tiết, đặc tả API và cài đặt Database Schema..."
                                        value={newMilestone.title}
                                        onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                                        required
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: 'bold', color: '#334155', marginBottom: '6px', fontSize: '0.9rem' }}>Ngày hạn chót (Deadline) *</label>
                                    <input 
                                        type="datetime-local" 
                                        value={newMilestone.deadline}
                                        onChange={(e) => setNewMilestone({...newMilestone, deadline: e.target.value})}
                                        required
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box', backgroundColor: 'white' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button 
                                        type="button"
                                        onClick={() => setShowMilestoneModal(false)}
                                        style={{ 
                                            padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1',
                                            backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'
                                        }}
                                    >Hủy bỏ</button>
                                    <button 
                                        type="submit"
                                        style={{ 
                                            padding: '10px 24px', borderRadius: '8px', border: 'none',
                                            backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                        }}
                                    >Xác nhận tạo</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LecturerDeadlineManagement;
