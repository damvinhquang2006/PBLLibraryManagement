import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentResults = () => {
    const navigate = useNavigate();

    const currentResult = {
        name: 'Hệ thống quản lý thư viện',
        processScore: 8.5,
        finalScore: 9.0,
        lecturerReview: 'Dự án hoàn thiện tốt, sinh viên nắm vững kiến thức. Cần cải thiện giao diện mobile.',
        status: 'Hoàn thành'
    };

    const history = [
        { semester: 'Kỳ 1 - 2023', name: 'Lập trình ứng dụng Web', score: 8.8 },
        { semester: 'Kỳ 2 - 2023', name: 'Cấu trúc dữ liệu & Giải thuật', score: 7.5 },
    ];

    return (
        <div style={{ padding: '40px', backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
            <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>← Quay lại</button>
            
            <h1 style={{ color: '#003366', marginBottom: '30px' }}>Kết quả đánh giá PBL</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Kỳ hiện tại */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#003366', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Học kỳ hiện tại</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.9rem', color: '#888' }}>Tên đồ án</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{currentResult.name}</div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Điểm quá trình</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#003366' }}>{currentResult.processScore}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Điểm cuối kỳ</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e8e3e' }}>{currentResult.finalScore}</div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#003366' }}>Nhận xét của Giảng viên:</div>
                        <p style={{ margin: 0, color: '#555', fontStyle: 'italic' }}>"{currentResult.lecturerReview}"</p>
                    </div>
                </div>

                {/* Lịch sử */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#003366', marginBottom: '20px' }}>Lịch sử PBL</h3>
                    {history.map((item, idx) => (
                        <div key={idx} style={{ padding: '15px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ fontSize: '0.8rem', color: '#0066cc', fontWeight: 'bold' }}>{item.semester}</div>
                            <div style={{ fontWeight: '500', color: '#333', margin: '5px 0' }}>{item.name}</div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Kết quả: <strong style={{ color: '#333' }}>{item.score}</strong></div>
                        </div>
                    ))}
                    <button style={{ width: '100%', marginTop: '20px', padding: '10px', border: '1px dashed #003366', borderRadius: '8px', color: '#003366', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        Xem tất cả lịch sử
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentResults;
