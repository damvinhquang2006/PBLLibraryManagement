import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentGroupSpace = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Như Quỳnh', groupNumber: 5, avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Lê Văn A', groupNumber: 5, avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Trần Thị B', groupNumber: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Phạm Văn C', groupNumber: 0, avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Hoàng Văn D', groupNumber: 3, avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Đặng Thị E', groupNumber: 5, avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'Bùi Văn F', groupNumber: 0, avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Ngô Thị G', groupNumber: 8, avatar: 'https://i.pravatar.cc/150?u=8' },
        { id: 9, name: 'Vũ Văn H', groupNumber: 8, avatar: 'https://i.pravatar.cc/150?u=9' },
    ]);

    const [myGroupId, setMyGroupId] = useState(null);
    const [requestedGroups, setRequestedGroups] = useState([]); // Trạng thái lưu các nhóm đã gửi yêu cầu tham gia

    const getGroupCount = (groupId) => {
        if (groupId === 0) return 0;
        const studentCount = students.filter(s => s.groupNumber === groupId).length;
        const includesMe = myGroupId === groupId ? 1 : 0;
        return studentCount + includesMe;
    };

    const sortedStudents = useMemo(() => {
        return [...students].sort((a, b) => {
            if (b.groupNumber !== a.groupNumber) {
                return b.groupNumber - a.groupNumber;
            }
            return a.name.localeCompare(b.name);
        });
    }, [students]);

    const myGroupMembers = useMemo(() => {
        if (!myGroupId) return [];
        return students.filter(s => s.groupNumber === myGroupId);
    }, [students, myGroupId]);

    const handleCreateGroupDraft = () => {
        if (myGroupId) {
            alert('Bạn đã ở trong một nhóm!');
            return;
        }
        const maxGroupId = Math.max(...students.map(s => s.groupNumber), 0);
        setMyGroupId(maxGroupId + 1);
    };

    const handleInvite = (studentId) => {
        if (!myGroupId) return;
        if (getGroupCount(myGroupId) >= 3) {
            alert('Nhóm của bạn đã đạt tối đa 3 thành viên!');
            return;
        }
        
        setStudents(prev => prev.map(s => 
            s.id === studentId ? { ...s, groupNumber: myGroupId } : s
        ));
    };

    const handleJoinRequest = (groupId) => {
        if (myGroupId) {
            alert('Bạn đã có nhóm, không thể tham gia nhóm khác!');
            return;
        }
        if (getGroupCount(groupId) >= 3) {
            alert('Nhóm này đã đầy!');
            return;
        }
        if (requestedGroups.includes(groupId)) {
            alert('Bạn đã gửi yêu cầu đến nhóm này rồi, vui lòng chờ!');
            return;
        }
        
        setRequestedGroups(prev => [...prev, groupId]);
        alert(`Đã gửi yêu cầu tham gia đến Nhóm ${groupId}! Vui lòng chờ trưởng nhóm xác nhận.`);
    };

    // Hàm chốt tạo nhóm
    const handleFinalizeGroup = () => {
        if (getGroupCount(myGroupId) >= 2) {
            alert('Tạo nhóm thành công! Danh sách nhóm đã được lưu lại.');
            // Thực hiện gọi API lưu nhóm vào database ở đây...
        }
    };

    return (
        <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            display: 'flex', flexDirection: 'column', 
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
        }}>
            
            {/* --- HEADER --- */}
            <header style={{
                height: '60px',
                backgroundColor: '#002d5f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                color: 'white',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="bi bi-book-half" style={{ fontSize: '1.8rem' }}></i>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1' }}>Hệ thống PBL</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Project-Based Learning Portal</div>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ backgroundColor: 'white', color: '#002d5f', padding: '5px 15px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: '600' }}>
                        <img src={user?.avatar || 'https://via.placeholder.com/25'} alt="user" style={{ width: 25, height: 25, borderRadius: '50%' }} />
                        {user?.email || 'sinhvien@gmail.com'}
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* --- SIDEBAR TRÁI --- */}
                <div style={{ 
                    width: '320px', 
                    backgroundColor: '#fff', 
                    borderRight: '1px solid #eef0f3', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: '4px 0 10px rgba(0,0,0,0.02)',
                    zIndex: 10
                }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #eef0f3' }}>
                        <button 
                            onClick={() => navigate('/ClassDashboardSV')}
                            style={{ border: 'none', background: 'none', color: '#002d5f', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}
                        >
                            <i className="bi bi-arrow-left"></i> Quay lại ClassDashboardSV
                        </button>
                        <h2 style={{ fontSize: '1.25rem', color: '#1f87ffff', margin: 0, fontWeight: '700' }}>Không gian Nhóm</h2>
                    </div>

                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {!myGroupId ? (
                            <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                                <i className="bi bi-people" style={{ fontSize: '3rem', color: '#94a3b8' }}></i>
                                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '15px 0' }}>Bạn hiện chưa tham gia nhóm nào.</p>
                                <button 
                                    onClick={handleCreateGroupDraft}
                                    style={{ backgroundColor: '#002d5f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                                >
                                    <i className="bi bi-plus-circle"></i> Bắt đầu nhóm mới
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ backgroundColor: '#002d5f', color: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,45,95,0.2)' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Nhóm của bạn</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nhóm {myGroupId}</div>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h4 style={{ fontSize: '1rem', color: '#002d5f', margin: 0 }}>Thành viên</h4>
                                    <span style={{ backgroundColor: getGroupCount(myGroupId) === 3 ? '#e6f4ea' : '#eef0f3', color: getGroupCount(myGroupId) === 3 ? '#1e8e3e' : '#002d5f', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {getGroupCount(myGroupId)}/3
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #eef0f3' }}>
                                        <img src={user?.avatar || 'https://via.placeholder.com/40'} alt="me" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <div>
                                            <span style={{ fontSize: '0.95rem', color: '#002d5f', fontWeight: '600', display: 'block' }}>{user?.username || 'Bạn'}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#1e8e3e' }}>(Nhóm trưởng)</span>
                                        </div>
                                    </div>
                                    {myGroupMembers.map(m => (
                                        <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #eef0f3' }}>
                                            <img src={m.avatar} alt={m.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.95rem', color: '#002d5f', fontWeight: '500' }}>{m.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {getGroupCount(myGroupId) < 2 && (
                                    <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#eab308', textAlign: 'center', fontStyle: 'italic', marginBottom: '10px' }}>
                                        <i className="bi bi-info-circle"></i> Cần mời thêm ít nhất 1 thành viên để tạo nhóm.
                                    </div>
                                )}

                                {/* Nút "Tạo nhóm" - Xám nếu < 2 người, Xanh lá nếu >= 2 người */}
                                <button 
                                    onClick={handleFinalizeGroup}
                                    disabled={getGroupCount(myGroupId) < 2}
                                    style={{
                                        marginTop: 'auto', // Đẩy nút xuống dưới cùng
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: getGroupCount(myGroupId) >= 2 ? 'pointer' : 'not-allowed',
                                        backgroundColor: getGroupCount(myGroupId) >= 2 ? '#1e8e3e' : '#cbd5e1', // Xanh lá vs Xám
                                        color: getGroupCount(myGroupId) >= 2 ? 'white' : '#64748b',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <i className="bi bi-check-circle"></i> Tạo nhóm
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- VÙNG CONTENT CHÍNH --- */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <header style={{ padding: '25px 40px', backgroundColor: '#f4f7fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#002d5f', fontSize: '1.4rem' }}>Danh sách Lớp học</h3>
                            <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                                Tổng cộng: <strong style={{ color: '#002d5f' }}>{students.length}</strong> sinh viên
                            </p>
                        </div>
                    </header>

                    <div style={{ flex: 1, padding: '0 40px 40px', overflowY: 'auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                            {sortedStudents.map(student => {
                                const groupCount = getGroupCount(student.groupNumber);
                                const isFull = groupCount >= 3;
                                const isMyGroup = myGroupId === student.groupNumber && myGroupId !== null;
                                const isRequested = requestedGroups.includes(student.groupNumber);

                                return (
                                    <div 
                                        key={student.id}
                                        style={{ 
                                            backgroundColor: '#fff', 
                                            borderRadius: '16px', 
                                            padding: '20px', 
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                            border: isMyGroup ? '2px solid #002d5f' : '1px solid #eef0f3',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <img 
                                            src={student.avatar} 
                                            alt={student.name} 
                                            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '12px', border: '3px solid #f4f7fe' }}
                                        />
                                        <div style={{ fontWeight: '600', color: '#002d5f', marginBottom: '4px', fontSize: '1rem' }}>{student.name}</div>
                                        
                                        <div style={{ 
                                            fontSize: '0.8rem', 
                                            padding: '4px 12px', 
                                            borderRadius: '20px', 
                                            backgroundColor: student.groupNumber > 0 ? '#e6f7ff' : '#f8f9fa',
                                            color: student.groupNumber > 0 ? '#0066cc' : '#64748b',
                                            fontWeight: 'bold',
                                            marginBottom: '15px'
                                        }}>
                                            {student.groupNumber > 0 ? `Nhóm ${student.groupNumber} • ${groupCount}/3` : 'Chưa có nhóm'}
                                        </div>
                                        
                                        <div style={{ borderTop: '1px solid #eef0f3', width: '100%', paddingTop: '15px', marginTop: 'auto' }}>
                                            
                                            {isMyGroup ? (
                                                <div style={{ color: '#1e8e3e', fontSize: '0.85rem', fontWeight: '600' }}><i className="bi bi-check-circle-fill"></i> Chung nhóm</div>
                                            ) : student.groupNumber === 0 ? (
                                                <button 
                                                    onClick={() => handleInvite(student.id)}
                                                    disabled={!myGroupId || getGroupCount(myGroupId) >= 3}
                                                    style={{ 
                                                        width: '100%', padding: '8px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', border: 'none', 
                                                        cursor: (!myGroupId || getGroupCount(myGroupId) >= 3) ? 'not-allowed' : 'pointer',
                                                        backgroundColor: (!myGroupId || getGroupCount(myGroupId) >= 3) ? '#f1f5f9' : '#e6f4ea',
                                                        color: (!myGroupId || getGroupCount(myGroupId) >= 3) ? '#94a3b8' : '#1e8e3e',
                                                    }}
                                                >
                                                    {(!myGroupId) ? 'Bạn chưa có nhóm' : (getGroupCount(myGroupId) >= 3 ? 'Nhóm bạn đã đầy' : 'Mời tham gia')}
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleJoinRequest(student.groupNumber)}
                                                    disabled={myGroupId !== null || isFull || isRequested}
                                                    style={{ 
                                                        width: '100%', padding: '8px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', border: 'none', 
                                                        cursor: (myGroupId !== null || isFull || isRequested) ? 'not-allowed' : 'pointer',
                                                        backgroundColor: (myGroupId !== null || isFull) ? '#f1f5f9' : (isRequested ? '#fff8e6' : '#002d5f'),
                                                        color: (myGroupId !== null || isFull) ? '#94a3b8' : (isRequested ? '#d97706' : 'white'),
                                                    }}
                                                >
                                                    {myGroupId !== null ? 'Bạn đã có nhóm' : (isFull ? 'Nhóm đã đầy' : (isRequested ? 'Đã gửi yêu cầu' : 'Tham gia nhóm'))}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentGroupSpace;