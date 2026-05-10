import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const SV_WorkShop = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentUserID = searchParams.get('userID');
    const currentRole = searchParams.get('role');
    const currentClassID = searchParams.get('classID') || "PBL-CNPM-2025";

    const [activeTab, setActiveTab] = useState('thong-bao');
    const [classData, setClassData] = useState(null);

    const [database, setDatabase] = useState({
        "PBL-CNPM-2025": {
            tenLop: "Công nghệ phần mềm",
            gvhd: "TS. Nguyễn Văn A",
            hocKy: "Học kỳ I - 2025/2026",
            thongBao: [
                { tieuDe: "Lịch nộp báo cáo cuối kỳ", noiDung: "Nộp trước 15/05/2026", mau: "#003366" }
            ],
            nhom: {
                maxSize: 3,
                danhSachNhom: [
                    { id: 1, owner: "SV01", thanhVien: ["SV01", "SV02"] },
                    { id: 2, owner: "SV03", thanhVien: ["SV03"] }
                ],
                userDangO: null
            },
            deTai: [
                { ten: "Hệ thống bệnh viện", ngay: "28/01/2026", status: "wait", statusText: "Chờ duyệt", icon: "fa-clock" }
            ],
            keHoach: [
                { moc: "Milestone 1", noiDung: "Phân tích", han: "15/02/2026", status: "done", statusText: "Công khai" }
            ],
            nopBai: [
                { giaiDoan: "GĐ1", han: "15/02/2026", file: "bao-cao.pdf", status: "done", statusText: "Đã nộp", uploadText: "Upload lại" }
            ],
            diem: { so: "8.5", xepLoai: "Giỏi" }
        }
    });

    useEffect(() => {
        if (database[currentClassID]) {
            setClassData(database[currentClassID]);
        }
    }, [currentClassID, database]);

    const handleJoinGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        if (nhom.userDangO) return alert("Bạn đã có nhóm!");

        const group = nhom.danhSachNhom.find(g => g.id === groupId);
        if (group && group.thanhVien.length < nhom.maxSize) {
            group.thanhVien.push(currentUserID || "SVXX");
            nhom.userDangO = groupId;
            setDatabase(newData);
        }
    };

    const handleLeaveGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        const group = nhom.danhSachNhom.find(g => g.id === groupId);

        if (group.owner === currentUserID) return alert("Trưởng nhóm không thể rời!");

        group.thanhVien = group.thanhVien.filter(u => u !== currentUserID);
        nhom.userDangO = null;
        setDatabase(newData);
    };

    const handleCreateGroup = () => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        if (nhom.userDangO) return alert("Đã có nhóm!");

        const newId = nhom.danhSachNhom.length > 0 ? Math.max(...nhom.danhSachNhom.map(g => g.id)) + 1 : 1;
        nhom.danhSachNhom.push({
            id: newId,
            owner: currentUserID || "SVXX",
            thanhVien: [currentUserID || "SVXX"]
        });
        nhom.userDangO = newId;
        setDatabase(newData);
    };

    const handleDeleteGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        const group = nhom.danhSachNhom.find(g => g.id === groupId);

        if (group.owner !== currentUserID) return alert("Chỉ trưởng nhóm mới được xoá!");

        nhom.danhSachNhom = nhom.danhSachNhom.filter(g => g.id !== groupId);
        nhom.userDangO = null;
        setDatabase(newData);
    };

    if (!classData) return <div>Đang tải...</div>;

    const tableHeaderStyle = { padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee', color: '#003366', fontWeight: 'bold' };
    const tableCellStyle = { padding: '15px', borderBottom: '1px solid #eee' };

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
            </header>

            <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(`/sv-truy-cap-lop?userID=${currentUserID}&role=${currentRole}`)} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại danh sách lớp
                    </button>
                </div>
                
                <div className="class-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ color: '#003366', margin: 0, fontSize: '1.8rem' }}>{classData.tenLop}</h2>
                        <p style={{ color: '#666', margin: '5px 0 0' }}>Giảng viên: <strong>{classData.gvhd}</strong> | <span>{classData.hocKy}</span></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', marginBottom: '5px', color: '#888' }}>Mã lớp</p>
                        <div style={{ padding: '8px 15px', background: '#eef2f7', borderRadius: '6px', fontWeight: 'bold', color: '#003366' }}>{currentClassID}</div>
                    </div>
                </div>

                <div className="tab-menu" style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {[
                        { id: 'thong-bao', label: 'Thông báo', icon: 'far fa-bell' },
                        { id: 'nhom', label: 'Nhóm', icon: 'fas fa-users' },
                        { id: 'de-tai', label: 'Đề tài', icon: 'far fa-file-alt' },
                        { id: 'ke-hoach', label: 'Kế hoạch', icon: 'far fa-calendar-check' },
                        { id: 'nop-bai', label: 'Nộp bài', icon: 'fas fa-upload' },
                        { id: 'diem', label: 'Điểm', icon: 'far fa-star' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            className="btn"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                padding: '10px 20px', 
                                borderRadius: '8px', 
                                border: 'none', 
                                backgroundColor: activeTab === tab.id ? '#003366' : 'white', 
                                color: activeTab === tab.id ? 'white' : '#666',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                whiteSpace: 'nowrap'
                            }} 
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={tab.icon}></i> {tab.label}
                        </button>
                    ))}
                </div>

                <div className="stats-card" style={{ padding: '30px', textAlign: 'left' }}>
                    {activeTab === 'thong-bao' && (
                        <div>
                            {classData.thongBao.map((item, idx) => (
                                <div key={idx} style={{ borderLeft: `5px solid ${item.mau}`, padding: '15px', backgroundColor: '#f9fbff', borderRadius: '4px' }}>
                                    <h4 style={{ margin: '0 0 10px', color: '#003366' }}>{item.tieuDe}</h4>
                                    <p style={{ margin: 0, color: '#555' }}>{item.noiDung}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'nhom' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, color: '#003366' }}>Danh sách nhóm</h3>
                                <button className="btn blue" onClick={handleCreateGroup} style={{ width: 'auto', padding: '10px 20px', color: 'white' }}>+ Tạo nhóm</button>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Nhóm</th>
                                        <th style={tableHeaderStyle}>Thành viên</th>
                                        <th style={tableHeaderStyle}>Số lượng</th>
                                        <th style={tableHeaderStyle}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classData.nhom.danhSachNhom.map(group => {
                                        const isFull = group.thanhVien.length >= classData.nhom.maxSize;
                                        const isOwner = group.owner === currentUserID;
                                        const isUserInThisGroup = classData.nhom.userDangO === group.id;
                                        return (
                                            <tr key={group.id}>
                                                <td style={tableCellStyle}>Nhóm {group.id}</td>
                                                <td style={tableCellStyle}>
                                                    {group.thanhVien.map(tv => tv === group.owner ? "👑 " + tv : tv).join(", ")}
                                                </td>
                                                <td style={tableCellStyle}>{group.thanhVien.length}/{classData.nhom.maxSize}</td>
                                                <td style={tableCellStyle}>
                                                    {isUserInThisGroup ? (
                                                        isOwner ? (
                                                            <button className="btn" style={{ color: '#dc3545', border: '1px solid #dc3545', width: 'auto' }} onClick={() => handleDeleteGroup(group.id)}>Hủy nhóm</button>
                                                        ) : (
                                                            <button className="btn" style={{ color: '#ffc107', border: '1px solid #ffc107', width: 'auto' }} onClick={() => handleLeaveGroup(group.id)}>Rời nhóm</button>
                                                        )
                                                    ) : (
                                                        !classData.nhom.userDangO && !isFull ? (
                                                            <button className="btn blue" style={{ color: 'white', width: 'auto' }} onClick={() => handleJoinGroup(group.id)}>Tham gia</button>
                                                        ) : (
                                                            <span style={{ color: 'gray' }}>—</span>
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'de-tai' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Tên đề tài</th>
                                    <th style={tableHeaderStyle}>Ngày</th>
                                    <th style={tableHeaderStyle}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classData.deTai.map((dt, idx) => (
                                    <tr key={idx}>
                                        <td style={tableCellStyle}>{dt.ten}</td>
                                        <td style={tableCellStyle}>{dt.ngay}</td>
                                        <td style={tableCellStyle}>
                                            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: dt.status === 'done' ? '#e6f7ee' : '#fff4e5', color: dt.status === 'done' ? '#28a745' : '#ff9800' }}>
                                                <i className={`far ${dt.icon}`}></i> {dt.statusText}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'ke-hoach' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Mốc</th>
                                    <th style={tableHeaderStyle}>Nội dung</th>
                                    <th style={tableHeaderStyle}>Hạn</th>
                                    <th style={tableHeaderStyle}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classData.keHoach.map((kh, idx) => (
                                    <tr key={idx}>
                                        <td style={tableCellStyle}>{kh.moc}</td>
                                        <td style={tableCellStyle}>{kh.noiDung}</td>
                                        <td style={tableCellStyle}>{kh.han}</td>
                                        <td style={tableCellStyle}>
                                            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#e6f7ee', color: '#28a745' }}>{kh.statusText}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'nop-bai' && (
                        <div>
                            <h4 style={{ color: '#003366', marginBottom: '15px' }}>Báo cáo tiến độ</h4>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Giai đoạn</th>
                                        <th style={tableHeaderStyle}>Deadline</th>
                                        <th style={tableHeaderStyle}>File</th>
                                        <th style={tableHeaderStyle}>Trạng thái</th>
                                        <th style={tableHeaderStyle}>Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classData.nopBai.map((nb, idx) => (
                                        <tr key={idx}>
                                            <td style={tableCellStyle}><b>{nb.giaiDoan}</b></td>
                                            <td style={tableCellStyle}>{nb.han}</td>
                                            <td style={tableCellStyle}>{nb.file}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#e6f7ee', color: '#28a745' }}>{nb.statusText}</span>
                                            </td>
                                            <td style={tableCellStyle}><button className="btn" style={{ width: 'auto', fontSize: '0.8rem' }}>{nb.uploadText}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h4 style={{ color: '#003366', marginBottom: '15px' }}>Nộp PBL cuối kỳ</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '0.9rem', color: '#666', display: 'block', marginBottom: '5px' }}>Báo cáo (.pdf, .doc)</label>
                                    <div style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', borderRadius: '8px', color: '#999', cursor: 'pointer' }}>Chọn file</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.9rem', color: '#666', display: 'block', marginBottom: '5px' }}>Mã nguồn (.zip)</label>
                                    <div style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', borderRadius: '8px', color: '#999', cursor: 'pointer' }}>Chọn file</div>
                                </div>
                            </div>
                            <button className="btn blue" style={{ width: '200px', margin: '0 auto', display: 'block', color: 'white' }}>Nộp bài</button>
                        </div>
                    )}

                    {activeTab === 'diem' && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>ĐIỂM TỔNG KẾT</p>
                            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: '#003366', margin: '10px 0' }}>{classData.diem.so}</div>
                            <p style={{ fontSize: '1.2rem', color: '#28a745', fontWeight: 'bold' }}>Xếp loại: {classData.diem.xepLoai}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SV_WorkShop;
