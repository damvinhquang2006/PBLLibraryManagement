import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PBLApproval = () => {
    const navigate = useNavigate();
    const [selectedPBL, setSelectedPBL] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    // Dữ liệu giả lập
    const [pendingPBLs, setPendingPBLs] = useState([
        {
            id: 'PBL-SYS-2026',
            title: 'Hệ thống quản lý thư viện thông minh',
            category: 'Hệ thống thông tin / IoT',
            lecturer: 'TS. Trần Văn Minh',
            dateSubmitted: '20/10/2025',
            fullDesc: 'Dự án sử dụng RFID và AI để tự động hóa quy trình mượn trả sách...',
            students: [
                { name: 'Nguyễn Như Quỳnh', cardId: '102220123' },
                { name: 'Lê Văn A', cardId: '102220456' }
            ]
        },
        {
            id: 'PBL-AI-2026',
            title: 'Phân tích cảm xúc mạng xã hội',
            category: 'Trí tuệ nhân tạo (AI)',
            lecturer: 'ThS. Lê Thị Thu',
            dateSubmitted: '22/10/2025',
            fullDesc: 'Sử dụng mô hình BERT để phân loại bình luận Tiếng Việt...',
            students: [
                { name: 'Phạm Hoàng Nam', cardId: '102210789' }
            ]
        }
    ]);

    const filteredPBLs = useMemo(() => {
        return pendingPBLs.filter(pbl => 
            pbl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pbl.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [pendingPBLs, searchTerm]);

    const handleDecision = (id, decision) => {
        alert(`${decision === 'approve' ? 'Phê duyệt' : 'Từ chối'} thành công dự án: ${id}`);
        setPendingPBLs(pendingPBLs.filter(p => p.id !== id));
        setSelectedPBL(null);
    };

    // --- STYLES (Sát mẫu image_c4bb89.png) ---
    const styles = {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f8f9fa',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            overflow: 'hidden'
        },
        header: {
            backgroundColor: '#002b5c', // Màu xanh đậm như mẫu
            color: 'white',
            padding: '10px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
        },
        main: {
            flex: 1,
            overflowY: 'auto',
            padding: '40px 20px'
        },
        container: {
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative'
        },
        backBtn: {
            position: 'absolute',
            top: '-10px',
            left: '0',
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            padding: '8px 15px',
            borderRadius: '6px',
            color: '#6c757d',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.9rem'
        },
        titleSection: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        tableCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            border: '1px solid #eee'
        },
        tableHeader: {
            backgroundColor: '#003366', // Xanh header bảng
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 2fr 1.5fr 1.5fr',
            padding: '15px 20px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem'
        },
        tableRow: {
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 2fr 1.5fr 1.5fr',
            padding: '20px',
            borderBottom: '1px solid #f1f3f5',
            alignItems: 'center',
            fontSize: '0.95rem',
            color: '#333'
        },
        statusBadge: {
            backgroundColor: '#e7f9ee',
            color: '#28a745',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            width: 'fit-content'
        },
        actionBtn: {
            backgroundColor: '#003366',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Header Xanh Đậm sát mép trên */}
            <header style={styles.header}>
                <i className="fas fa-book" style={{ fontSize: '1.5rem' }}></i>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Hệ thống PBL</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Project-Based Learning Portal</div>
                </div>
            </header>

            <main style={styles.main}>
                <div style={styles.container}>
                    {/* Nút quay lại */}
                    <button style={styles.backBtn} onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>

                    {/* Tiêu đề căn giữa */}
                    <div style={styles.titleSection}>
                        <h1 style={{ color: '#002b5c', fontSize: '2.2rem', marginBottom: '10px' }}>Duyệt xuất bản PBL</h1>
                        <p style={{ color: '#6c757d', fontSize: '1rem' }}>Danh sách các dự án đang chờ phê duyệt lên thư viện</p>
                    </div>

                    {/* Thanh tìm kiếm (Option) */}
                    <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                        <input 
                            type="text" 
                            placeholder="Tìm mã dự án hoặc tên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', width: '250px', outline: 'none' }}
                        />
                    </div>

                    {/* Bảng danh sách dự án trong Card trắng */}
                    <div style={styles.tableCard}>
                        <div style={styles.tableHeader}>
                            <div>Mã dự án</div>
                            <div>Tên dự án</div>
                            <div>GVHD</div>
                            <div>Ngày nộp</div>
                            <div style={{ textAlign: 'center' }}>Hành động</div>
                        </div>

                        {filteredPBLs.map(pbl => (
                            <div key={pbl.id} style={styles.tableRow}>
                                <div style={{ fontWeight: 'bold' }}>{pbl.id}</div>
                                <div>
                                    <div style={{ fontWeight: '500' }}>{pbl.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{pbl.category}</div>
                                </div>
                                <div>{pbl.lecturer}</div>
                                <div>
                                    <div style={styles.statusBadge}>
                                        <i className="fas fa-check-circle"></i> {pbl.dateSubmitted}
                                    </div>
                                </div>
                                <div>
                                    <button style={styles.actionBtn} onClick={() => setSelectedPBL(pbl)}>
                                        Xem & Duyệt <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredPBLs.length === 0 && (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                Không có dự án nào đang chờ duyệt.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal Chi tiết (Vẫn giữ để thực hiện hành động Duyệt/Từ chối) */}
            {selectedPBL && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', maxWidth: '700px', width: '90%', position: 'relative' }}>
                        <button onClick={() => setSelectedPBL(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                        <h2 style={{ color: '#002b5c', marginBottom: '20px' }}>{selectedPBL.title}</h2>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>{selectedPBL.fullDesc}</p>
                        
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <button 
                                onClick={() => handleDecision(selectedPBL.id, 'reject')}
                                style={{ padding: '10px 25px', borderRadius: '8px', border: '1px solid #dc3545', color: '#dc3545', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            >Từ chối</button>
                            <button 
                                onClick={() => handleDecision(selectedPBL.id, 'approve')}
                                style={{ padding: '10px 25px', borderRadius: '8px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            >Phê duyệt xuất bản</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PBLApproval;