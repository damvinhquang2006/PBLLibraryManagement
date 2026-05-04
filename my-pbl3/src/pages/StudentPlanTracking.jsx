import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPlanTracking = () => {
    const navigate = useNavigate();
    const today = new Date();
    
    const [deadlines] = useState([
        { id: 1, task: 'Hoàn thành báo cáo chương 1', date: new Date(2026, 4, 5, 23, 59), milestone: 'Milestone 1', type: 'High' },
        { id: 2, task: 'Thiết kế giao diện Figma', date: new Date(2026, 4, 10, 12, 0), milestone: 'Milestone 2', type: 'Medium' },
        { id: 3, task: 'Cài đặt Database mẫu', date: new Date(2026, 4, 3, 21, 0), milestone: 'Milestone 1', type: 'Urgent' },
        { id: 4, task: 'Nộp tài liệu tham khảo', date: new Date(2026, 4, 15, 17, 0), milestone: 'Milestone 3', type: 'Low' },
    ]);

    const getTimeRemaining = (deadlineDate) => {
        const diff = deadlineDate - new Date();
        if (diff <= 0) return 'Đã hết hạn';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        if (days > 0) return `Còn ${days} ngày ${hours} giờ`;
        return `Còn ${hours} giờ`;
    };

    const sortedDeadlines = [...deadlines].sort((a, b) => a.date - b.date);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
            margin: 0,
            padding: 0,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ padding: '25px 40px 0 40px', flexShrink: 0 }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ 
                        border: 'none', 
                        background: 'none', 
                        color: '#002d5f', 
                        fontWeight: 'bold', 
                        cursor: 'pointer', 
                        marginBottom: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '1rem'
                    }}
                >
                    ← Quay lại
                </button>
                <h1 style={{ margin: '0 0 10px 0', color: '#002d5f', fontSize: '1.8rem' }}>Theo dõi kế hoạch & Deadline</h1>
                <p style={{ color: '#64748b', marginBottom: '30px' }}>Quản lý tiến độ đồ án theo lịch và nhiệm vụ</p>
            </div>

            <div style={{ flex: 1, padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* LỊCH DƯƠNG - thu nhỏ kích thước: rộng 55%, tự động giảm chiều cao */}
                <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '24px 20px', 
                    borderRadius: '24px', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
                    width: '43%',          // Giảm chiều rộng còn 43% so với container cha
                    margin: '0 auto',      // Căn giữa
                    transition: 'all 0.2s'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                        <h2 style={{ margin: 0, color: '#002d5f', fontSize: '1.2rem' }}>Tháng {currentMonth + 1}, {currentYear}</h2>
                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>📅 Hôm nay: {today.toLocaleDateString('vi-VN')}</div>
                    </div>

                    {/* Grid lịch - co giãn theo chiều ngang của khối cha */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(7, 1fr)', 
                        gap: '8px', 
                        textAlign: 'center'
                    }}>
                        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                            <div key={d} style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '6px', padding: '4px 0' }}>{d}</div>
                        ))}
                        {calendarDays.map((day, idx) => {
                            const isToday = day === today.getDate();
                            const hasDeadline = deadlines.some(d => d.date.getDate() === day && d.date.getMonth() === currentMonth);
                            return (
                                <div 
                                    key={idx} 
                                    style={{ 
                                        aspectRatio: '1 / 1', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        borderRadius: '12px', 
                                        fontSize: '0.9rem', 
                                        cursor: day ? 'pointer' : 'default',
                                        backgroundColor: isToday ? '#002d5f' : (hasDeadline ? '#eef2ff' : 'transparent'),
                                        color: isToday ? '#fff' : (hasDeadline ? '#002d5f' : '#475569'),
                                        fontWeight: (isToday || hasDeadline) ? 'bold' : 'normal',
                                        border: hasDeadline && !isToday ? '1px solid #002d5f' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {day}
                                    {hasDeadline && !isToday && (
                                        <div style={{ position: 'relative', marginTop: '22px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#002d5f' }}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Ghi chú */}
                    <div style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#f8f9fa', borderRadius: '12px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#475569' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#002d5f' }}></div> Hôm nay
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#475569' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eef2ff', border: '1px solid #002d5f' }}></div> Có deadline
                        </div>
                    </div>
                </div>

                {/* DANH SÁCH NHIỆM VỤ (giữ nguyên) */}
                <div>
                    <h2 style={{ color: '#002d5f', fontSize: '1.6rem', marginBottom: '10px' }}>📋 Danh sách nhiệm vụ</h2>
                    <p style={{ color: '#64748b', marginBottom: '25px' }}>Sắp xếp theo thời hạn gần nhất</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {sortedDeadlines.map(item => {
                            const isUrgent = item.type === 'Urgent';
                            return (
                                <div 
                                    key={item.id}
                                    style={{ 
                                        backgroundColor: '#fff', 
                                        padding: '20px 25px', 
                                        borderRadius: '20px', 
                                        borderLeft: `6px solid ${isUrgent ? '#ef4444' : '#002d5f'}`,
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)', 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '15px'
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748b' }}>
                                                {item.milestone}
                                            </span>
                                            
                                        </div>
                                        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#334155' }}>{item.task}</h3>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                            🗓️ Hạn chót: {item.date.toLocaleString('vi-VN')}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', minWidth: '130px' }}>
                                        <div style={{ 
                                            padding: '6px 14px', 
                                            borderRadius: '40px', 
                                            fontWeight: 'bold', 
                                            fontSize: '0.8rem',
                                            backgroundColor: isUrgent ? '#fef2f2' : '#f0f9ff',
                                            color: isUrgent ? '#ef4444' : '#002d5f',
                                            display: 'inline-block',
                                            marginBottom: '8px'
                                        }}>
                                            {getTimeRemaining(item.date)}
                                        </div>
                                        <div>
                                            <button style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                                Chi tiết →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {sortedDeadlines.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>
                            Không có nhiệm vụ nào trong tháng này.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentPlanTracking;