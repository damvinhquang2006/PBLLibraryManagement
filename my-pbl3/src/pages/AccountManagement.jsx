import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountManagement = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('SV');
    const [searchTerm, setSearchTerm] = useState('');
    const [facultyFilter, setFacultyFilter] = useState('');
    const [classFilter, setClassFilter] = useState('');
    const [showFilterDialog, setShowFilterDialog] = useState(null);
    const [filterSearch, setFilterSearch] = useState('');

    const faculties = ['Công nghệ Thông tin', 'Điện - Điện tử', 'Cơ khí', 'Xây dựng', 'Kinh tế'];
    const classes = ['22T_DT1', '22T_DT2', '21T_DT1', '20T_DT3', '23T_DT1', '22T_CK1'];

    const [users, setUsers] = useState([
        { id: 1, username: 'Nguyễn Như Quỳnh', email: 'quynh.nguyen@sv.edu.vn', role: 'SV', class_name: '22T_DT1', faculty: 'Công nghệ Thông tin' },
        { id: 2, username: 'Trần Văn Minh', email: 'minh.tran@gv.edu.vn', role: 'GV', class_name: '', faculty: 'Công nghệ Thông tin' },
        { id: 3, username: 'Lê Quang Đạo', email: 'daole@admin.edu.vn', role: 'AD', class_name: '', faculty: 'Ban Giám hiệu' },
        { id: 4, username: 'Phạm Hoàng Nam', email: 'nam.pham@sv.edu.vn', role: 'SV', class_name: '21T_DT1', faculty: 'Điện - Điện tử' },
        { id: 5, username: 'Lê Thị Thu', email: 'thu.le@gv.edu.vn', role: 'GV', class_name: '', faculty: 'Cơ khí' },
        { id: 6, username: 'Đặng Hữu Phúc', email: 'phuc.dang@sv.edu.vn', role: 'SV', class_name: '22T_DT2', faculty: 'Công nghệ Thông tin' },
    ]);

    const filteredUsers = useMemo(() => {
        let result = users.filter(u => u.role === activeTab);
        if (searchTerm.trim() !== '') {
            const keyword = searchTerm.toLowerCase();
            result = result.filter(u => 
                u.username.toLowerCase().includes(keyword) || 
                u.email.toLowerCase().includes(keyword)
            );
        }
        if ((activeTab === 'SV' || activeTab === 'GV') && facultyFilter) {
            result = result.filter(u => u.faculty === facultyFilter);
        }
        if (activeTab === 'SV' && classFilter) {
            result = result.filter(u => u.class_name === classFilter);
        }
        return result;
    }, [users, activeTab, searchTerm, facultyFilter, classFilter]);

    const handleAdd = () => {
        if (activeTab === 'AD') {
            alert('Không thể thêm tài khoản Admin. Bạn chỉ có quyền đọc.');
            return;
        }
        const newName = prompt(`Nhập tên ${activeTab === 'SV' ? 'sinh viên' : 'giảng viên'}:`);
        if (!newName) return;
        const newEmail = prompt('Nhập email:');
        if (!newEmail) return;
        const newFaculty = prompt('Nhập khoa:', faculties[0]);
        if (!newFaculty) return;

        let newUser = {
            id: Date.now(),
            username: newName,
            email: newEmail,
            role: activeTab,
            faculty: newFaculty,
        };
        if (activeTab === 'SV') {
            const newClass = prompt('Nhập lớp (ví dụ: 22T_DT1):', classes[0]);
            if (!newClass) return;
            newUser.class_name = newClass;
        } else {
            newUser.class_name = '';
        }
        setUsers(prev => [...prev, newUser]);
    };

    const handleEdit = (user) => {
        if (activeTab === 'AD') {
            alert('Admin chỉ có quyền đọc, không thể sửa tài khoản Admin khác.');
            return;
        }
        const newName = prompt('Sửa tên:', user.username);
        if (!newName) return;
        const newEmail = prompt('Sửa email:', user.email);
        if (!newEmail) return;
        const newFaculty = prompt('Sửa khoa:', user.faculty);
        if (!newFaculty) return;

        let updatedUser = { ...user, username: newName, email: newEmail, faculty: newFaculty };
        if (activeTab === 'SV') {
            const newClass = prompt('Sửa lớp:', user.class_name);
            if (newClass) updatedUser.class_name = newClass;
        }
        setUsers(prev => prev.map(u => (u.id === user.id ? updatedUser : u)));
    };

    const handleDelete = (user) => {
        if (activeTab === 'AD') {
            alert('Không thể xóa tài khoản Admin.');
            return;
        }
        if (window.confirm(`Bạn có chắc muốn xóa tài khoản "${user.username}"?`)) {
            setUsers(prev => prev.filter(u => u.id !== user.id));
        }
    };

    const handleViewOnly = (user) => {
        alert(`Thông tin tài khoản Admin:\nHọ tên: ${user.username}\nEmail: ${user.email}\nĐơn vị: ${user.faculty}`);
    };

    const clearFacultyFilter = () => setFacultyFilter('');
    const clearClassFilter = () => setClassFilter('');

    const selectFilterItem = (type, value) => {
        if (type === 'FACULTY') {
            setFacultyFilter(value);
        } else if (type === 'CLASS') {
            setClassFilter(value);
        }
        setShowFilterDialog(null);
        setFilterSearch('');
    };

    return (
        <div style={{ 
            display: 'flex', 
            height: '100vh', 
            width: '100vw',
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            {/* Sidebar trái */}
            <div style={{ 
                width: '280px', 
                backgroundColor: '#fff', 
                borderRight: '1px solid #eef0f3', 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '25px', 
                overflowY: 'auto',
                flexShrink: 0
            }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    ← Quay lại Dashboard
                </button>

                <h3 style={{ fontSize: '1rem', color: '#003366', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Bộ lọc tìm kiếm</h3>
                
                {(activeTab === 'SV' || activeTab === 'GV') && (
                    <div style={{ marginBottom: '15px', position: 'relative' }}>
                        <button 
                            onClick={() => setShowFilterDialog(showFilterDialog === 'FACULTY' ? null : 'FACULTY')}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #eef0f3', backgroundColor: '#f8f9fa', color: '#333', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <span>🏛️ Theo Khoa</span>
                            <span>▼</span>
                        </button>
                        {facultyFilter && (
                            <div style={{ marginTop: 8, fontSize: '0.8rem', background: '#eef2ff', padding: '4px 8px', borderRadius: 20, display: 'inline-block' }}>
                                Đang lọc: {facultyFilter}
                                <button onClick={clearFacultyFilter} style={{ marginLeft: 8, background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>✖</button>
                            </div>
                        )}
                        {showFilterDialog === 'FACULTY' && (
                            <MiniFilterDialog 
                                title="Chọn Khoa" 
                                items={faculties} 
                                search={filterSearch} 
                                setSearch={setFilterSearch} 
                                onSelect={(value) => selectFilterItem('FACULTY', value)}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'SV' && (
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setShowFilterDialog(showFilterDialog === 'CLASS' ? null : 'CLASS')}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #eef0f3', backgroundColor: '#f8f9fa', color: '#333', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <span>📚 Theo Lớp</span>
                            <span>▼</span>
                        </button>
                        {classFilter && (
                            <div style={{ marginTop: 8, fontSize: '0.8rem', background: '#eef2ff', padding: '4px 8px', borderRadius: 20, display: 'inline-block' }}>
                                Lớp: {classFilter}
                                <button onClick={clearClassFilter} style={{ marginLeft: 8, background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>✖</button>
                            </div>
                        )}
                        {showFilterDialog === 'CLASS' && (
                            <MiniFilterDialog 
                                title="Chọn Lớp" 
                                items={classes} 
                                search={filterSearch} 
                                setSearch={setFilterSearch} 
                                onSelect={(value) => selectFilterItem('CLASS', value)}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Vùng nội dung chính */}
            <div style={{ 
                flex: 1, 
                padding: '40px', 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h1 style={{ color: '#003366', fontSize: '1.8rem', marginBottom: '30px', fontWeight: '700' }}>Quản lý Tài khoản</h1>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                    <TabButton active={activeTab === 'SV'} onClick={() => { setActiveTab('SV'); setFacultyFilter(''); setClassFilter(''); }} label="Tài khoản Sinh viên" />
                    <TabButton active={activeTab === 'GV'} onClick={() => { setActiveTab('GV'); setFacultyFilter(''); setClassFilter(''); }} label="Tài khoản Giảng viên" />
                    <TabButton active={activeTab === 'AD'} onClick={() => { setActiveTab('AD'); setFacultyFilter(''); setClassFilter(''); }} label="Tài khoản Admin" />
                </div>

                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #eef0f3', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ position: 'relative', width: '400px', maxWidth: '100%' }}>
                            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
                            <input 
                                type="text" 
                                placeholder={`Tìm kiếm ${activeTab === 'SV' ? 'sinh viên' : activeTab === 'GV' ? 'giảng viên' : 'admin'}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #eef0f3', backgroundColor: '#f8f9fa', outline: 'none' }}
                            />
                        </div>
                        {activeTab !== 'AD' && (
                            <button onClick={handleAdd} style={{ backgroundColor: '#003366', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                                + Thêm tài khoản mới
                            </button>
                        )}
                    </div>

                    <div style={{ overflowX: 'auto', flex: 1 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f4f7fe', textAlign: 'left' }}>
                                    <th style={{ padding: '15px', color: '#64748b', fontSize: '0.9rem' }}>Người dùng</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontSize: '0.9rem' }}>Email</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontSize: '0.9rem' }}>Khoa / Đơn vị</th>
                                    <th style={{ padding: '15px', color: '#64748b', fontSize: '0.9rem' }}>Thao tác</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#333' }}>{u.username}</div>
                                            {activeTab === 'SV' && u.class_name && (
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>Lớp: {u.class_name}</div>
                                            )}
                                        </td>
                                        <td style={{ padding: '15px', color: '#555' }}>{u.email}</td>
                                        <td style={{ padding: '15px', color: '#555' }}>{u.faculty}</td>
                                        <td style={{ padding: '15px' }}>
                                            {activeTab === 'AD' ? (
                                                <button onClick={() => handleViewOnly(u)} style={{ border: 'none', background: '#eef2ff', color: '#003366', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                                                    👁️ Xem thông tin
                                                </button>
                                            ) : (
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button onClick={() => handleEdit(u)} style={{ border: 'none', background: '#f0f9ff', color: '#0066cc', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
                                                    <button onClick={() => handleDelete(u)} style={{ border: 'none', background: '#fff1f2', color: '#e11d48', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                            Không có dữ liệu phù hợp.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label }) => (
    <button 
        onClick={onClick}
        style={{ 
            flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', borderRadius: '16px', 
            border: active ? '2px solid #003366' : '1px solid #eef0f3', 
            backgroundColor: active ? '#eef2ff' : '#fff', 
            cursor: 'pointer', transition: 'all 0.3s'
        }}
    >
        <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: active ? '#003366' : '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#fff' : '#003366', fontSize: '1.2rem' }}>
            {label.includes('Sinh viên') ? '👥' : label.includes('Giảng viên') ? '👩‍🏫' : '🛡️'}
        </div>
        <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: active ? '#003366' : '#888', fontWeight: '500' }}>Quản lý</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{label}</div>
        </div>
    </button>
);

const MiniFilterDialog = ({ title, items, search, setSearch, onSelect }) => {
    const filteredItems = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    return (
        <div style={{ position: 'absolute', top: '100%', left: 0, width: '250px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #eef0f3', zIndex: 100, marginTop: '10px', padding: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#003366' }}>{title}</h4>
            <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #eef0f3', marginBottom: '10px', outline: 'none', fontSize: '0.85rem' }}
                autoFocus
            />
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {filteredItems.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onSelect(item)}
                        style={{ padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#555' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {item}
                    </div>
                ))}
                {filteredItems.length === 0 && (
                    <div style={{ padding: '8px', color: '#999', textAlign: 'center' }}>Không có dữ liệu</div>
                )}
            </div>
        </div>
    );
};

export default AccountManagement;