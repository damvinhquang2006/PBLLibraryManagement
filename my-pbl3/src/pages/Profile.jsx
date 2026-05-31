import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Dashboard.css'; 
import '../css/DashboardExt.css';

const API_BASE = 'http://localhost:8080/api';

// Profile endpoint — tries role-specific first, falls back to /accounts/profile
const ROLE_ENDPOINT = {
    STUDENT:  `${API_BASE}/students/profile`,
    LECTURER: `${API_BASE}/lecturers/profile`,
    ADMIN:    `${API_BASE}/admins/profile`,
};

/**
 * Normalise an API response — map every possible field-name variant
 * (camelCase from DTO, or snake_case from raw table) to a single shape.
 */
const normalise = (data) => ({
    id:          data.id,
    role:        data.role,
    fullName:    data.fullName    ?? data.fullname    ?? data.full_name    ?? '',
    email:       data.email       ?? '',
    phoneNumber: data.phoneNumber ?? data.phone_number ?? data.phonenumber ?? '',
    gender:      data.gender      ?? '',
    dateOfBirth: data.dateOfBirth ?? data.date_of_birth ?? data.dateofbirth ?? '',
    homeTown:    data.homeTown    ?? data.home_town    ?? data.hometown    ?? '',
    // student-specific
    homeClass:   data.homeClass   ?? data.home_class   ?? '',
    majorName:   data.majorName   ?? data.major_name   ?? '',
    // lecturer-specific
    degree:          data.degree          ?? '',
    position:        data.position        ?? '',
    specialization:  data.specialization  ?? '',
    departmentName:  data.departmentName  ?? data.department_name ?? '',
    pblClassNames:   data.pblClassNames   ?? data.pbl_class_names ?? [],
});

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }

        const endpoint = ROLE_ENDPOINT[user.role];
        if (!endpoint) { setError('Vai trò không hợp lệ.'); setLoading(false); return; }

        fetch(endpoint, { credentials: 'include' })
            .then(r => { if (!r.ok) throw new Error(`Lỗi ${r.status}`); return r.json(); })
            .then(data => {
                console.log('===== RAW PROFILE API RESPONSE =====');
                console.log(JSON.stringify(data, null, 2));
                console.log('Keys:', Object.keys(data));
                const normalised = normalise(data);
                console.log('===== NORMALISED PROFILE =====');
                console.log(JSON.stringify(normalised, null, 2));
                setProfile(normalised);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [user, navigate]);

    if (!user) return null;
    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><span>Đang tải thông tin...</span></div>;
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>{error}</div>;

    // Helper: format date from YYYY-MM-DD to DD/MM/YYYY
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Chưa cập nhật';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Helper: format gender
    const formatGender = (gender) => {
        if (gender === 'MALE') return 'Nam';
        if (gender === 'FEMALE') return 'Nữ';
        return gender || 'Chưa cập nhật';
    };

    // Helper: get role display text
    const getRoleText = (role) => {
        if (role === 'STUDENT') return 'Sinh viên';
        if (role === 'LECTURER') return 'Giảng viên';
        if (role === 'ADMIN') return 'Quản trị viên';
        return role;
    };

    // Helper: get role badge color
    const getRoleColor = (role) => {
        if (role === 'ADMIN') return { bg: '#fff1f0', color: '#ff4d4f' };
        if (role === 'LECTURER') return { bg: '#e6f7ff', color: '#1890ff' };
        return { bg: '#f6ffed', color: '#52c41a' }; // STUDENT
    };

    // Render role-specific fields based on API response structure
    const renderRoleSpecificFields = () => {
        if (user.role === 'STUDENT') {
            return (
                <>
                    <InfoItem icon="fa-users" label="Lớp học phần" value={profile.homeClass} />
                    <InfoItem icon="fa-graduation-cap" label="Chuyên ngành" value={profile.majorName} />
                </>
            );
        } else if (user.role === 'LECTURER') {
            return (
                <>
                    <InfoItem icon="fa-trophy" label="Học vị" value={profile.degree} />
                    <InfoItem icon="fa-briefcase" label="Chức vụ" value={profile.position} />
                    <InfoItem icon="fa-book-reader" label="Chuyên môn" value={profile.specialization} />
                    <InfoItem icon="fa-building" label="Khoa/Bộ môn" value={profile.departmentName} />
                    <div style={{ gridColumn: 'span 2' }}>
                        <InfoItem 
                            icon="fa-sitemap" 
                            label="Lớp PBL phụ trách" 
                            value={profile.pblClassNames?.length > 0 ? profile.pblClassNames.join(', ') : 'Chưa có'} 
                        />
                    </div>
                </>
            );
        }
        return null;
    };

    // Common basic fields for all roles
    const renderBasicInfo = () => (
        <>
            <InfoItem icon="fa-id-card" label="Họ tên" value={profile.fullName} />
            <InfoItem icon="fa-envelope" label="Email" value={profile.email} />
            <InfoItem icon="fa-venus-mars" label="Giới tính" value={formatGender(profile.gender)} />
            <InfoItem icon="fa-calendar-alt" label="Ngày sinh" value={formatDate(profile.dateOfBirth)} />
            <InfoItem icon="fa-phone" label="Số điện thoại" value={profile.phoneNumber} />
            <InfoItem icon="fa-home" label="Quê quán" value={profile.homeTown} />
        </>
    );

    const roleColors = getRoleColor(user.role);

    const BACK_ROUTE = { STUDENT: '/dashboard-sv', LECTURER: '/dashboard-gv', ADMIN: '/dashboard-admin' };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            {/* --- HEADER (Standard Navbar) --- */}
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                    <div 
                        className="user-info clickable" 
                        onClick={() => setShowMenu(!showMenu)}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '15px', 
                            backgroundColor: '#ffffff', 
                            color: '#003366', 
                            padding: '8px 20px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        {user?.avatar
                            ? <img src={user.avatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                            : <i className="fas fa-user-circle" style={{ fontSize: '18px' }}></i>
                        }
                        {user?.email ?? 'Người dùng'}
                        <i className={`fas fa-chevron-${showMenu ? 'up' : 'down'}`} style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    </div>

                    {showMenu && (
                        <div style={{ 
                            position: 'absolute', 
                            top: 'calc(100% + 10px)', 
                            right: 0, 
                            backgroundColor: '#ffffff', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                            width: '220px',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}>
                            {/* User details */}
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#003366', fontSize: '14px' }}>{user?.username ?? '—'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>{user?.email ?? '—'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#888' }}>
                                    {user?.age ? `${user.age} tuổi` : ''}{user?.gender ? ` · ${user.gender}` : ''}
                                </p>
                            </div>

                            <div 
                                className="menu-item" 
                                onClick={() => { setShowMenu(false); navigate('/profile'); }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s', color: '#003366' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-user-circle"></i> Kiểm tra tài khoản
                            </div>
                            <div 
                                className="menu-item" 
                                onClick={() => { setShowMenu(false); logout(); navigate('/'); }}
                                style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#dc3545', borderTop: '1px solid #eee', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className="fas fa-sign-out-alt"></i> Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* --- MAIN CONTENT (HORIZONTAL LAYOUT) --- */}
            <main className="container-fluid" style={{ maxWidth: '100%', margin: '0 auto', padding: '40px 40px', boxSizing: 'border-box' }}>
                
                {/* Back Button */}
                <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    <button 
                        onClick={() => navigate(BACK_ROUTE[user.role] ?? '/')} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', textAlign: 'left' }}>
                    
                    {/* Left Side: Avatar Card */}
                    <div 
                        className="card" 
                        style={{
                            flex: '0 0 350px',
                            padding: '40px 20px',
                            textAlign: 'center',
                            height: 'fit-content',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            margin: '0 auto 20px',
                            border: '5px solid #f0f2f5',
                            padding: '5px',
                            overflow: 'hidden'
                        }}>
                            <img 
                                src={user.avatar || 'https://via.placeholder.com/180'} 
                                alt="Profile" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </div>
                        <h2 style={{ color: '#003366', marginBottom: '10px' }}>{profile.fullName}</h2>
                        <span style={{
                            backgroundColor: roleColors.bg,
                            color: roleColors.color,
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                        }}>
                            {getRoleText(user.role)}
                        </span>
                        
                        <div style={{ marginTop: '30px', textAlign: 'left', padding: '0 20px' }}>
                            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Giới thiệu ngắn</p>
                            <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {user.role === 'STUDENT' && `Sinh viên khoa ${profile.majorName || 'chưa cập nhật'}`}
                                {user.role === 'LECTURER' && `Giảng viên bộ môn ${profile.departmentName || 'chưa cập nhật'}`}
                                {user.role === 'ADMIN' && `Quản trị viên hệ thống`}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Information Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '25px', minWidth: '300px' }}>
                        
                        {/* Section 1: Basic Info */}
                        <div className="card" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '25px', color: '#003366', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fas fa-info-circle"></i> Thông tin cơ bản
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {renderBasicInfo()}
                            </div>
                        </div>

                        {/* Section 2: Professional Info (if any) */}
                        {user.role !== 'ADMIN' && (
                            <div className="card" style={{ padding: '30px' }}>
                                <h3 style={{ marginBottom: '25px', color: '#003366', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-briefcase"></i> Thông tin chuyên môn
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    {renderRoleSpecificFields()}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e0e0e0'
    }}>
        <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#003366',
            fontSize: '1.3rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            border: '1px solid #e0e0e0'
        }}>
            <i className={`fas ${icon}`}></i>
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: '500', marginBottom: '2px' }}>{label}</div>
            <div style={{ color: '#333', fontWeight: '600', fontSize: '1rem' }}>{value || 'Chưa cập nhật'}</div>
        </div>
    </div>
);

export default Profile;