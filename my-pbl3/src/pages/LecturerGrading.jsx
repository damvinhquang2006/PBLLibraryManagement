import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const LecturerGrading = () => {
    const navigate = useNavigate();
    
    // Data giả lập nhóm và nộp bài
    const [groups, setGroups] = useState([
        { 
            id: 1, 
            name: 'Nhóm Alphas', 
            members: 'Nguyễn Văn A, Lê Thị B', 
            status: 'Đã nộp',
            submissionLink: 'https://github.com/pbl3/alphas-project',
            processScore: 8.5, 
            finalScore: 9.0,
            feedback: 'Dự án hoàn thiện tốt, giao diện đẹp.'
        },
        { 
            id: 2, 
            name: 'Nhóm Beta', 
            members: 'Trần Văn C, Phạm Thị D', 
            status: 'Chưa nộp',
            submissionLink: null,
            processScore: 7.0, 
            finalScore: 0,
            feedback: ''
        },
    ]);

    const handleSave = (id) => {
        alert('Đã lưu điểm và nhận xét cho nhóm!');
    };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f4f7fe' }}>
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-star" style={{ fontSize: '24px' }}></i>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Đánh giá & Quản lý Điểm</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Chấm điểm tiến độ và báo cáo cuối kỳ</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="back-btn" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                </button>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div className="welcome-text" style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#003366', fontSize: '1.8rem' }}>Bảng điểm chi tiết & Đánh giá báo cáo</h2>
                    <p style={{ color: '#666' }}>Theo dõi bài nộp và thực hiện chấm điểm trực tiếp</p>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f7fe' }}>
                                <th style={{ padding: '15px', color: '#64748b' }}>Tên nhóm & Thành viên</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Trạng thái</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Bài làm</th>
                                <th style={{ padding: '15px', color: '#64748b', width: '100px' }}>Điểm QT</th>
                                <th style={{ padding: '15px', color: '#64748b', width: '100px' }}>Điểm CK</th>
                                <th style={{ padding: '15px', color: '#64748b' }}>Đánh giá & Nhận xét</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group => (
                                <tr key={group.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#334155' }}>{group.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{group.members}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ 
                                            padding: '4px 12px', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            backgroundColor: group.status === 'Đã nộp' ? '#ecfdf5' : '#fff1f2', 
                                            color: group.status === 'Đã nộp' ? '#059669' : '#e11d48', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {group.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        {group.submissionLink ? (
                                            <a href={group.submissionLink} target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '0.9rem' }}>
                                                <i className="fas fa-external-link-alt"></i> Xem bài nộp
                                            </a>
                                        ) : (
                                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Chưa có file</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <input type="number" defaultValue={group.processScore} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #dce3ec', outline: 'none' }} />
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <input type="number" defaultValue={group.finalScore} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #dce3ec', outline: 'none' }} />
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <textarea 
                                                placeholder="Nhập nhận xét..."
                                                defaultValue={group.feedback}
                                                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #dce3ec', fontSize: '0.85rem', minHeight: '40px', outline: 'none', resize: 'vertical' }}
                                            />
                                            <button 
                                                onClick={() => handleSave(group.id)}
                                                className="btn blue" 
                                                style={{ width: 'auto', padding: '8px 15px', fontSize: '0.8rem' }}
                                            >
                                                Lưu
                                            </button>
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

export default LecturerGrading;
