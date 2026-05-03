import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PBLLibrary = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedPBL, setSelectedPBL] = useState(null);

    // Dữ liệu mẫu đồ án đã được kiểm duyệt trong thư viện
    const [pblList] = useState([
        {
            id: 1,
            title: 'Hệ thống nhận diện khuôn mặt điểm danh',
            shortDesc: 'Sử dụng OpenCV và Deep Learning để điểm danh sinh viên tự động.',
            fullDesc: 'Dự án xây dựng một giải pháp thay thế cho việc điểm danh truyền thống bằng giấy. Hệ thống có khả năng nhận diện đồng thời nhiều sinh viên trong phòng học với độ chính xác cao và cập nhật trực tiếp vào cơ sở dữ liệu của nhà trường.',
            image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=500&auto=format&fit=crop',
            lecturer: 'TS. Nguyễn Văn A',
            groupName: 'Nhóm Visionary',
            category: 'Trí tuệ nhân tạo',
            releaseDate: '2025-04-20',
            students: [
                { name: 'Trần Văn B', cardId: '102220001', class: '22T_DT1', faculty: 'Công nghệ Thông tin' },
                { name: 'Lê Thị C', cardId: '102220002', class: '22T_DT1', faculty: 'Công nghệ Thông tin' }
            ]
        },
        {
            id: 2,
            title: 'Thiết bị đo nồng độ bụi mịn PM2.5',
            shortDesc: 'Thiết bị IoT quan trắc chất lượng không khí thời gian thực.',
            fullDesc: 'Dự án phát triển một thiết bị giá thành thấp nhưng có độ chính xác cao để giám sát môi trường. Dữ liệu được đẩy lên Cloud và hiển thị trực quan qua ứng dụng di động cho người dùng theo dõi.',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=500&auto=format&fit=crop',
            lecturer: 'ThS. Trần Thị D',
            groupName: 'Nhóm GreenCity',
            category: 'Internet of Things (IoT)',
            releaseDate: '2025-01-15',
            students: [
                { name: 'Ngô Văn E', cardId: '102210005', class: '21T_DT2', faculty: 'Điện - Điện tử' },
                { name: 'Phạm Thị F', cardId: '102210006', class: '21T_DT2', faculty: 'Điện - Điện tử' }
            ]
        },
        {
            id: 3,
            title: 'Sàn thương mại điện tử nông sản',
            shortDesc: 'Kết nối trực tiếp nông dân và người tiêu dùng qua nền tảng Web.',
            fullDesc: 'Dự án áp dụng mô hình B2C giúp nông dân bán hàng trực tiếp không qua trung gian. Tích hợp thanh toán online và hệ thống quản lý đơn hàng thông minh cho nhà vườn.',
            image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=500&auto=format&fit=crop',
            lecturer: 'TS. Lê Quang Đạo',
            groupName: 'Nhóm AgriTech',
            category: 'Phát triển Web',
            releaseDate: '2024-11-10',
            students: [
                { name: 'Hoàng Văn G', cardId: '102220999', class: '22T_DT3', faculty: 'Công nghệ Thông tin' }
            ]
        }
    ]);

    const categories = ['Tất cả', 'Trí tuệ nhân tạo', 'Internet of Things (IoT)', 'Phát triển Web', 'Nhúng & Robot', 'Xử lý ngôn ngữ tự nhiên'];

    // Lọc và sắp xếp dữ liệu
    const filteredPBLs = useMemo(() => {
        let result = pblList.filter(pbl => 
            (selectedCategory === 'Tất cả' || pbl.category === selectedCategory) &&
            (pbl.title.toLowerCase().includes(searchTerm.toLowerCase()) || pbl.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return result.sort((a, b) => {
            return sortBy === 'newest' 
                ? new Date(b.releaseDate) - new Date(a.releaseDate)
                : new Date(a.releaseDate) - new Date(b.releaseDate);
        });
    }, [pblList, searchTerm, selectedCategory, sortBy]);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            width: '100vw',
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            
            {/* Header: Search Bar */}
            <header style={{ 
                height: '80px', 
                backgroundColor: '#fff', 
                padding: '0 40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                zIndex: 10,
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ 
                            border: 'none', 
                            background: 'none', 
                            color: '#003366', 
                            cursor: 'pointer', 
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        ←
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#003366', fontWeight: '800' }}>THƯ VIỆN PBL</h1>
                </div>

                <div style={{ position: 'relative', width: '500px' }}>
                    <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm đồ án, tài liệu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '12px 15px 12px 45px', 
                            borderRadius: '30px', 
                            border: '1px solid #eef0f3', 
                            backgroundColor: '#f8f9fa', 
                            outline: 'none', 
                            fontSize: '0.95rem',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <div style={{ width: '100px' }}></div> {/* Spacer */}
            </header>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                
                {/* Sidebar: Filters */}
                <aside style={{ 
                    width: '280px', 
                    backgroundColor: '#fff', 
                    borderRight: '1px solid #eef0f3', 
                    padding: '30px', 
                    overflowY: 'auto',
                    flexShrink: 0
                }}>
                    <h3 style={{ fontSize: '1rem', color: '#003366', marginBottom: '20px', fontWeight: '700' }}>THỂ LOẠI</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{ 
                                    textAlign: 'left', 
                                    padding: '10px 15px', 
                                    borderRadius: '10px', 
                                    border: 'none', 
                                    backgroundColor: selectedCategory === cat ? '#eef2ff' : 'transparent',
                                    color: selectedCategory === cat ? '#0066cc' : '#64748b',
                                    fontWeight: selectedCategory === cat ? 'bold' : '500',
                                    cursor: 'pointer', 
                                    fontSize: '0.9rem', 
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1rem', color: '#003366', marginBottom: '20px', fontWeight: '700' }}>SẮP XẾP</h3>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            borderRadius: '10px', 
                            border: '1px solid #eef0f3', 
                            backgroundColor: '#f8f9fa', 
                            outline: 'none', 
                            color: '#333', 
                            fontSize: '0.9rem',
                            fontFamily: 'inherit'
                        }}
                    >
                        <option value="newest">Mới nhất trước</option>
                        <option value="oldest">Cũ nhất trước</option>
                    </select>
                </aside>

                {/* Main Content: Grid PBL */}
                <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {filteredPBLs.map(pbl => (
                            <div 
                                key={pbl.id}
                                onClick={() => setSelectedPBL(pbl)}
                                style={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '20px', 
                                    overflow: 'hidden', 
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                                    cursor: 'pointer', 
                                    transition: 'all 0.3s', 
                                    border: '1px solid #eef0f3'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ height: '180px' }}>
                                    <img src={pbl.image} alt={pbl.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#0066cc', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>{pbl.category}</div>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.05rem', color: '#003366', lineHeight: '1.4' }}>{pbl.title}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {pbl.shortDesc}
                                    </p>
                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#888' }}>
                                        <span>📅 {pbl.releaseDate}</span>
                                        <span style={{ fontWeight: '600', color: '#333' }}>Xem chi tiết →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPBLs.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
                            <div style={{ fontSize: '3rem', opacity: 0.2 }}>🔍</div>
                            <p style={{ marginTop: '20px' }}>Không tìm thấy đồ án nào phù hợp với yêu cầu của bạn.</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Modal Chi tiết */}
            {selectedPBL && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1000, 
                    backdropFilter: 'blur(8px)'
                }}>
                    <div style={{ 
                        backgroundColor: '#fff', 
                        width: '90%', 
                        maxWidth: '900px', 
                        maxHeight: '90vh', 
                        borderRadius: '24px', 
                        overflowY: 'auto', 
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)', 
                        position: 'relative'
                    }}>
                        
                        <button 
                            onClick={() => setSelectedPBL(null)} 
                            style={{ 
                                position: 'absolute', 
                                top: '25px', 
                                right: '25px', 
                                border: 'none', 
                                background: '#f4f7fe', 
                                width: '45px', 
                                height: '45px', 
                                borderRadius: '50%', 
                                cursor: 'pointer', 
                                zIndex: 10,
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <div style={{ height: '400px' }}>
                                <img src={selectedPBL.image} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '50px' }}>
                                <div style={{ color: '#0066cc', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '15px' }}>{selectedPBL.category}</div>
                                <h2 style={{ margin: '0 0 25px 0', color: '#003366', fontSize: '1.8rem' }}>{selectedPBL.title}</h2>
                                
                                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>GIẢNG VIÊN</div>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedPBL.lecturer}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>NGÀY XUẤT BẢN</div>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedPBL.releaseDate}</div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>NHÓM SINH VIÊN</div>
                                    <div style={{ fontWeight: 'bold', color: '#003366', fontSize: '1.1rem' }}>{selectedPBL.groupName}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '40px 50px 50px', borderTop: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
                                <div>
                                    <h4 style={{ color: '#003366', marginBottom: '15px', borderLeft: '4px solid #0066cc', paddingLeft: '15px' }}>Mô tả dự án</h4>
                                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1rem' }}>{selectedPBL.fullDesc}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#003366', marginBottom: '15px' }}>Thành viên</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {selectedPBL.students.map((st, i) => (
                                            <div key={i} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '15px', border: '1px solid #eef0f3' }}>
                                                <div style={{ fontWeight: 'bold', color: '#333' }}>{st.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>ID: {st.cardId} • {st.class}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#0066cc', marginTop: '2px' }}>{st.faculty}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                                <button style={{ 
                                    backgroundColor: '#003366', 
                                    color: '#fff', 
                                    border: 'none', 
                                    padding: '15px 40px', 
                                    borderRadius: '30px', 
                                    fontWeight: 'bold', 
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px', 
                                    boxShadow: '0 10px 20px rgba(0,51,102,0.2)',
                                    fontFamily: 'inherit'
                                }}>
                                    📄 Tải báo cáo đầy đủ (.PDF)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PBLLibrary;