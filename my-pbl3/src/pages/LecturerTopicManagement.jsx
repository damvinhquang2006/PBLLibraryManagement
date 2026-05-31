import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerTopicManagement = () => {
    const navigate = useNavigate();
    
    // Quản lý Tab: 'de-tai-list' | 'doi-de-tai'
    const [activeTab, setActiveTab] = useState('de-tai-list');

    // Toast Alert State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    // Mock data Danh sách đề tài giảng viên đã tạo
    const [topics, setTopics] = useState([
        { 
            id: 'T01', 
            name: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên', 
            description: 'Xây dựng ứng dụng điểm danh sinh viên tự động sử dụng thư viện OpenCV, face_recognition và mô hình học sâu. Hỗ trợ kết nối Camera IP, lưu trữ lịch sử điểm danh và xuất file báo cáo Excel.',
            status: 'TAKEN', 
            groupId: 1, 
            groupNumber: 1,
            changeRequested: true, // Giả lập sẵn 1 yêu cầu đổi từ sinh viên để GV duyệt thử
            changeReason: 'Nhóm muốn đổi sang đề tài liên quan đến Big Data/AI Chatbot vì muốn phát triển thêm kỹ năng xử lý ngôn ngữ tự nhiên.'
        },
        { 
            id: 'T02', 
            name: 'Ứng dụng quản lý tài chính cá nhân thông minh', 
            description: 'Phát triển ứng dụng giúp quản lý thu nhập, chi tiêu, đặt mục tiêu tiết kiệm và phân tích biểu đồ tài chính trực quan. Tích hợp AI gợi ý phân bổ ngân sách thông minh theo phương pháp 50/30/20.',
            status: 'TAKEN', 
            groupId: 2, 
            groupNumber: 2,
            changeRequested: false 
        },
        { 
            id: 'T03', 
            name: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý', 
            description: 'Xây dựng website thương mại điện tử hoàn chỉnh với giỏ hàng, cổng thanh toán và quản trị sản phẩm. Sử dụng thuật toán lọc cộng tác (Collaborative Filtering) để gợi ý sản phẩm phù hợp với thói quen mua sắm của từng khách hàng.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        },
        { 
            id: 'T04', 
            name: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT', 
            description: 'Hệ thống chatbot thông minh dựa trên mô hình ngôn ngữ lớn (RAG) giúp trả lời tự động các câu hỏi về thông tin tuyển sinh, ngành học, điểm chuẩn và học phí của trường Đại học Bách khoa.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        },
        { 
            id: 'T05', 
            name: 'Hệ thống quản lý thư viện số trường đại học', 
            description: 'Ứng dụng hỗ trợ mượn/trả sách, tra cứu tài liệu học tập số trực tuyến, tích hợp thẻ thành viên QR code và gửi email thông báo tự động khi sách đến hạn trả.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        }
    ]);

    // Mock data thành viên các nhóm để xem chi tiết
    const [groups, setGroups] = useState([
        { 
            id: 1, 
            groupNumber: 1,
            members: [
                { id: '102220123', fullName: 'Nguyễn Như Quỳnh', email: 'quynh.nn@sv.dut.udn.vn', homeClass: '22T_DT2' },
                { id: '102220456', fullName: 'Lê Văn An', email: 'an.lv@sv.dut.udn.vn', homeClass: '22T_DT2' },
                { id: '102220789', fullName: 'Trần Minh Hải', email: 'hai.tm@sv.dut.udn.vn', homeClass: '22T_DT2' }
            ]
        },
        { 
            id: 2, 
            groupNumber: 2,
            members: [
                { id: '102210111', fullName: 'Phạm Hoàng Nam', email: 'nam.ph@sv.dut.udn.vn', homeClass: '21T_DT1' },
                { id: '102210222', fullName: 'Lê Thị Thu Thảo', email: 'thao.ltt@sv.dut.udn.vn', homeClass: '21T_DT1' }
            ]
        }
    ]);

    // Trạng thái modal
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedTopicDetail, setSelectedTopicDetail] = useState(null);

    // Dữ liệu form tạo đề tài mới
    const [newTopic, setNewTopic] = useState({ name: '', description: '' });

    // Xử lý tạo đề tài
    const handleCreateTopic = (e) => {
        e.preventDefault();
        if (!newTopic.name.trim() || !newTopic.description.trim()) {
            showToast('Vui lòng nhập đầy đủ thông tin đề tài!', 'error');
            return;
        }

        const newId = `T0${topics.length + 1}`;
        const topicToAdd = {
            id: newId,
            name: newTopic.name.trim(),
            description: newTopic.description.trim(),
            status: 'AVAILABLE',
            groupId: null,
            groupNumber: null,
            changeRequested: false
        };

        setTopics([topicToAdd, ...topics]);
        setNewTopic({ name: '', description: '' });
        setIsCreateModalOpen(false);
        showToast('Thêm đề tài mới thành công!');
    };

    // Xử lý duyệt yêu cầu đổi đề tài
    const handleApproveChange = (topicId) => {
        setTopics(prevTopics => 
            prevTopics.map(t => {
                if (t.id === topicId) {
                    return {
                        ...t,
                        status: 'AVAILABLE',
                        groupId: null,
                        groupNumber: null,
                        changeRequested: false,
                        changeReason: ''
                    };
                }
                return t;
            })
        );
        showToast('Đã duyệt yêu cầu đổi đề tài! Đề tài cũ trở lại trạng thái Trống.');
    };

    // Xử lý từ chối yêu cầu đổi đề tài
    const handleRejectChange = (topicId) => {
        setTopics(prevTopics => 
            prevTopics.map(t => {
                if (t.id === topicId) {
                    return {
                        ...t,
                        changeRequested: false,
                        changeReason: ''
                    };
                }
                return t;
            })
        );
        showToast('Đã từ chối yêu cầu đổi đề tài của nhóm.', 'error');
    };

    // Xóa đề tài (nếu chưa có nhóm chọn)
    const handleDeleteTopic = (topicId) => {
        const topic = topics.find(t => t.id === topicId);
        if (topic.status === 'TAKEN') {
            showToast('Không thể xóa đề tài đã được nhóm sinh viên đăng ký!', 'error');
            return;
        }
        setTopics(prevTopics => prevTopics.filter(t => t.id !== topicId));
        showToast('Đã xóa đề tài khỏi danh sách.');
    };

    // Tìm thông tin nhóm bằng Group Number
    const handleOpenGroupDetails = (groupNum) => {
        const found = groups.find(g => g.groupNumber === groupNum);
        if (found) {
            setSelectedGroup(found);
        } else {
            // Giả lập tạo dữ liệu nhóm mới nếu chưa có trong mock gốc
            const mockNewGroup = {
                id: groupNum,
                groupNumber: groupNum,
                members: [
                    { id: `102220${groupNum}1`, fullName: `Sinh viên A nhóm ${groupNum}`, email: `sv${groupNum}1@sv.dut.udn.vn`, homeClass: '22T_CLC2' },
                    { id: `102220${groupNum}2`, fullName: `Sinh viên B nhóm ${groupNum}`, email: `sv${groupNum}2@sv.dut.udn.vn`, homeClass: '22T_CLC2' }
                ]
            };
            setSelectedGroup(mockNewGroup);
        }
    };

    // Lọc danh sách yêu cầu đổi
    const changeRequests = topics.filter(t => t.changeRequested);

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f4f7fe', position: 'relative' }}>
            
            {/* Custom Premium Toast */}
            {toast.show && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: toast.type === 'success' ? '#10b981' : '#f43f5e',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 9999,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
                    {toast.message}
                </div>
            )}

            {/* Header đồng bộ */}
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-project-diagram" style={{ fontSize: '24px' }}></i>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>Quản lý Đề tài PBL</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Hệ thống hướng dẫn & đánh giá đề tài</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="back-btn" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'transparent' }}>
                    <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                </button>
            </header>

            {/* Container chính */}
            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                
                {/* Tiêu đề căn lề trái đồng bộ */}
                <div className="welcome-text" style={{ marginBottom: '30px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h2 style={{ color: '#003366', fontSize: '1.8rem', fontWeight: 'bold' }}>Hệ thống đề tài đăng ký từ sinh viên</h2>
                        <p style={{ color: '#666', marginTop: '5px' }}>Tạo đề tài hướng dẫn và duyệt các yêu cầu đổi đề tài của nhóm sinh viên</p>
                    </div>
                    
                    {/* Nút Tạo đề tài nổi bật góc phải */}
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#003366',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 10px rgba(0,51,102,0.2)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#002244';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#003366';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <i className="fas fa-plus"></i> Tạo đề tài mới
                    </button>
                </div>

                {/* Tab Menu - Thiết kế Premium */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
                    <button
                        onClick={() => setActiveTab('de-tai-list')}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: activeTab === 'de-tai-list' ? '#003366' : '#64748b',
                            borderBottom: activeTab === 'de-tai-list' ? '3px solid #003366' : '3px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-list-ul"></i> Danh sách đề tài đã tạo ({topics.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('doi-de-tai')}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: activeTab === 'doi-de-tai' ? '#e11d48' : '#64748b',
                            borderBottom: activeTab === 'doi-de-tai' ? '3px solid #e11d48' : '3px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-exchange-alt"></i> Yêu cầu đổi đề tài 
                        {changeRequests.length > 0 && (
                            <span style={{
                                backgroundColor: '#e11d48',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {changeRequests.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* NỘI DUNG TAB 1: DANH SÁCH ĐỀ TÀI */}
                {activeTab === 'de-tai-list' && (
                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                        <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '80px' }}>Mã số</th>
                                        <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '300px' }}>Tên đề tài</th>
                                        <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '150px', textAlign: 'center' }}>Trạng thái</th>
                                        <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '180px', textAlign: 'center' }}>Nhóm đăng ký</th>
                                        <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '180px', textAlign: 'center' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topics.map(topic => (
                                        <tr key={topic.id} style={{ borderBottom: '1px solid #f4f7fe', transition: 'background-color 0.2s' }}>
                                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#64748b' }}>
                                                {topic.id}
                                            </td>
                                            <td style={{ padding: '15px', textAlign: 'left' }}>
                                                <div style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>{topic.name}</div>
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: '#64748b',
                                                    marginTop: '4px',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '450px',
                                                    cursor: 'pointer'
                                                }} onClick={() => setSelectedTopicDetail(topic)}>
                                                    {topic.description} <strong style={{ color: '#003366' }}>[Xem chi tiết]</strong>
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <span style={{ 
                                                    padding: '6px 14px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.8rem', 
                                                    backgroundColor: topic.status === 'AVAILABLE' ? '#ecfdf5' : '#f1f5f9', 
                                                    color: topic.status === 'AVAILABLE' ? '#059669' : '#64748b', 
                                                    fontWeight: 'bold',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <i className={topic.status === 'AVAILABLE' ? 'fas fa-check-circle' : 'fas fa-user-lock'}></i>
                                                    {topic.status === 'AVAILABLE' ? 'Sẵn sàng' : 'Đã có nhóm'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                {topic.status === 'TAKEN' ? (
                                                    <button 
                                                        onClick={() => handleOpenGroupDetails(topic.groupNumber)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#003366',
                                                            fontWeight: 'bold',
                                                            textDecoration: 'underline',
                                                            cursor: 'pointer',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        Nhóm {topic.groupNumber} (Xem)
                                                    </button>
                                                ) : (
                                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Chưa đăng ký</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <button 
                                                    onClick={() => handleDeleteTopic(topic.id)}
                                                    disabled={topic.status === 'TAKEN'}
                                                    style={{ 
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        backgroundColor: '#f43f5e',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        cursor: topic.status === 'TAKEN' ? 'not-allowed' : 'pointer',
                                                        fontSize: '0.85rem',
                                                        opacity: topic.status === 'TAKEN' ? 0.4 : 1,
                                                        transition: 'all 0.2s',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    onMouseEnter={(e) => { if(topic.status !== 'TAKEN') e.currentTarget.style.backgroundColor = '#e11d48'; }}
                                                    onMouseLeave={(e) => { if(topic.status !== 'TAKEN') e.currentTarget.style.backgroundColor = '#f43f5e'; }}
                                                >
                                                    <i className="fas fa-trash-alt"></i> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* NỘI DUNG TAB 2: PHÊ DUYỆT ĐỔI ĐỀ TÀI */}
                {activeTab === 'doi-de-tai' && (
                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                            <h3 style={{ margin: 0, color: '#003366', fontSize: '1.2rem', fontWeight: 'bold' }}>Danh sách yêu cầu đổi đề tài đang chờ duyệt</h3>
                            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>Giảng viên duyệt yêu cầu đổi đề tài để giải phóng nhóm khỏi đề tài hiện tại</p>
                        </div>

                        {changeRequests.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
                                <i className="fas fa-folder-open" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                <p style={{ fontSize: '1.1rem', margin: 0 }}>Không có yêu cầu đổi đề tài nào đang chờ duyệt</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                            <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '120px' }}>Nhóm gửi</th>
                                            <th style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>Đề tài hiện tại</th>
                                            <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '350px' }}>Lý do đổi đề tài</th>
                                            <th style={{ padding: '15px', color: '#64748b', fontWeight: '600', width: '220px', textAlign: 'center' }}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {changeRequests.map(req => (
                                            <tr key={req.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                                <td style={{ padding: '15px', fontWeight: 'bold', color: '#003366' }}>
                                                    <button 
                                                        onClick={() => handleOpenGroupDetails(req.groupNumber)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#003366',
                                                            fontWeight: 'bold',
                                                            textDecoration: 'underline',
                                                            cursor: 'pointer',
                                                            padding: 0
                                                        }}
                                                    >
                                                        Nhóm {req.groupNumber}
                                                    </button>
                                                </td>
                                                <td style={{ padding: '15px', fontWeight: '600', color: '#334155', textAlign: 'left' }}>
                                                    {req.name}
                                                </td>
                                                <td style={{ padding: '15px', color: '#dc2626', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left', lineHeight: '1.4' }}>
                                                    "{req.changeReason || 'Không cung cấp lý do cụ thể.'}"
                                                </td>
                                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                        <button 
                                                            onClick={() => handleApproveChange(req.id)}
                                                            style={{ 
                                                                padding: '8px 16px',
                                                                borderRadius: '6px',
                                                                border: 'none',
                                                                backgroundColor: '#10b981',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '5px',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                                                        >
                                                            <i className="fas fa-check"></i> Duyệt đổi
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRejectChange(req.id)}
                                                            style={{ 
                                                                padding: '8px 16px',
                                                                borderRadius: '6px',
                                                                border: 'none',
                                                                backgroundColor: '#f43f5e',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '5px',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e11d48'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f43f5e'}
                                                        >
                                                            <i className="fas fa-ban"></i> Từ chối
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

            </main>

            {/* MODAL TẠO ĐỀ TÀI MỚI (PREMIUM) */}
            {isCreateModalOpen && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setIsCreateModalOpen(false); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(6px)', animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '35px 40px', borderRadius: '16px',
                        maxWidth: '600px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        animation: 'scaleUp 0.2s ease-out'
                    }}>
                        <button 
                            onClick={() => setIsCreateModalOpen(false)} 
                            style={{ 
                                position: 'absolute', top: '20px', right: '25px', 
                                border: 'none', background: 'none', fontSize: '1.5rem', 
                                cursor: 'pointer', color: '#94a3b8' 
                            }}
                        >✕</button>
                        
                        <h3 style={{ color: '#003366', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'left' }}>
                            <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i>
                            Thêm Đề Tài PBL Mới
                        </h3>
                        
                        <form onSubmit={handleCreateTopic} style={{ textAlign: 'left' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', color: '#334155', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    Tên đề tài <span style={{ color: '#e11d48' }}>*</span>
                                </label>
                                <input 
                                    type="text"
                                    value={newTopic.name}
                                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                                    placeholder="Ví dụ: Website quản lý thư viện số tích hợp AI..."
                                    style={{
                                        width: '100%', padding: '12px 15px', borderRadius: '8px',
                                        border: '1px solid #cbd5e1', fontSize: '0.95rem',
                                        outline: 'none', boxSizing: 'border-box'
                                    }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', color: '#334155', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    Mô tả đề tài chi tiết <span style={{ color: '#e11d48' }}>*</span>
                                </label>
                                <textarea 
                                    rows="5"
                                    value={newTopic.description}
                                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                                    placeholder="Nhập yêu cầu kỹ thuật, công nghệ sử dụng, và mục tiêu đầu ra của đề tài..."
                                    style={{
                                        width: '100%', padding: '12px 15px', borderRadius: '8px',
                                        border: '1px solid #cbd5e1', fontSize: '0.95rem',
                                        outline: 'none', boxSizing: 'border-box', resize: 'vertical'
                                    }}
                                    required
                                ></textarea>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button 
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
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
                                >Tạo đề tài</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL XEM CHI TIẾT ĐỀ TÀI */}
            {selectedTopicDetail && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedTopicDetail(null); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '30px 40px', borderRadius: '16px',
                        maxWidth: '650px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'left'
                    }}>
                        <button 
                            onClick={() => setSelectedTopicDetail(null)} 
                            style={{ 
                                position: 'absolute', top: '20px', right: '25px', 
                                border: 'none', background: 'none', fontSize: '1.5rem', 
                                cursor: 'pointer', color: '#94a3b8' 
                            }}
                        >✕</button>
                        
                        <span style={{
                            backgroundColor: '#eef2ff', color: '#003366', fontWeight: 'bold',
                            padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem',
                            textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                            Đề tài: {selectedTopicDetail.id}
                        </span>
                        
                        <h3 style={{ color: '#003366', fontSize: '1.3rem', fontWeight: 'bold', marginTop: '12px', marginBottom: '15px' }}>
                            {selectedTopicDetail.name}
                        </h3>
                        
                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '20px' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#334155', fontSize: '0.95rem', marginBottom: '8px' }}>Mô tả đề tài:</h4>
                            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                                {selectedTopicDetail.description}
                            </p>
                        </div>

                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            backgroundColor: '#f8fafc',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                Trạng thái: 
                                <strong style={{ 
                                    color: selectedTopicDetail.status === 'AVAILABLE' ? '#059669' : '#003366', 
                                    marginLeft: '5px' 
                                }}>
                                    {selectedTopicDetail.status === 'AVAILABLE' ? 'Sẵn sàng' : 'Đã đăng ký'}
                                </strong>
                            </span>
                            
                            {selectedTopicDetail.status === 'TAKEN' && (
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                    Nhóm: <strong style={{ color: '#003366' }}>Nhóm {selectedTopicDetail.groupNumber}</strong>
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setSelectedTopicDetail(null)}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Đóng lại</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL CHI TIẾT THÀNH VIÊN NHÓM */}
            {selectedGroup && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedGroup(null); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '30px 40px', borderRadius: '16px',
                        maxWidth: '750px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}>
                        <button 
                            onClick={() => setSelectedGroup(null)} 
                            style={{ 
                                position: 'absolute', top: '20px', right: '25px', 
                                border: 'none', background: 'none', fontSize: '1.5rem', 
                                cursor: 'pointer', color: '#94a3b8' 
                            }}
                        >✕</button>
                        
                        <h2 style={{ color: '#003366', marginBottom: '8px', fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'left' }}>
                            Thông tin thành viên Nhóm {selectedGroup.groupNumber}
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.95rem', textAlign: 'left' }}>
                            Lớp học phần PBL: <strong style={{ color: '#1e293b' }}>PBL-CNPM-2025</strong>
                        </p>
                        
                        <div style={{ overflowX: 'auto', marginBottom: '25px', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Mã SV</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Họ và tên</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Email</th>
                                        <th style={{ padding: '12px 15px', fontSize: '0.85rem' }}>Lớp sinh hoạt</th>
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
                                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerTopicManagement;
