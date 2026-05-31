import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const StudentResults = () => {
    const navigate = useNavigate();

    // Bộ dữ liệu đồ án mẫu đầy đủ 7 thuộc tính & nhận xét chi tiết
    const currentResult = {
        semester: 'Học kỳ II - 2025/2026',
        name: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên',
        processScore: 8.8,
        finalScore: 9.2,
        overallScore: 9.0,
        lecturer: 'TS. Nguyễn Văn A',
        lecturerReview: 'Dự án thực hiện rất tốt, áp dụng đúng kiến thức mô hình học sâu CNN để xác thực khuôn mặt. Sản phẩm chạy ổn định trên camera IP. Cần tối ưu thêm giao diện người dùng và cơ chế báo cáo lỗi.',
        classId: 'PBL-CNPM-2025',
        librarySearchKey: 'nhận diện'
    };

    const history = [
        { 
            semester: 'Học kỳ I - 2024/2025', 
            name: 'Hệ thống Quản lý Ký túc xá Thông minh', 
            processScore: 8.5, 
            finalScore: 9.0, 
            overallScore: 8.8, 
            lecturer: 'TS. Nguyễn Thị Minh', 
            lecturerReview: 'Sinh viên hoàn thành xuất sắc các yêu cầu kỹ thuật. Giao diện trực quan, hoạt động ổn định. Cần tối ưu thêm hiệu năng truy vấn database.',
            classId: 'PBL-KTX-2024',
            librarySearchKey: 'quản lý'
        },
        { 
            semester: 'Học kỳ II - 2023/2024', 
            name: 'Ứng dụng Học tiếng Anh qua Flashcard AI', 
            processScore: 8.0, 
            finalScore: 8.5, 
            overallScore: 8.3, 
            lecturer: 'ThS. Trần Văn Hùng', 
            lecturerReview: 'Ý tưởng sáng tạo, áp dụng tốt mô hình ghi nhớ ngắt quãng (Spaced Repetition). Nhóm phối hợp tốt, thuyết trình tự tin.',
            classId: 'PBL-AV-2023',
            librarySearchKey: 'học tiếng Anh'
        },
        { 
            semester: 'Học kỳ I - 2023/2024', 
            name: 'Website Chia sẻ và Thuê Sách Giáo Trình', 
            processScore: 7.8, 
            finalScore: 8.2, 
            overallScore: 8.0, 
            lecturer: 'TS. Lê Hoàng Nam', 
            lecturerReview: 'Hệ thống đầy đủ chức năng cơ bản của một web thương mại. Code sạch sẽ, có cấu trúc tốt. Giao diện cần được chăm chút hơn về độ phản hồi.',
            classId: 'PBL-WEB-2023',
            librarySearchKey: 'thư viện trực tuyến'
        }
    ];

    // Điều hướng đồng bộ
    const handleGoToClass = (classId) => {
        navigate(`/sv-workshop?classID=${classId}`);
    };

    const handleGoToLibrary = () => {
        navigate(`/thu-vien-pbl`);
    };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            {/* Header navbar dải xanh đậm đồng bộ ITFDUT */}
            <header className="navbar" style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '0 40px', width: '100%', boxSizing: 'border-box',
                backgroundColor: '#003366', color: 'white', position: 'relative', zIndex: 1000 
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px', color: 'white', fontWeight: 'bold' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, color: 'white' }}>Project-Based Learning Portal</p>
                    </div>
                </div>
            </header>

            <main className="container-fluid" style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
                
                {/* Nút Quay lại mượt mà */}
                <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="back-btn"
                        style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                </div>

                {/* Tiêu đề trang con sang trọng */}
                <div className="welcome-text" style={{ textAlign: 'left', marginBottom: '35px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', fontWeight: 'bold' }}>Kết quả & Lịch sử học tập PBL</h2>
                    <p style={{ color: '#666', marginTop: '5px' }}>Tổng hợp điểm số và nhận xét từ giảng viên hướng dẫn qua các học kỳ</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
                    
                    {/* 1. Học kỳ hiện tại (Thiết kế dạng Card viền mờ bo tròn y hệt cũ) */}
                    <div className="stats-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f4f7fe', paddingBottom: '12px', marginBottom: '20px' }}>
                            <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                                <i className="fas fa-bookmark" style={{ marginRight: '8px' }}></i>
                                Học kỳ hiện tại ({currentResult.semester})
                            </h3>
                            <span style={{ padding: '4px 10px', backgroundColor: '#e6f7ee', color: '#28a745', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Đang học
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: 1, minWidth: '280px' }}>
                                <span style={{ fontSize: '0.85rem', color: '#888', display: 'block', textTransform: 'uppercase' }}>Tên đồ án</span>
                                <strong style={{ fontSize: '1.15rem', color: '#333' }}>{currentResult.name}</strong>
                                
                                <div style={{ marginTop: '12px', display: 'flex', gap: '15px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>
                                        GVHD: <strong style={{ color: '#003366' }}>{currentResult.lecturer}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Điểm số dạng Premium Box */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ textAlign: 'center', backgroundColor: '#f8fafc', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Quá trình</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003366' }}>{currentResult.processScore}</div>
                                </div>
                                <div style={{ textAlign: 'center', backgroundColor: '#f8fafc', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Cuối kỳ</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003366' }}>{currentResult.finalScore}</div>
                                </div>
                                <div style={{ textAlign: 'center', backgroundColor: '#eef2ff', padding: '10px 15px', borderRadius: '8px', border: '1px solid #c3dafe' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 'bold' }}>Tổng kết</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{currentResult.overallScore}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderRadius: '8px', borderLeft: '4px solid #003366', marginBottom: '20px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#003366', display: 'block', marginBottom: '5px' }}>
                                <i className="far fa-comment-alt" style={{ marginRight: '6px' }}></i>
                                Giảng viên nhận xét:
                            </span>
                            <p style={{ margin: 0, color: '#555', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                "{currentResult.lecturerReview}"
                            </p>
                        </div>

                        {/* Đồng bộ hóa hành động (Giống Card cũ) */}
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button 
                                className="btn" 
                                style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                onClick={() => handleGoToLibrary()}
                            >
                                <i className="fas fa-search"></i> Tài liệu Thư viện
                            </button>
                            <button 
                                className="btn blue" 
                                style={{ width: 'auto', padding: '8px 18px', fontSize: '0.85rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', border: 'none', backgroundColor: '#003366' }}
                                onClick={() => handleGoToClass(currentResult.classId)}
                            >
                                Vào Workspace <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* 2. Lịch sử học tập (Thiết kế dạng Bảng xanh đậm y hệt cũ của Lớp PBL Của Tôi) */}
                    <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #eee' }}>
                        <div style={{ backgroundColor: '#003366', color: 'white', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-history" style={{ fontSize: '18px' }}></i>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>Lịch sử kết quả học kỳ trước</h3>
                        </div>
                        
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #eee' }}>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: '#003366', fontWeight: 'bold', fontSize: '0.9rem', width: '18%' }}>Học kỳ</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: '#003366', fontWeight: 'bold', fontSize: '0.9rem', width: '25%' }}>Tên đồ án</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'center', color: '#003366', fontWeight: 'bold', fontSize: '0.9rem', width: '15%' }}>Điểm (QT / CK / TK)</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: '#003366', fontWeight: 'bold', fontSize: '0.9rem', width: '17%' }}>Giáo viên</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: '#003366', fontWeight: 'bold', fontSize: '0.9rem', width: '25%' }}>Nhận xét giảng viên cũ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.15s' }} className="table-row-hover">
                                            <td style={{ padding: '15px 20px', fontWeight: 'bold', color: '#0066cc', fontSize: '0.85rem' }}>
                                                {item.semester}
                                            </td>
                                            <td style={{ padding: '15px 20px', textAlign: 'left' }}>
                                                <div style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>{item.name}</div>
                                                
                                                {/* Bộ nút đồng bộ nhỏ */}
                                                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                                                    <span 
                                                        onClick={() => handleGoToClass(item.classId)}
                                                        style={{ fontSize: '0.75rem', color: '#003366', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                                                    >
                                                        <i className="fas fa-chalkboard-teacher"></i> Lớp cũ
                                                    </span>
                                                    <span style={{ color: '#ccc', fontSize: '0.75rem' }}>|</span>
                                                    <span 
                                                        onClick={() => handleGoToLibrary()}
                                                        style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                                                    >
                                                        <i className="fas fa-book"></i> Thư viện
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                                                    {item.processScore} / {item.finalScore} / <strong style={{ color: '#4f46e5' }}>{item.overallScore}</strong>
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px 20px', color: '#333', fontSize: '0.85rem', fontWeight: '500' }}>
                                                {item.lecturer}
                                            </td>
                                            <td style={{ padding: '15px 20px', color: '#666', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: '1.4' }}>
                                                "{item.lecturerReview}"
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default StudentResults;
