import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';
import { useAuth } from '../context/AuthContext';

const ThuVienPBL = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const projects = [
        {
            id: 1,
            title: "Hệ thống quản lý thư viện trực tuyến",
            category: "web",
            categoryText: "Web Development",
            desc: "Dự án xây dựng hệ thống quản lý thư viện với đầy đủ chức năng mượn/trả sách, quản lý độc giả và báo cáo thống kê.",
            tech: ["React", "Node.js", "SQL Server"],
            rating: "4.5",
            downloads: 245
        },
        {
            id: 2,
            title: "Ứng dụng di động học tiếng Anh",
            category: "mobile",
            categoryText: "Mobile Development",
            desc: "App học tiếng Anh tích hợp nhận diện giọng nói bằng AI và kho bài tập tương tác sinh động cho trẻ em.",
            tech: ["React Native", "Firebase"],
            rating: "4.9",
            downloads: 1102
        }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             project.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleViewDetail = (project) => {
        navigate(`/thu-vien-pbl-xem?name=${encodeURIComponent(project.title)}&cat=${encodeURIComponent(project.categoryText)}`);
    };

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
                {user && (
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'white' }}>
                        <i className="fas fa-user-circle"></i> {user.email}
                    </div>
                )}
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                </div>

                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.5rem', marginBottom: '10px' }}>Thư viện PBL</h2>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>Khám phá các dự án PBL xuất sắc từ các khóa trước</p>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div className="search-container" style={{ margin: 0, maxWidth: 'none' }}>
                        <i className="fas fa-search"></i>
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm theo tên, mô tả, hoặc tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee' }}
                        />
                    </div>
                    <div style={{ minWidth: '200px' }}>
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #eee', outline: 'none', backgroundColor: '#f8f9fa', fontSize: '0.9rem', color: '#333' }}
                        >
                            <option value="all">Tất cả danh mục</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="iot">IoT & Embedded Systems</option>
                        </select>
                    </div>
                </div>

                <div className="card-grid">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{project.title}</h3>
                                <span style={{ padding: '4px 10px', backgroundColor: '#eef2ff', color: '#003366', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{project.categoryText}</span>
                            </div>
                            <p style={{ height: '70px', overflow: 'hidden' }}>{project.desc}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '20px 0' }}>
                                {project.tech.map((t, i) => (
                                    <span key={i} style={{ padding: '3px 10px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '0.8rem', color: '#666' }}>{t}</span>
                                ))}
                            </div>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                    <span style={{ color: '#ffc107' }}>⭐ {project.rating}</span>
                                    <span style={{ marginLeft: '15px' }}><i className="fas fa-download"></i> {project.downloads}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        className="btn" 
                                        style={{ padding: '8px 15px', fontSize: '0.85rem', width: 'auto' }} 
                                        onClick={() => handleViewDetail(project)}
                                    >
                                        Xem
                                    </button>
                                    <button 
                                        className="btn blue" 
                                        style={{ padding: '8px 15px', fontSize: '0.85rem', width: 'auto', color: 'white' }}
                                    >
                                        Tải về
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ThuVienPBL;
