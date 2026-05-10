import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerTopicManagement = () => {
    const navigate = useNavigate();
    
    // Data giả lập đề tài với thông tin deadline
    const [topics, setTopics] = useState([
        { 
            id: 1, 
            name: 'Hệ thống nhận diện khuôn mặt', 
            limit: 3, 
            registered: 2, 
            status: 'Đang mở',
            deadlines: { completed: 13, total: 14 }
        },
        { 
            id: 2, 
            name: 'Ứng dụng quản lý tài chính cá nhân', 
            limit: 2, 
            registered: 2, 
            status: 'Đã đầy',
            deadlines: { completed: 10, total: 14 }
        },
    ]);

    const handleCheckDeadlines = (topic) => {
        alert(`Các deadline còn lại của đề tài "${topic.name}":\n- Báo cáo tuần 13\n- File code cuối kỳ`);
    };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f4f7fe' }}>
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-chalkboard-teacher" style={{ fontSize: '24px' }}></i>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Quản lý Đề tài PBL</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Hệ thống hướng dẫn & đánh giá</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="back-btn" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                </button>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div className="welcome-text" style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#003366', fontSize: '1.8rem' }}>Danh sách đề tài PBL hướng dẫn</h2>
                    <p style={{ color: '#666' }}>Quản lý tiến độ và phân chia nhóm thực hiện</p>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: '#003366', fontSize: '1.2rem' }}>Thông tin chi tiết</h3>
                        <button className="btn blue" style={{ width: 'auto', padding: '10px 20px' }}>+ Thêm đề tài mới</button>
                    </div>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                <th style={{ padding: '15px', color: '#64748b' }}>Tên đề tài</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Số lượng nhóm</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Deadline hoàn thành</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Trạng thái</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map(topic => (
                                <tr key={topic.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                    <td style={{ padding: '15px', fontWeight: '600', color: '#334155' }}>{topic.name}</td>
                                    <td style={{ padding: '15px', color: '#64748b' }}>{topic.registered} / {topic.limit}</td>
                                    <td style={{ padding: '15px' }}>
                                        <button 
                                            onClick={() => handleCheckDeadlines(topic)}
                                            style={{ 
                                                padding: '6px 12px', 
                                                borderRadius: '6px', 
                                                border: '1px solid #003366', 
                                                backgroundColor: '#eef2ff', 
                                                color: '#003366', 
                                                fontSize: '0.85rem', 
                                                fontWeight: 'bold', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            {topic.deadlines.completed}/{topic.deadlines.total} hoàn thành
                                        </button>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ 
                                            padding: '4px 12px', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            backgroundColor: topic.status === 'Đang mở' ? '#ecfdf5' : '#fff1f2', 
                                            color: topic.status === 'Đang mở' ? '#059669' : '#e11d48', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {topic.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button style={{ border: 'none', background: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '1.1rem' }}><i className="fas fa-edit"></i></button>
                                            <button style={{ border: 'none', background: 'none', color: '#e11d48', cursor: 'pointer', fontSize: '1.1rem' }}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default LecturerTopicManagement;
