import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const ThuVienPBL_Xem = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') || "Hệ thống quản lý thư viện trực tuyến";
    const category = searchParams.get('cat') || "Web Development";

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <header className="navbar" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 50px', display: 'flex', alignItems: 'center' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-book-open" style={{ fontSize: '28px' }}></i>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Hệ thống PBL</h1>
                        <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1000px', margin: '40px auto', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', textAlign: 'left' }}>
                <div style={{ marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Danh sách Thư viện
                    </button>
                </div>
                
                <h2 style={{ color: '#003366', margin: 0, fontSize: '2rem' }}>{name}</h2>
                <p style={{ color: '#666', margin: '5px 0 30px 0', fontSize: '1.1rem' }}>{category}</p>

                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366', borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '30px 0 20px' }}>
                    Mô tả chi tiết dự án
                </div>
                <p style={{ lineHeight: 1.7, color: '#444', marginBottom: '30px', fontSize: '1.05rem' }}>
                    Dự án xây dựng một nền tảng quản lý thư viện hiện đại, cho phép sinh viên tra cứu sách trực tuyến, 
                    đặt lịch mượn trả và nhận thông báo qua email. Hệ thống tích hợp công nghệ mã vạch để tối ưu hóa quy trình kiểm kê.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#f9fbff', padding: '25px', borderRadius: '10px', border: '1px solid #eef2f6', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-user-friends" style={{ color: '#003366' }}></i> <span><b>Tác giả:</b> Nhóm 08 - Lớp 21TCI1</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-calendar-check" style={{ color: '#003366' }}></i> <span><b>Ngày đăng:</b> 18/04/2026</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-code" style={{ color: '#003366' }}></i> <span><b>Công nghệ:</b> ReactJS, SQL Server, .NET Core</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-star" style={{ color: '#003366' }}></i> <span><b>Đánh giá:</b> 4.9/5 (24 lượt tải)</span>
                    </div>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366', borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '30px 0 20px' }}>
                    Tài liệu đính kèm
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '12px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, color: '#065f46' }}>
                        <i className="far fa-file-archive" style={{ fontSize: '2rem' }}></i>
                        <span style={{ fontSize: '1.1rem' }}>PBL_SourceCode_Document_Full.zip</span>
                    </div>
                    <button className="btn" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', width: 'auto' }}>
                        <i className="fas fa-download"></i> Tải xuống ngay
                    </button>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366', borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '40px 0 20px' }}>
                    Bình luận từ người dùng
                </div>
                <div style={{ borderLeft: '4px solid #ddd', paddingLeft: '20px', marginTop: '20px' }}>
                    <b style={{ color: '#003366', fontSize: '1rem' }}>Nguyễn Hoàng Nam (Sinh viên K21)</b>
                    <p style={{ margin: '8px 0', fontSize: '0.95rem', color: '#555', lineHeight: 1.5 }}>Code cực kỳ sạch sẽ và dễ hiểu, tài liệu đặc tả (SRS) đi kèm rất chi tiết. Cảm ơn nhóm đã chia sẻ!</p>
                </div>
            </main>
        </div>
    );
};

export default ThuVienPBL_Xem;
