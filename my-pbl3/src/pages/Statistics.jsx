import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

// Dữ liệu thống kê từ năm 2020 (Giả lập)
const data = [
    { year: '2020', total: 380, quality: 185 },
    { year: '2021', total: 450, quality: 192 },
    { year: '2022', total: 510, quality: 205 },
    { year: '2023', total: 540, quality: 215 },
    { year: '2024', total: 590, quality: 220 },
    { year: '2025', total: 530, quality: 183 },
];

const facultyData = [
    { name: 'Công nghệ Thông tin', value: 1186 },
    { name: 'Điện - Điện tử', value: 119},
    { name: 'Cơ khí', value: 736 },
    { name: 'Xây dựng', value: 485 },
];

const COLORS = ['#003366', '#0066cc', '#00a3e0', '#66ccff'];

const Statistics = () => {
    const navigate = useNavigate();

    const totalProjects = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalQuality = data.reduce((acc, curr) => acc + curr.quality, 0);

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#f4f7fe', 
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
            margin: 0,
            padding: 0,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header cố định với nút quay lại */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: '#f4f7fe',
                padding: '20px 32px 0 32px',
                flexShrink: 0
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '20px'
                }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{
                            border: 'none',
                            background: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#003366',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                    >
                        ←
                    </button>
                    <div>
                        <h1 style={{ margin: 0, color: '#003366', fontSize: '1.8rem', fontWeight: '700' }}>
                            Thống kê Đồ án PBL (2020 - 2025)
                        </h1>
                        <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                            Báo cáo tổng hợp số lượng và chất lượng đồ án tại Thư viện PBL Bách Khoa
                        </p>
                    </div>
                </div>
                <div style={{ textAlign: 'right', marginTop: '-40px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Cập nhật: 03/05/2026</div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div style={{ padding: '0 32px 40px 32px', flex: 1 }}>
                {/* Các thẻ số liệu */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '24px', 
                    marginBottom: '40px' 
                }}>
                    <MetricCard 
                        emoji="📚" 
                        label="Tổng cộng Đồ án" 
                        value={totalProjects} 
                        color="#003366" 
                        subLabel="Đăng tải trên hệ thống" 
                    />
                    <MetricCard 
                        emoji="⭐" 
                        label="Đồ án Chất lượng cao" 
                        value={totalQuality} 
                        color="#1e8e3e" 
                        subLabel="Được kiểm duyệt nghiêm ngặt" 
                    />
                    <MetricCard 
                        emoji="👀" 
                        label="Lượt tham khảo" 
                        value="15,400+" 
                        color="#d97706" 
                        subLabel="Từ sinh viên các khóa" 
                    />
                    <MetricCard 
                        emoji="👨‍🏫" 
                        label="Giảng viên hướng dẫn" 
                        value="180+" 
                        color="#7c3aed" 
                        subLabel="Tham gia hội đồng đánh giá" 
                    />
                </div>

                {/* Biểu đồ cột + tròn */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
                    gap: '30px', 
                    marginBottom: '30px' 
                }}>
                    <ChartCard title="Sự phát triển số lượng Đồ án theo năm">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip 
                                    cursor={{ fill: '#f8f9fa' }}
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="total" name="Tổng đồ án" fill="#003366" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="quality" name="Chất lượng cao" fill="#00a3e0" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Tỉ lệ theo Chuyên ngành">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={facultyData}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {facultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" layout="horizontal" align="center" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Biểu đồ vùng */}
                <ChartCard title="Xu hướng Đồ án Chất lượng tốt được lưu trữ">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#0066cc" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="quality" name="Số lượng lưu trữ" stroke="#0066cc" strokeWidth={3} fillOpacity={1} fill="url(#colorQuality)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: '#eef2ff', borderRadius: '12px', color: '#003366', fontSize: '0.85rem' }}>
                        ℹ️ Mỗi năm hệ thống tiếp nhận khoảng <strong>200 đồ án xuất sắc</strong> được hội đồng chấm điểm trên 9.0 để đưa vào Thư viện tham khảo dành cho sinh viên khóa sau.
                    </div>
                </ChartCard>
            </div>
        </div>
    );
};

// Component thẻ số liệu (dùng emoji thay vì icon Bootstrap)
const MetricCard = ({ emoji, label, value, color, subLabel }) => (
    <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)', 
        border: '1px solid #eef0f3', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        transition: 'transform 0.2s'
    }}>
        <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '16px', 
            backgroundColor: `${color}10`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '1.8rem'
        }}>
            {emoji}
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{subLabel}</div>
        </div>
    </div>
);

// Component khung biểu đồ
const ChartCard = ({ title, children }) => (
    <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.02)', 
        border: '1px solid #eef0f3',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#003366', fontSize: '1.1rem', fontWeight: '600' }}>{title}</h3>
        <div style={{ height: '320px', width: '100%' }}>
            {children}
        </div>
    </div>
);

export default Statistics;