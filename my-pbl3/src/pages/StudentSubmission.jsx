import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSubmission = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('Chưa nộp'); // 'Chưa nộp' | 'Đã nộp'

    const handleUpload = () => {
        if (!file) return alert('Vui lòng chọn tệp tin!');
        setStatus('Đã nộp');
        alert('Nộp báo cáo thành công!');
    };

    return (
        <div style={{ padding: '40px', backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
            <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>← Quay lại</button>
            
            <h1 style={{ color: '#003366', marginBottom: '30px' }}>Nộp báo cáo PBL cuối kỳ</h1>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '30px', padding: '20px', borderRadius: '12px', backgroundColor: status === 'Đã nộp' ? '#e6f4ea' : '#fff8e6', color: status === 'Đã nộp' ? '#1e8e3e' : '#d97706', fontWeight: 'bold', textAlign: 'center' }}>
                    Trạng thái: {status}
                </div>

                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '15px', padding: '50px', textAlign: 'center', backgroundColor: '#f8f9fa', marginBottom: '30px' }}>
                    <i className="bi bi-cloud-arrow-up" style={{ fontSize: '3rem', color: '#64748b' }}></i>
                    <h3 style={{ margin: '15px 0 5px' }}>Chọn tệp báo cáo của bạn</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Hỗ trợ PDF, DOCX, ZIP (Tối đa 50MB)</p>
                    <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        style={{ marginTop: '20px', display: 'block', margin: '20px auto' }} 
                    />
                    {file && <div style={{ color: '#003366', fontWeight: 'bold' }}>Tệp đã chọn: {file.name}</div>}
                </div>

                <button 
                    onClick={handleUpload}
                    disabled={status === 'Đã nộp'}
                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: status === 'Đã nộp' ? '#cbd5e1' : '#003366', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {status === 'Đã nộp' ? 'Đã hoàn thành nộp bài' : 'Xác nhận nộp báo cáo'}
                </button>
            </div>
        </div>
    );
};

export default StudentSubmission;
