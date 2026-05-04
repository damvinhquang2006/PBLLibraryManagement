import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PBLApproval = () => {
    const navigate = useNavigate();
    const [selectedPBL, setSelectedPBL] = useState(null);
    
    // State tìm kiếm và lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [sortBy, setSortBy] = useState('newest'); // 'newest' hoặc 'oldest'

    // Dữ liệu giả lập các bài báo PBL được đề cử (có thêm dateSubmitted)
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
            dateSubmitted: '2025-04-18', // ngày đề cử (để sắp xếp)
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
            dateSubmitted: '2025-04-20',
            students: [
                { name: 'Phạm Hoàng Nam', cardId: '102210789', class: '21T_DT1', faculty: 'Điện - Điện tử' },
                { name: 'Đặng Văn B', cardId: '102210321', class: '21T_DT1', faculty: 'Điện - Điện tử' }
            ]
        }
    ]);

    // Lấy danh sách thể loại duy nhất từ dữ liệu
    const categories = useMemo(() => {
        const cats = pendingPBLs.map(p => p.category);
        return ['Tất cả', ...new Set(cats)];
    }, [pendingPBLs]);

    // Xử lý lọc + tìm kiếm + sắp xếp
    const filteredAndSortedPBLs = useMemo(() => {
        let result = pendingPBLs.filter(pbl => {
            const matchCategory = selectedCategory === 'Tất cả' || pbl.category === selectedCategory;
            const matchSearch = pbl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                pbl.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });

        // Sắp xếp theo ngày nộp
        result = result.sort((a, b) => {
            const dateA = new Date(a.dateSubmitted);
            const dateB = new Date(b.dateSubmitted);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
        return result;
    }, [pendingPBLs, selectedCategory, searchTerm, sortBy]);

    const handleDecision = (id, decision) => {
        alert(`${decision === 'approve' ? 'Phê duyệt' : 'Từ chối'} thành công dự án ID: ${id}`);
        setPendingPBLs(pendingPBLs.filter(p => p.id !== id));
        setSelectedPBL(null);
    };

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header cố định + thanh tìm kiếm */}
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '16px 32px', 
                borderBottom: '1px solid #eef0f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ 
                            border: 'none', 
                            background: '#f4f7fe', 
                            padding: '8px 16px', 
                            borderRadius: '30px', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            color: '#003366',
                            fontWeight: 'bold'
                        }}
                    >
                        ← Quay lại
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#003366' }}>Duyệt xuất bản PBL</h1>
                        <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>{filteredAndSortedPBLs.length} dự án đang chờ</p>
                    </div>
                </div>
                
                {/* Thanh tìm kiếm */}
                <div style={{ position: 'relative', width: '300px' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
                    <input 
                        type="text"
                        placeholder="Tìm theo tên hoặc mô tả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 15px 10px 40px',
                            borderRadius: '40px',
                            border: '1px solid #eef0f3',
                            backgroundColor: '#f8f9fa',
                            outline: 'none',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
            </div>

            {/* Khu vực chính: Sidebar + Grid */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar trái - Bộ lọc */}
                <aside style={{ 
                    width: '260px', 
                    backgroundColor: '#fff', 
                    borderRight: '1px solid #eef0f3', 
                    padding: '24px 20px', 
                    overflowY: 'auto',
                    flexShrink: 0
                }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '0.85rem', color: '#003366', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>📂 THỂ LOẠI</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        borderRadius: '30px',
                                        border: 'none',
                                        backgroundColor: selectedCategory === cat ? '#eef2ff' : 'transparent',
                                        color: selectedCategory === cat ? '#0066cc' : '#64748b',
                                        fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.85rem', color: '#003366', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>⏳ SẮP XẾP</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '30px',
                                border: '1px solid #eef0f3',
                                backgroundColor: '#f8f9fa',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="newest">Mới nhất trước</option>
                            <option value="oldest">Cũ nhất trước</option>
                        </select>
                    </div>
                </aside>

                {/* Main content - Grid danh sách PBL */}
                <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                    {filteredAndSortedPBLs.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '80px', color: '#94a3b8' }}>
                            <div style={{ fontSize: '3rem', opacity: 0.3 }}>📭</div>
                            <p>Không có dự án nào phù hợp với bộ lọc.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {filteredAndSortedPBLs.map(pbl => (
                                <div 
                                    key={pbl.id}
                                    onClick={() => setSelectedPBL(pbl)}
                                    style={{ 
                                        backgroundColor: '#fff', 
                                        borderRadius: '20px', 
                                        overflow: 'hidden', 
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                                        cursor: 'pointer', 
                                        transition: 'transform 0.25s, box-shadow 0.25s',
                                        border: '1px solid #eef0f3'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                                    }}
                                >
                                    <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                                        <img src={pbl.image} alt={pbl.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#003366', color: 'white', padding: '4px 10px', borderRadius: '30px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                            ĐỀ CỬ
                                        </div>
                                    </div>
                                    <div style={{ padding: '18px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', color: '#003366', fontSize: '1rem', lineHeight: '1.4' }}>{pbl.title}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {pbl.shortDesc}
                                        </p>
                                        <div style={{ marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#0066cc', fontWeight: 'bold' }}>👩‍🏫 {pbl.lecturer}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#888' }}>📅 {pbl.dateSubmitted}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Modal Chi tiết (giữ nguyên chức năng) */}
            {selectedPBL && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
                    <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '900px', maxHeight: '90vh', borderRadius: '28px', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
                        <button 
                            onClick={() => setSelectedPBL(null)} 
                            style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f4f7fe', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, fontSize: '1.2rem' }}
                        >
                            ✕
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <img src={selectedPBL.image} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ padding: '35px' }}>
                                <div style={{ color: '#0066cc', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '10px' }}>{selectedPBL.category}</div>
                                <h2 style={{ margin: '0 0 20px 0', color: '#003366', fontSize: '1.6rem' }}>{selectedPBL.title}</h2>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>GIẢNG VIÊN HƯỚNG DẪN</div>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedPBL.lecturer}</div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>NHÓM THỰC HIỆN</div>
                                    <div style={{ fontWeight: 'bold', color: '#003366' }}>{selectedPBL.groupName}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>NGÀY ĐỀ CỬ</div>
                                    <div style={{ fontWeight: '500', color: '#555' }}>{selectedPBL.dateSubmitted}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '30px 40px', borderTop: '1px solid #f0f0f0' }}>
                            <h4 style={{ color: '#003366', marginBottom: '15px' }}>👥 Thành viên nhóm</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                {selectedPBL.students.map((st, i) => (
                                    <div key={i} style={{ backgroundColor: '#f8f9fa', padding: '12px 16px', borderRadius: '16px', border: '1px solid #eef0f3' }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{st.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>ID: {st.cardId} • Lớp: {st.class}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#0066cc' }}>{st.faculty}</div>
                                    </div>
                                ))}
                            </div>

                            <h4 style={{ color: '#003366', marginBottom: '12px' }}>📄 Mô tả chi tiết dự án</h4>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '35px' }}>{selectedPBL.fullDesc}</p>

                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0', paddingTop: '25px' }}>
                                <button 
                                    onClick={() => handleDecision(selectedPBL.id, 'reject')}
                                    style={{ padding: '10px 28px', borderRadius: '40px', border: '1px solid #e11d48', backgroundColor: '#fff', color: '#e11d48', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Từ chối xuất bản
                                </button>
                                <button 
                                    onClick={() => handleDecision(selectedPBL.id, 'approve')}
                                    style={{ padding: '10px 32px', borderRadius: '40px', border: 'none', backgroundColor: '#1e8e3e', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(30,142,62,0.3)' }}
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