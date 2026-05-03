import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

// Dữ liệu thống kê từ năm 2020 (Giả lập dựa trên mô tả của bạn)
const data = [
    { year: '2020', total: 380, quality: 185 },
    { year: '2021', total: 450, quality: 192 },
    { year: '2022', total: 510, quality: 205 },
    { year: '2023', total: 540, quality: 215 },
    { year: '2024', total: 590, quality: 220 },
    { year: '2025', total: 530, quality: 183 }, // Dữ liệu tính đến hiện tại
];

// Dữ liệu cho biểu đồ tròn (Phân bố theo khoa mẫu)
const facultyData = [
    { name: 'Công nghệ Thông tin', value: 1200 },
    { name: 'Điện - Điện tử', value: 800 },
    { name: 'Cơ khí', value: 600 },
    { name: 'Xây dựng', value: 400 },
];

const COLORS = ['#003366', '#0066cc', '#00a3e0', '#66ccff'];

const Statistics = () => {
    const navigate = useNavigate();

    // Tính toán tổng số đồ án
    const totalProjects = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalQuality = data.reduce((acc, curr) => acc + curr.quality, 0);

    return (
        <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', padding: '30px 40px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ border: 'none', background: 'white', padding: '8px 15px', borderRadius: '8px', marginBottom: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#003366', fontWeight: '600', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                    >
                        <i className="bi bi-arrow-left"></i> Quay lại
                    </button>
                    <h1 style={{ margin: 0, color: '#003366', fontSize: '1.8rem', fontWeight: '700' }}>Thống kê Đồ án PBL (2020 - 2025)</h1>
                    <p style={{ margin: '5px 0 0', color: '#64748b' }}>Báo cáo tổng hợp số lượng và chất lượng đồ án tại Thư viện PBL Bách Khoa</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Cập nhật lần cuối</div>
                    <div style={{ fontWeight: 'bold', color: '#003366' }}>03/05/2026</div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                <MetricCard icon="bi-archive" label="Tổng cộng Đồ án" value={totalProjects} color="#003366" subLabel="Đăng tải trên hệ thống" />
                <MetricCard icon="bi-patch-check" label="Đồ án Chất lượng cao" value={totalQuality} color="#1e8e3e" subLabel="Được kiểm duyệt nghiêm ngặt" />
                <MetricCard icon="bi-journal-bookmark-fill" label="Lượt tham khảo" value="15,400+" color="#d97706" subLabel="Từ sinh viên các khóa" />
                <MetricCard icon="bi-people" label="Giảng viên hướng dẫn" value="180+" color="#7c3aed" subLabel="Tham gia hội đồng đánh giá" />
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
                
                {/* Main Bar Chart */}
                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', border: '1px solid #eef0f3' }}>
                    <h3 style={{ margin: '0 0 25px 0', color: '#003366', fontSize: '1.1rem' }}>Sự phát triển số lượng Đồ án theo năm</h3>
                    <div style={{ height: '350px' }}>
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
                    </div>
                </div>

                {/* Pie Chart */}
                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', border: '1px solid #eef0f3' }}>
                    <h3 style={{ margin: '0 0 25px 0', color: '#003366', fontSize: '1.1rem' }}>Tỉ lệ theo Chuyên ngành</h3>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={facultyData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {facultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" layout="vertical" align="right" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Growth Area Chart */}
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', border: '1px solid #eef0f3' }}>
                <h3 style={{ margin: '0 0 25px 0', color: '#003366', fontSize: '1.1rem' }}>Xu hướng Đồ án Chất lượng tốt được lưu trữ</h3>
                <div style={{ height: '300px' }}>
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
                </div>
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '10px', color: '#003366', fontSize: '0.9rem' }}>
                    <i className="bi bi-info-circle-fill" style={{ marginRight: '10px' }}></i>
                    Mỗi năm hệ thống tiếp nhận khoảng <strong>200 đồ án xuất sắc</strong> được hội đồng chấm điểm trên 9.0 để đưa vào Thư viện tham khảo dành cho sinh viên khóa sau.
                </div>
            </div>
        </div>
    );
};

// Sub-component for metric cards
const MetricCard = ({ icon, label, value, color, subLabel }) => (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eef0f3', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: '1.5rem' }}>
            <i className={`bi ${icon}`}></i>
        </div>
        <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#333', margin: '2px 0' }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{subLabel}</div>
        </div>
    </div>
);

export default Statistics;
