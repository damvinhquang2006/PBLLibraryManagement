import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const SV_TruyCapLopPBL = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentUserID = searchParams.get('userID');
    const currentRole = searchParams.get('role');

    const [danhSachLop] = useState([
        {
            maLop: "PBL-CNPM-2025",
            tenLop: "Công nghệ phần mềm",
            hocKy: "Học kỳ I - 2025/2026",
            gvhd: "TS. Nguyễn Văn A",
            trangThai: "Đang hoạt động"
        },
        {
            maLop: "PBL-LTDD-2025",
            tenLop: "Lập trình di động",
            hocKy: "Học kỳ I - 2025/2026",
            gvhd: "TS. Trần Thị B",
            trangThai: "Đang hoạt động"
        }
    ]);

    const goToWorkspace = (maLop) => {
        navigate(`/sv-workshop?userID=${currentUserID}&role=${currentRole}&classID=${maLop}`);
    };

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-book-open" style={{ fontSize: '28px' }}></i>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
                <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    <button 
                        onClick={() => navigate(`/dashboard-sv?userID=${currentUserID}&role=${currentRole}`)} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                </div>
                
                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.2rem', marginBottom: '10px' }}>Lớp PBL của tôi</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Danh sách các lớp học PBL bạn đang tham gia</p>
                </div>

                <div className="stats-card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#003366', color: 'white' }}>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Mã lớp</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Tên lớp</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>GVHD</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Trạng thái</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhSachLop.map((lop, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px' }}><strong>{lop.maLop}</strong></td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ fontWeight: '600', color: '#333' }}>{lop.tenLop}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>{lop.hocKy}</div>
                                    </td>
                                    <td style={{ padding: '20px' }}>{lop.gvhd}</td>
                                    <td style={{ padding: '20px' }}>
                                        <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', backgroundColor: '#e6f7ee', color: '#28a745', fontWeight: '500' }}>
                                            <i className="far fa-check-circle"></i> {lop.trangThai}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <button 
                                            onClick={() => goToWorkspace(lop.maLop)}
                                            style={{ 
                                                backgroundColor: '#003366', 
                                                color: 'white', 
                                                border: 'none', 
                                                padding: '10px 18px', 
                                                borderRadius: '6px', 
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            Vào Workspace <i className="fas fa-chevron-right"></i>
                                        </button>
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

export default SV_TruyCapLopPBL;
