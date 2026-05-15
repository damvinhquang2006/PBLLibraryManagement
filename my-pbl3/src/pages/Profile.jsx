import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentProfile } from '../services/studentService';
import '../css/Dashboard.css';

// ─── Mapping StudentResponseDTO → shape UI ────────────────────────────────────
function mapStudentDTO(dto) {
    return {
        username:    dto.fullName    || dto.username    || '',
        card_id:     dto.id          || dto.card_id     || '',
        email:       dto.email       || '',
        gender:      dto.gender === 'MALE' ? 'Nam'
                   : dto.gender === 'FEMALE' ? 'Nữ'
                   : (dto.gender || ''),
        dob:         dto.dateOfBirth || dto.dob         || '',
        class_name:  dto.homeClass   || dto.class_name  || '',
        phoneNumber: dto.phoneNumber || '',
        homeTown:    dto.homeTown    || '',
        faculty:     dto.majorName   || dto.faculty     || '',
        avatar:      dto.avatar      || '',
        role:        dto.role        || '',
    };
}

// ─── Component chính ──────────────────────────────────────────────────────────
const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Dữ liệu profile riêng (không phụ thuộc vào AuthContext merge)
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        // Kiểm tra cả hai cách lưu role: 'SV' (Login.jsx) hoặc 'STUDENT' (API)
        const isStudent = user.role === 'SV' || user.role === 'STUDENT';
        if (!isStudent) {
            // Với GV/AD, dùng thẳng dữ liệu từ context
            setProfileData(user);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        getStudentProfile()
            .then(dto => {
                if (!cancelled) {
                    // Giữ role từ context (có thể là 'SV'), merge với dữ liệu API
                    const mapped = mapStudentDTO(dto);
                    setProfileData({ ...user, ...mapped, role: user.role });
                }
            })
            .catch(err => {
                if (!cancelled) {
                    console.error('Lỗi fetch profile SV:', err);
                    setError(err.message);
                    // Fallback: hiển thị dữ liệu đã có trong context
                    setProfileData(user);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        navigate('/login');
        return null;
    }

    // Dùng profileData nếu đã fetch xong, ngược lại dùng context
    const data = profileData || user;

    const isStudent = data.role === 'SV' || data.role === 'STUDENT';
    const isAdmin   = data.role === 'AD' || data.role === 'ADMIN';
    const roleLabel = isStudent ? 'Sinh viên' : (isAdmin ? 'Administrator' : 'Giảng viên');

    const renderRoleSpecificFields = () => {
        if (isStudent) {
            return (
                <>
                    <InfoItem icon="bi-geo-alt"   label="Quê quán"           value={data.homeTown} />
                    <InfoItem icon="bi-building"  label="Chuyên ngành / Khoa" value={data.faculty} />
                </>
            );
        } else if (data.role === 'GV' || data.role === 'LECTURER') {
            return (
                <>
                    <InfoItem icon="bi-mortarboard" label="Trường tốt nghiệp" value={data.graduated_college} />
                    <InfoItem icon="bi-award"       label="Học vị"            value={data.academic_degree} />
                    <InfoItem icon="bi-book"        label="Chuyên ngành"      value={data.major} />
                </>
            );
        } else if (isAdmin) {
            return <InfoItem icon="bi-person-badge-fill" label="Chức vụ" value={data.position || 'Cán bộ quản trị'} />;
        }
        return null;
    };

    return (
        <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

            {/* --- HEADER --- */}
            <header style={{
                height: '70px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', color: '#003366' }}></i>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#003366', fontWeight: '700' }}>Hồ sơ cá nhân</h2>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        padding: '8px 20px',
                        borderRadius: '10px',
                        border: '1px solid #ff4d4f',
                        backgroundColor: 'transparent',
                        color: '#ff4d4f',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#ff4d4f';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#ff4d4f';
                    }}
                >
                    <i className="bi bi-box-arrow-right"></i> Thoát
                </button>
            </header>

            {/* --- LOADING / ERROR BANNER --- */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '12px', background: '#e6f7ff', color: '#1890ff', fontSize: '0.9rem' }}>
                    <i className="bi bi-arrow-repeat" style={{ marginRight: '8px' }}></i>
                    Đang tải dữ liệu hồ sơ từ hệ thống…
                </div>
            )}
            {error && (
                <div style={{ textAlign: 'center', padding: '12px', background: '#fff2f0', color: '#ff4d4f', fontSize: '0.9rem' }}>
                    <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '8px' }}></i>
                    {error} — Đang hiển thị dữ liệu đã lưu.
                </div>
            )}

            {/* --- MAIN CONTENT --- */}
            <main style={{ padding: '40px', display: 'flex', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>

                {/* Left Side: Avatar Card */}
                <div style={{
                    flex: '0 0 350px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    height: 'fit-content'
                }}>
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
                            src={data.avatar || 'https://via.placeholder.com/180'}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                    <h2 style={{ color: '#003366', marginBottom: '10px' }}>{data.username}</h2>
                    <span style={{
                        backgroundColor: isAdmin ? '#fff1f0' : '#e6f7ff',
                        color:           isAdmin ? '#ff4d4f' : '#1890ff',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                    }}>
                        {roleLabel}
                    </span>

                    <div style={{ marginTop: '30px', textAlign: 'left', padding: '0 20px' }}>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Giới thiệu ngắn</p>
                        <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Thành viên thuộc đơn vị {data.class_name || 'Nhà trường'}.
                        </p>
                    </div>
                </div>

                {/* Right Side: Information Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '25px' }}>

                    {/* Section 1: Basic Info */}
                    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ marginBottom: '25px', color: '#003366', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="bi bi-info-circle-fill"></i> Thông tin cơ bản
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <InfoItem icon="bi-person-vcard"    label="Mã số (ID)"  value={data.card_id} />
                            <InfoItem icon="bi-envelope"        label="Email"        value={data.email} />
                            <InfoItem icon="bi-gender-ambiguous" label="Giới tính"  value={data.gender} />
                            <InfoItem icon="bi-calendar-event" label="Ngày sinh"    value={data.dob} />
                        </div>
                    </div>

                    {/* Section 2: Professional Info */}
                    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ marginBottom: '25px', color: '#003366', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="bi bi-briefcase-fill"></i> Thông tin chuyên môn &amp; Liên hệ
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <InfoItem icon="bi-people"    label="Lớp / Đơn vị"  value={data.class_name} />
                            <InfoItem icon="bi-telephone" label="Số điện thoại" value={data.phoneNumber} />
                            {renderRoleSpecificFields()}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

// ─── InfoItem sub-component ───────────────────────────────────────────────────
const InfoItem = ({ icon, label, value }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        borderRadius: '15px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #f1f4f9'
    }}>
        <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0066cc',
            fontSize: '1.3rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
        }}>
            <i className={`bi ${icon}`}></i>
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: '500', marginBottom: '2px' }}>{label}</div>
            <div style={{ color: '#333', fontWeight: '600', fontSize: '1rem' }}>{value || 'Chưa cập nhật'}</div>
        </div>
    </div>
);

export default Profile;