import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const API_BASE = 'http://localhost:8080/api';

const SV_TruyCapLopPBL = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const studentId = user?.id || '';
    const currentUserID = searchParams.get('userID') || user?.email;
    const currentRole = searchParams.get('role') || user?.role;

    const [danhSachLop, setDanhSachLop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Backend dùng JWT session để biết user là ai — không cần studentId trên URL
        // Endpoint đúng: GET /api/pbl-classes (getPblClassesForUser nhận Account từ security context)
        fetch(`${API_BASE}/pbl-classes`, {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Lỗi tải danh sách lớp (${res.status})`);
                }
                return res.json();
            })
            .then(data => {
                setDanhSachLop(data);
                setError('');
            })
            .catch(err => {
                console.error(err);
                setError('Không thể tải danh sách lớp PBL. Vui lòng thử lại sau.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user, navigate]);

    const goToWorkspace = (maLop) => {
        navigate(`/sv-workshop?userID=${currentUserID}&role=${currentRole}&classID=${maLop}`);
    };

    return (
        <div className="dashboard-body" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
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
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Học Kì</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '10px', fontSize: '1.2rem' }}></i> Đang tải danh sách lớp học...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#ff4d4f' }}>
                                        <i className="fas fa-exclamation-circle" style={{ marginRight: '10px', fontSize: '1.2rem' }}></i> {error}
                                    </td>
                                </tr>
                            ) : danhSachLop.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                                        Bạn chưa tham gia lớp học PBL nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                danhSachLop.map((lop, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '20px' }}><strong>{lop.id}</strong></td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: '600', color: '#333' }}>{lop.className}</div>
                                        </td>
                                        <td style={{ padding: '20px' }}>{lop.lecturerName}</td>
                                        <td style={{ padding: '20px' }}>{lop.semester}</td>
                                        <td style={{ padding: '20px' }}>
                                            <button 
                                                onClick={() => goToWorkspace(lop.id)}
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default SV_TruyCapLopPBL;
