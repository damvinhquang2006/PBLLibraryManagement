import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PBLApproval = () => {
    const navigate = useNavigate();
    const [selectedPBL, setSelectedPBL] = useState(null);

    // Dữ liệu giả lập các bài báo PBL được đề cử
    const [pendingPBLs, setPendingPBLs] = useState([
        {
            id: 1,
            title: 'Hệ thống quản lý thư viện thông minh',
            shortDesc: 'Ứng dụng công nghệ RFID và AI để tự động hóa quy trình mượn trả sách.',
            fullDesc: 'Dự án tập trung vào việc giải quyết bài toán quản lý kho sách khổng lồ của nhà trường. Sử dụng các thẻ RFID để định vị sách và camera AI để nhận diện khuôn mặt người mượn, giúp quy trình trở nên nhanh chóng và bảo mật hơn.',
            image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=500&auto=format&fit=crop',
            lecturer: 'TS. Trần Văn Minh',
            groupName: 'Nhóm Alphas',
            category: 'Hệ thống thông tin / IoT',
            students: [
                { name: 'Nguyễn Như Quỳnh', cardId: '102220123', class: '22T_DT1', faculty: 'Công nghệ Thông tin' },
                { name: 'Lê Văn A', cardId: '102220456', class: '22T_DT1', faculty: 'Công nghệ Thông tin' }
            ]
        },
        {
            id: 2,
            title: 'Phân tích cảm xúc mạng xã hội',
            shortDesc: 'Công cụ phân tích xu hướng và thái độ của người dùng dựa trên dữ liệu từ Facebook và X.',
            fullDesc: 'Sử dụng mô hình BERT và kỹ thuật xử lý ngôn ngữ tự nhiên (NLP) để phân loại các bình luận thành Tích cực, Tiêu cực hoặc Trung lập. Dự án đạt độ chính xác 92% trên tập dữ liệu tiếng Việt.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop',
            lecturer: 'ThS. Lê Thị Thu',
            groupName: 'Nhóm DataWizards',
            category: 'Trí tuệ nhân tạo (AI)',
            students: [
                { name: 'Phạm Hoàng Nam', cardId: '102210789', class: '21T_DT1', faculty: 'Điện - Điện tử' },
                { name: 'Đặng Văn B', cardId: '102210321', class: '21T_DT1', faculty: 'Điện - Điện tử' }
            ]
        }
    ]);

    const handleDecision = (id, decision) => {
        alert(`${decision === 'approve' ? 'Phê duyệt' : 'Từ chối'} thành công dự án ID: ${id}`);
        setPendingPBLs(pendingPBLs.filter(p => p.id !== id));
        setSelectedPBL(null);
    };

    return (
        <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', padding: '40px', fontFamily: "'Inter', sans-serif" }}>
            
            {/* Header */}
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ border: 'none', background: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#003366', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '15px' }}
                    >
                        <i className="bi bi-arrow-left"></i> Quay lại
                    </button>
                    <h1 style={{ color: '#003366', margin: 0, fontSize: '1.8rem', fontWeight: '700' }}>Duyệt xuất bản PBL</h1>
                    <p style={{ color: '#64748b', margin: '5px 0 0' }}>{pendingPBLs.length} dự án đang chờ bạn xem xét</p>
                </div>
            </div>

            {/* Grid Danh sách PBL */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {pendingPBLs.map(pbl => (
                    <div 
                        key={pbl.id}
                        onClick={() => setSelectedPBL(pbl)}
                        style={{ 
                            backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #eef0f3'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                            <img src={pbl.image} alt="PBL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(0,51,102,0.85)', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>
                                ĐỀ CỬ
                            </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#003366', fontSize: '1.1rem', lineHeight: '1.4' }}>{pbl.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {pbl.shortDesc}
                            </p>
                            <div style={{ marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: '#0066cc', fontWeight: 'bold' }}><i className="bi bi-person-workspace"></i> {pbl.lecturer}</span>
                                <i className="bi bi-chevron-right" style={{ color: '#003366' }}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Chi tiết */}
            {selectedPBL && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
                    <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
                        
                        <button 
                            onClick={() => setSelectedPBL(null)} 
                            style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f4f7fe', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <img src={selectedPBL.image} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ padding: '40px' }}>
                                <div style={{ color: '#0066cc', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>{selectedPBL.category}</div>
                                <h2 style={{ margin: '0 0 20px 0', color: '#003366' }}>{selectedPBL.title}</h2>
                                
                                <div style={{ marginBottom: '25px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>GIẢNG VIÊN HƯỚNG DẪN</div>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedPBL.lecturer}</div>
                                </div>

                                <div style={{ marginBottom: '25px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>NHÓM THỰC HIỆN</div>
                                    <div style={{ fontWeight: 'bold', color: '#003366' }}>{selectedPBL.groupName}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '40px', borderTop: '1px solid #f0f0f0' }}>
                            <h4 style={{ color: '#003366', marginBottom: '15px' }}>Thành viên nhóm</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                {selectedPBL.students.map((st, i) => (
                                    <div key={i} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '12px', border: '1px solid #eef0f3' }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{st.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#666' }}>ID: {st.cardId} • Lớp: {st.class}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#0066cc' }}>{st.faculty}</div>
                                    </div>
                                ))}
                            </div>

                            <h4 style={{ color: '#003366', marginBottom: '10px' }}>Mô tả chi tiết dự án</h4>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '40px' }}>{selectedPBL.fullDesc}</p>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0', paddingTop: '30px' }}>
                                <button 
                                    onClick={() => handleDecision(selectedPBL.id, 'reject')}
                                    style={{ padding: '12px 30px', borderRadius: '12px', border: '1px solid #e11d48', backgroundColor: '#fff', color: '#e11d48', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Từ chối xuất bản
                                </button>
                                <button 
                                    onClick={() => handleDecision(selectedPBL.id, 'approve')}
                                    style={{ padding: '12px 35px', borderRadius: '12px', border: 'none', backgroundColor: '#1e8e3e', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(30,142,62,0.3)' }}
                                >
                                    Phê duyệt lên Thư viện
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PBLApproval;
