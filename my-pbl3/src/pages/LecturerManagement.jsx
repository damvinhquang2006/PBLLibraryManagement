import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LecturerManagement = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('topics'); // 'topics' | 'grading'

    // Data giả lập đề tài
    const [topics, setTopics] = useState([
        { id: 1, name: 'Hệ thống nhận diện khuôn mặt', limit: 3, registered: 2, status: 'Đang mở' },
        { id: 2, name: 'Ứng dụng quản lý tài chính cá nhân', limit: 2, registered: 2, status: 'Đã đầy' },
    ]);

    // Data giả lập điểm số và nhóm
    const [groups, setGroups] = useState([
        { id: 1, name: 'Nhóm Alphas', members: 'Nguyễn Văn A, Lê Thị B', processScore: 8.5, finalScore: 9.0, nominated: false },
        { id: 2, name: 'Nhóm Beta', members: 'Trần Văn C, Phạm Thị D', processScore: 7.0, finalScore: 8.0, nominated: false },
    ]);

    const toggleNomination = (id) => {
        setGroups(groups.map(g => g.id === id ? { ...g, nominated: !g.nominated } : g));
        alert('Đã cập nhật trạng thái đề cử xuất bản!');
    };

    return (
        <div style={{ padding: '40px', backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
            <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>← Quay lại</button>
            
            <h1 style={{ color: '#003366', marginBottom: '30px' }}>Quản lý Lớp học PBL</h1>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', backgroundColor: '#fff', padding: '10px', borderRadius: '15px', width: 'fit-content', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <button 
                    onClick={() => setActiveTab('topics')}
                    style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', backgroundColor: activeTab === 'topics' ? '#003366' : 'transparent', color: activeTab === 'topics' ? '#fff' : '#64748b', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    <i className="bi bi-journal-text"></i> Quản lý Đề tài
                </button>
                <button 
                    onClick={() => setActiveTab('grading')}
                    style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', backgroundColor: activeTab === 'grading' ? '#003366' : 'transparent', color: activeTab === 'grading' ? '#fff' : '#64748b', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    <i className="bi bi-star"></i> Đánh giá & Quản lý Điểm
                </button>
            </div>

            {/* Content: Quản lý Đề tài */}
            {activeTab === 'topics' && (
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: '#003366' }}>Danh sách đề tài PBL</h3>
                        <button style={{ backgroundColor: '#003366', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Thêm đề tài mới</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                <th style={{ padding: '15px' }}>Tên đề tài</th>
                                <th style={{ padding: '15px' }}>Số lượng nhóm</th>
                                <th style={{ padding: '15px' }}>Trạng thái</th>
                                <th style={{ padding: '15px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map(topic => (
                                <tr key={topic.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                    <td style={{ padding: '15px', fontWeight: '500' }}>{topic.name}</td>
                                    <td style={{ padding: '15px' }}>{topic.registered} / {topic.limit}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: topic.status === 'Đang mở' ? '#e6f4ea' : '#fff1f2', color: topic.status === 'Đang mở' ? '#1e8e3e' : '#e11d48', fontWeight: 'bold' }}>
                                            {topic.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button style={{ marginRight: '10px', border: 'none', background: 'none', color: '#0066cc', cursor: 'pointer' }}><i className="bi bi-pencil"></i></button>
                                        <button style={{ border: 'none', background: 'none', color: '#e11d48', cursor: 'pointer' }}><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Content: Đánh giá & Điểm */}
            {activeTab === 'grading' && (
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '25px', color: '#003366' }}>Bảng điểm chi tiết các nhóm</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                <th style={{ padding: '15px' }}>Tên nhóm & Thành viên</th>
                                <th style={{ padding: '15px' }}>Điểm quá trình</th>
                                <th style={{ padding: '15px' }}>Điểm cuối kỳ</th>
                                <th style={{ padding: '15px' }}>Đề cử xuất bản</th>
                                <th style={{ padding: '15px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group => (
                                <tr key={group.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{group.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{group.members}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}><input type="number" defaultValue={group.processScore} style={{ width: '60px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }} /></td>
                                    <td style={{ padding: '15px' }}><input type="number" defaultValue={group.finalScore} style={{ width: '60px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }} /></td>
                                    <td style={{ padding: '15px' }}>
                                        <button 
                                            onClick={() => toggleNomination(group.id)}
                                            style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: group.nominated ? '#d97706' : '#cbd5e1' }}
                                        >
                                            <i className={group.nominated ? "bi bi-award-fill" : "bi bi-award"}></i>
                                        </button>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button style={{ backgroundColor: '#1e8e3e', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Lưu điểm</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '10px', color: '#003366', fontSize: '0.9rem' }}>
                        <i className="bi bi-info-circle-fill"></i> Những nhóm được <strong>đề cử xuất bản</strong> sẽ hiển thị tại danh sách chờ duyệt của Admin để đưa vào Thư viện PBL.
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerManagement;
