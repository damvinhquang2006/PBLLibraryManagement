import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

// Cơ sở dữ liệu đề tài tham khảo tương đồng (Mock AI Database)
const REFERENCE_TOPICS_DB = {
    'T01': [
        { name: 'Nghiên cứu mô hình CNN nhận diện khuôn mặt trong phòng thi', author: 'Phạm Minh Huy - 20T_DT1', year: '2023', similarity: 96, summary: 'Báo cáo nghiên cứu tối ưu tốc độ nhận diện bằng mô hình MobileNet-SSD và giảm thiểu ảnh hưởng của cường độ ánh sáng trong phòng thi.' },
        { name: 'Xây dựng ứng dụng chấm công bằng FaceID tích hợp camera giám sát', author: 'Trần Thu Thủy - 20T_CLC1', year: '2024', similarity: 88, summary: 'Đề tài ứng dụng thuật toán Facenet kết hợp cơ sở dữ liệu PostgreSQL để theo dõi thời gian check-in/check-out của nhân viên thời gian thực.' },
        { name: 'Hệ thống kiểm soát ra vào tòa nhà thông minh bằng AI', author: 'Lê Tấn Phát - 20T_DT2', year: '2023', similarity: 82, summary: 'Hệ thống mở khóa cửa tự động thông minh dựa trên kết quả xác thực khuôn mặt sử dụng kit vi điều khiển Raspberry Pi.' }
    ],
    'T02': [
        { name: 'Website quản lý ngân sách gia đình thông minh tích hợp ví điện tử', author: 'Nguyễn Hoài Nam - 20T_CLC2', year: '2023', similarity: 94, summary: 'Phân tích thói quen tiêu dùng hàng ngày của hộ gia đình và vẽ biểu đồ cảnh báo chi tiêu vượt ngưỡng sử dụng thư viện Recharts.' },
        { name: 'Hệ thống quản lý chi tiêu tích hợp quét hóa đơn bằng công nghệ OCR', author: 'Lưu Ngọc Anh - 21T_DT1', year: '2024', similarity: 89, summary: 'Ứng dụng thư viện Tesseract OCR để trích xuất nhanh thông tin số tiền trên hóa đơn mua sắm giấy và tự động phân loại chi phí vào cơ sở dữ liệu.' }
    ],
    'T03': [
        { name: 'Website bán linh kiện máy tính tích hợp gợi ý sản phẩm lai', author: 'Đỗ Hoàng Việt - 20T_CLC1', year: '2023', similarity: 95, summary: 'Đề tài kết hợp thuật toán lọc cộng tác (Collaborative) và lọc dựa trên nội dung (Content-based) để tăng hiệu quả gợi ý sản phẩm tương ứng cho người mua.' },
        { name: 'Website thương mại điện tử DUT-Shop chuẩn SPA bảo mật cao', author: 'Võ Thị Tuyết - 20T_DT2', year: '2023', similarity: 85, summary: 'Xây dựng website bán hàng chuẩn SEO sử dụng ReactJS, NodeJS Express và Spring Boot, tích hợp API thanh toán VNPay an toàn.' }
    ],
    'T04': [
        { name: 'Ứng dụng chatbot tư vấn tuyển sinh đại học bằng Dialogflow', author: 'Phạm Đức Anh - 19T_CLC2', year: '2022', similarity: 91, summary: 'Xây dựng kịch bản chatbot tự động hỗ trợ giải đáp nhanh các thắc mắc về điểm chuẩn tuyển sinh qua Fanpage Messenger tích hợp Webhook Java.' },
        { name: 'Chatbot thông minh hỗ trợ sinh viên DUT tra cứu học phần học tập', author: 'Trần Văn Cường - 20T_DT1', year: '2023', similarity: 87, summary: 'Sử dụng công nghệ AI RAG kết hợp với dữ liệu đào tạo PDF nội bộ để cung cấp thông tin học phần chính xác cho sinh viên.' }
    ],
    'T05': [
        { name: 'Phần mềm quản lý thư viện trường THPT bằng Java Swing và MySQL', author: 'Nguyễn Văn Minh - 19T_DT2', year: '2021', similarity: 92, summary: 'Hệ thống quản lý sách truyền thống, hỗ trợ in nhãn barcode mã vạch và phân quyền nhân viên thư viện chặt chẽ.' },
        { name: 'Xây dựng hệ thống quản lý mượn sách tự động tích hợp công nghệ RFID', author: 'Đặng Quốc Huy - 20T_DT2', year: '2023', similarity: 84, summary: 'Giải pháp thông minh giúp mượn/trả sách không tiếp xúc tại thư viện trường Đại học thông qua sóng vô tuyến RFID.' }
    ]
};

const SV_WorkShop = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentUserID = searchParams.get('userID') || 'SV01';
    const currentRole = searchParams.get('role') || 'STUDENT';
    const currentClassID = searchParams.get('classID') || "PBL-CNPM-2025";

    const [activeTab, setActiveTab] = useState('thong-bao');
    const [classData, setClassData] = useState(null);

    // Toast Alert State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
    };

    // Danh sách Đề tài mẫu giả lập phía Sinh viên
    const [topics, setTopics] = useState([
        { 
            id: 'T01', 
            name: 'Hệ thống nhận diện khuôn mặt điểm danh sinh viên', 
            description: 'Xây dựng ứng dụng điểm danh sinh viên tự động sử dụng thư viện OpenCV, face_recognition và mô hình học sâu. Hỗ trợ kết nối Camera IP, lưu trữ lịch sử điểm danh và xuất file báo cáo Excel.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false,
            changeReason: ''
        },
        { 
            id: 'T02', 
            name: 'Ứng dụng quản lý tài chính cá nhân thông minh', 
            description: 'Phát triển ứng dụng giúp quản lý thu nhập, chi tiêu, đặt mục tiêu tiết kiệm và phân tích biểu đồ tài chính trực quan. Tích hợp AI gợi ý phân bổ ngân sách thông minh theo phương pháp 50/30/20.',
            status: 'TAKEN', 
            groupId: 99, // Đã bị một nhóm khác (ví dụ: nhóm 99) chọn trước
            groupNumber: 99,
            changeRequested: false 
        },
        { 
            id: 'T03', 
            name: 'Website bán thiết bị điện tử gia dụng tích hợp AI gợi ý', 
            description: 'Xây dựng website thương mại điện tử hoàn chỉnh với giỏ hàng, cổng thanh toán và quản trị sản phẩm. Sử dụng thuật toán lọc cộng tác (Collaborative Filtering) để gợi ý sản phẩm phù hợp với thói quen mua sắm của từng khách hàng.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        },
        { 
            id: 'T04', 
            name: 'Xây dựng chatbot hỗ trợ tuyển sinh DUT', 
            description: 'Hệ thống chatbot thông minh dựa trên mô hình ngôn ngữ lớn (RAG) giúp trả lời tự động các câu hỏi về thông tin tuyển sinh, ngành học, điểm chuẩn và học phí của trường Đại học Bách khoa.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        },
        { 
            id: 'T05', 
            name: 'Hệ thống quản lý thư viện số trường đại học', 
            description: 'Ứng dụng hỗ trợ mượn/trả sách, tra cứu tài liệu học tập số trực tuyến, tích hợp thẻ thành viên QR code và gửi email thông báo tự động khi sách đến hạn trả.',
            status: 'AVAILABLE', 
            groupId: null, 
            groupNumber: null,
            changeRequested: false 
        }
    ]);

    // Trạng thái đề tài nhóm hiện tại đã chọn
    const [chosenTopic, setChosenTopic] = useState(null);

    // Trạng thái AI Loading giả lập
    const [aiLoading, setAiLoading] = useState(false);
    const [aiReferences, setAiReferences] = useState([]);
    const [selectedReferenceDetail, setSelectedReferenceDetail] = useState(null);

    // Trạng thái Modals của Sinh viên
    const [topicToSelect, setTopicToSelect] = useState(null);
    const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] = useState(false);
    const [changeRequestReason, setChangeRequestReason] = useState('');
    const [isTopicDetailModalOpen, setIsTopicDetailModalOpen] = useState(false);

    // Cơ sở dữ liệu lớp học PBL
    const [database, setDatabase] = useState({
        "PBL-CNPM-2025": {
            tenLop: "Công nghệ phần mềm (PBL-CNPM-2025)",
            gvhd: "TS. Nguyễn Văn A",
            hocKy: "Học kỳ I - 2025/2026",
            thongBao: [
                { tieuDe: "Thông báo đăng ký đề tài PBL", noiDung: "Sinh viên nhanh chóng tập hợp nhóm tối thiểu 2-3 người và chọn đề tài phù hợp trong mục Đề tài. Đề tài ở trạng thái Sẵn sàng mới có thể lựa chọn.", mau: "#003366" },
                { tieuDe: "Lịch nộp báo cáo cuối kỳ", noiDung: "Hạn cuối nộp báo cáo thuyết minh và mã nguồn ứng dụng là ngày 15/05/2026. Sinh viên chuẩn bị kỹ bài thuyết trình bảo vệ.", mau: "#dc3545" }
            ],
            nhom: {
                maxSize: 3,
                danhSachNhom: [
                    { id: 1, owner: "SV01", thanhVien: ["SV01", "SV02"] },
                    { id: 2, owner: "SV03", thanhVien: ["SV03"] }
                ],
                userDangO: null // Sẽ được cập nhật khi học sinh tương tác
            },
            keHoach: [
                { moc: "Milestone 1", noiDung: "Phân tích yêu cầu và thiết kế Database", han: "15/02/2026", status: "done", statusText: "Công khai" }
            ],
            nopBai: [
                { giaiDoan: "GĐ1 (Báo cáo tiến độ)", han: "15/02/2026", file: "bao-cao-pbl3-cang.pdf", status: "done", statusText: "Đã nộp", uploadText: "Upload lại" },
                { giaiDoan: "Báo cáo cuối kỳ", han: "15/05/2026", file: "Chưa nộp", status: "pending", statusText: "Chưa nộp", uploadText: "Nộp báo cáo" }
            ],
            diem: { so: "8.8", xepLoai: "Giỏi" }
        }
    });

    useEffect(() => {
        if (database[currentClassID]) {
            setClassData(database[currentClassID]);
        }
    }, [currentClassID, database]);

    // Giả lập trễ tải AI Đề tài tham khảo
    useEffect(() => {
        if (chosenTopic) {
            setAiLoading(true);
            const timer = setTimeout(() => {
                setAiReferences(REFERENCE_TOPICS_DB[chosenTopic.id] || []);
                setAiLoading(false);
            }, 1500); // Trễ 1.5 giây để tạo hiệu ứng model AI chạy
            return () => clearTimeout(timer);
        } else {
            setAiReferences([]);
        }
    }, [chosenTopic]);

    // Xử lý tham gia nhóm
    const handleJoinGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        if (nhom.userDangO) return alert("Bạn đã có nhóm!");

        const group = nhom.danhSachNhom.find(g => g.id === groupId);
        if (group && group.thanhVien.length < nhom.maxSize) {
            group.thanhVien.push(currentUserID || "SVXX");
            nhom.userDangO = groupId;
            setDatabase(newData);
            showToast(`Đã tham gia Nhóm ${groupId} thành công!`);
        }
    };

    // Xử lý rời nhóm
    const handleLeaveGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        const group = nhom.danhSachNhom.find(g => g.id === groupId);

        if (group.owner === currentUserID) return alert("Trưởng nhóm không thể rời nhóm, vui lòng hủy nhóm!");

        group.thanhVien = group.thanhVien.filter(u => u !== currentUserID);
        nhom.userDangO = null;
        setDatabase(newData);
        
        // Nếu đang chọn đề tài thì reset đề tài của nhóm
        setChosenTopic(null);
        showToast("Đã rời khỏi nhóm.", "error");
    };

    // Xử lý tạo nhóm
    const handleCreateGroup = () => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        if (nhom.userDangO) return alert("Bạn đã có nhóm rồi!");

        const newId = nhom.danhSachNhom.length > 0 ? Math.max(...nhom.danhSachNhom.map(g => g.id)) + 1 : 1;
        nhom.danhSachNhom.push({
            id: newId,
            owner: currentUserID || "SVXX",
            thanhVien: [currentUserID || "SVXX"]
        });
        nhom.userDangO = newId;
        setDatabase(newData);
        showToast(`Tạo thành công Nhóm ${newId}. Bạn là Trưởng nhóm!`);
    };

    // Xử lý xóa nhóm
    const handleDeleteGroup = (groupId) => {
        const newData = { ...database };
        const nhom = newData[currentClassID].nhom;
        const group = nhom.danhSachNhom.find(g => g.id === groupId);

        if (group.owner !== currentUserID) return alert("Chỉ trưởng nhóm mới được xoá nhóm!");

        nhom.danhSachNhom = nhom.danhSachNhom.filter(g => g.id !== groupId);
        nhom.userDangO = null;
        setDatabase(newData);
        setChosenTopic(null);
        showToast("Đã giải tán nhóm cũ.", "error");
    };

    // Xử lý sinh viên Xác nhận chọn đề tài
    const handleConfirmSelectTopic = () => {
        if (!topicToSelect) return;

        const updatedTopics = topics.map(t => {
            if (t.id === topicToSelect.id) {
                const updated = {
                    ...t,
                    status: 'TAKEN',
                    groupId: classData.nhom.userDangO,
                    groupNumber: classData.nhom.userDangO
                };
                setChosenTopic(updated); // Đặt đề tài nhóm chọn
                return updated;
            }
            return t;
        });

        setTopics(updatedTopics);
        setTopicToSelect(null);
        showToast("Đăng ký đề tài thành công! AI đang tìm tài liệu tham khảo cho bạn...");
    };

    // Xử lý sinh viên gửi yêu cầu đổi đề tài
    const handleSendChangeRequest = (e) => {
        e.preventDefault();
        if (!changeRequestReason.trim()) {
            showToast("Vui lòng nhập lý do muốn đổi đề tài!", "error");
            return;
        }

        const updatedTopic = {
            ...chosenTopic,
            changeRequested: true,
            changeReason: changeRequestReason
        };

        setChosenTopic(updatedTopic);
        setTopics(topics.map(t => t.id === chosenTopic.id ? updatedTopic : t));
        setIsChangeRequestModalOpen(false);
        setChangeRequestReason('');
        showToast("Đã gửi yêu cầu đổi đề tài lên giảng viên duyệt.");
    };

    // Xử lý nộp báo cáo và hỏi ý kiến xuất bản nếu là báo cáo cuối kỳ
    const handleUpload = (nb, idx) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.docx,.doc';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const updatedNopBai = [...classData.nopBai];
                updatedNopBai[idx] = {
                    ...updatedNopBai[idx],
                    file: file.name,
                    status: "done",
                    statusText: "Đã nộp",
                    uploadText: "Upload lại"
                };

                const updatedDatabase = {
                    ...database,
                    [currentClassID]: {
                        ...classData,
                        nopBai: updatedNopBai
                    }
                };
                setDatabase(updatedDatabase);
                setClassData(updatedDatabase[currentClassID]);

                showToast(`Nộp file ${file.name} thành công!`);

                if (nb.giaiDoan === "Báo cáo cuối kỳ") {
                    localStorage.setItem('finalReportCompleted_' + currentClassID, 'true');
                    setTimeout(() => {
                        const confirmPublish = window.confirm(
                            "Chúc mừng nhóm bạn đã hoàn thành nộp Báo cáo cuối kỳ!\n\nBạn có muốn XUẤT BẢN bài báo cáo cuối kỳ này lên Thư viện số PBL ngay bây giờ không? (Dự án sẽ xuất bản trực tiếp mà không cần qua Admin phê duyệt)."
                        );
                        if (confirmPublish) {
                            showToast("Đồ án đã được XUẤT BẢN lên Thư viện số PBL thành công!", "success");
                        } else {
                            showToast("Đã lưu báo cáo cuối kỳ thành công.", "success");
                        }
                    }, 500);
                }
            }
        };
        fileInput.click();
    };

    if (!classData) return <div style={{ padding: '40px', fontSize: '1.2rem', color: '#003366', fontWeight: 'bold' }}>Đang tải thông tin lớp học...</div>;

    const tableHeaderStyle = { padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee', color: '#003366', fontWeight: 'bold' };
    const tableCellStyle = { padding: '15px', borderBottom: '1px solid #eee' };

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', position: 'relative' }}>
            
            {/* Custom Toast Alert */}
            {toast.show && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: toast.type === 'success' ? '#003366' : '#dc3545',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
                    zIndex: 9999,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderLeft: toast.type === 'success' ? '5px solid #10b981' : '5px solid #f43f5e',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
                    {toast.message}
                </div>
            )}

            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
            </header>

            <main className="container-fluid" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
                <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(`/sv-truy-cap-lop?userID=${currentUserID}&role=${currentRole}`)} 
                        className="back-btn"
                        style={{ border: 'none', background: 'none', color: '#003366', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại danh sách lớp
                    </button>
                </div>
                
                <div className="class-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ color: '#003366', margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>{classData.tenLop}</h2>
                        <p style={{ color: '#666', margin: '5px 0 0' }}>Giảng viên hướng dẫn: <strong>{classData.gvhd}</strong> | <span>{classData.hocKy}</span></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', marginBottom: '5px', color: '#888' }}>Mã lớp</p>
                        <div style={{ padding: '8px 15px', background: '#eef2f7', borderRadius: '6px', fontWeight: 'bold', color: '#003366' }}>{currentClassID}</div>
                    </div>
                </div>

                {/* Tab Menu sinh viên */}
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

                {/* KHU VỰC NỘI DUNG TABS */}
                <div className="stats-card" style={{ padding: '30px', textAlign: 'left', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    
                    {activeTab === 'thong-bao' && (
                        <div>
                            {classData.thongBao.map((item, idx) => (
                                <div key={idx} style={{ borderLeft: `5px solid ${item.mau}`, padding: '15px', backgroundColor: '#f9fbff', borderRadius: '4px', marginBottom: '15px' }}>
                                    <h4 style={{ margin: '0 0 10px', color: '#003366', fontWeight: 'bold' }}>{item.tieuDe}</h4>
                                    <p style={{ margin: 0, color: '#555', fontSize: '0.95rem' }}>{item.noiDung}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'nhom' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, color: '#003366', fontWeight: 'bold', fontSize: '1.25rem' }}>Quản lý nhóm PBL</h3>
                                {!classData.nhom.userDangO && (
                                    <button className="btn blue" onClick={handleCreateGroup} style={{ width: 'auto', padding: '10px 20px', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', backgroundColor: '#003366', cursor: 'pointer' }}>
                                        + Tạo nhóm mới
                                    </button>
                                )}
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Tên Nhóm</th>
                                        <th style={tableHeaderStyle}>Thành viên</th>
                                        <th style={tableHeaderStyle}>Số lượng</th>
                                        <th style={tableHeaderStyle}>Trưởng nhóm</th>
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
                                                <td style={tableCellStyle}><b>Nhóm {group.id}</b></td>
                                                <td style={tableCellStyle}>
                                                    {group.thanhVien.map(tv => tv === group.owner ? tv + " (Trưởng)" : tv).join(", ")}
                                                </td>
                                                <td style={tableCellStyle}>{group.thanhVien.length}/{classData.nhom.maxSize}</td>
                                                <td style={tableCellStyle}><span style={{ color: '#003366', fontWeight: 'bold' }}>{group.owner}</span></td>
                                                <td style={tableCellStyle}>
                                                    {isUserInThisGroup ? (
                                                        isOwner ? (
                                                            <button className="btn" style={{ color: '#dc3545', border: '1px solid #dc3545', width: 'auto', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} onClick={() => handleDeleteGroup(group.id)}>Hủy nhóm</button>
                                                        ) : (
                                                            <button className="btn" style={{ color: '#ffc107', border: '1px solid #ffc107', width: 'auto', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} onClick={() => handleLeaveGroup(group.id)}>Rời nhóm</button>
                                                        )
                                                    ) : (
                                                        !classData.nhom.userDangO && !isFull ? (
                                                            <button className="btn blue" style={{ color: 'white', width: 'auto', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', border: 'none', backgroundColor: '#003366' }} onClick={() => handleJoinGroup(group.id)}>Tham gia</button>
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

                    {/* DƯỚI ĐÂY LÀ ĐOẠN TÁI CẤU TRÚC TAB ĐỀ TÀI LỚN */}
                    {activeTab === 'de-tai' && (
                        <div>
                            {/* TH: SINH VIÊN CHƯA THAM GIA NHÓM */}
                            {!classData.nhom.userDangO ? (
                                <div style={{ textAlign: 'center', padding: '50px 20px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                                    <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#ff9800', marginBottom: '15px' }}></i>
                                    <h4 style={{ color: '#1e293b', fontWeight: 'bold', margin: '0 0 10px 0' }}>Bạn chưa tham gia nhóm PBL</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                                        Để đăng ký đề tài PBL, trước tiên bạn cần tham gia vào một nhóm hiện có hoặc tự tạo nhóm mới tại tab <strong>"Nhóm"</strong>.
                                    </p>
                                    <button 
                                        onClick={() => setActiveTab('nhom')}
                                        style={{
                                            padding: '10px 24px', backgroundColor: '#003366', color: 'white', border: 'none',
                                            borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                                        }}
                                    >
                                        Chuyển sang Tab Nhóm
                                    </button>
                                </div>
                            ) : (
                                // SINH VIÊN ĐÃ CÓ NHÓM
                                <div>
                                    {/* PHẦN 1: SINH VIÊN CHƯA CHỌN ĐỀ TÀI */}
                                    {!chosenTopic ? (
                                        <div>
                                            <div style={{ marginBottom: '20px', textAlign: 'left', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                                                <h3 style={{ margin: 0, color: '#003366', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                    Danh sách đề tài PBL có sẵn
                                                </h3>
                                                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
                                                    Nhóm của bạn (<strong style={{ color: '#003366' }}>Nhóm {classData.nhom.userDangO}</strong>) hãy lựa chọn một đề tài phù hợp dưới đây. Chỉ những đề tài có trạng thái Sẵn sàng mới có thể chọn.
                                                </p>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                                {topics.map(topic => (
                                                    <div 
                                                        key={topic.id} 
                                                        style={{ 
                                                            border: '1px solid #e2e8f0', 
                                                            borderRadius: '12px', 
                                                            padding: '24px',
                                                            backgroundColor: 'white',
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            gap: '30px'
                                                        }}
                                                    >
                                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                                <span style={{ backgroundColor: '#eef2ff', color: '#003366', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                                                    {topic.id}
                                                                </span>
                                                                <h4 style={{ margin: 0, fontWeight: 'bold', color: '#0f172a', fontSize: '1.1rem' }}>
                                                                    {topic.name}
                                                                </h4>
                                                                <span style={{ 
                                                                    padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold',
                                                                    backgroundColor: topic.status === 'AVAILABLE' ? '#ecfdf5' : '#fee2e2',
                                                                    color: topic.status === 'AVAILABLE' ? '#047857' : '#be123c'
                                                                }}>
                                                                    {topic.status === 'AVAILABLE' ? 'Sẵn sàng' : 'Đã có nhóm chọn'}
                                                                </span>
                                                            </div>
                                                            <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                                                                {topic.description}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <button 
                                                                onClick={() => setTopicToSelect(topic)}
                                                                disabled={topic.status !== 'AVAILABLE'}
                                                                style={{
                                                                    padding: '10px 24px',
                                                                    borderRadius: '8px',
                                                                    border: 'none',
                                                                    backgroundColor: topic.status === 'AVAILABLE' ? '#003366' : '#cbd5e1',
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    cursor: topic.status === 'AVAILABLE' ? 'pointer' : 'not-allowed',
                                                                    fontSize: '0.9rem',
                                                                    whiteSpace: 'nowrap',
                                                                    transition: 'all 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => { if(topic.status === 'AVAILABLE') e.currentTarget.style.backgroundColor = '#002244'; }}
                                                                onMouseLeave={(e) => { if(topic.status === 'AVAILABLE') e.currentTarget.style.backgroundColor = '#003366'; }}
                                                            >
                                                                Chọn đề tài
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        // PHẦN 2: SINH VIÊN ĐÃ ĐĂNG KÝ THÀNH CÔNG ĐỀ TÀI - CHỈ HIỂN THỊ ĐỀ TÀI ĐÓ
                                        <div>
                                            <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                                                <h3 style={{ margin: 0, color: '#003366', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                    Thông tin Đề tài đăng ký của Nhóm
                                                </h3>
                                            </div>

                                            {/* Thẻ hiển thị đề tài duy nhất */}
                                            <div style={{ 
                                                border: '2px solid #003366', 
                                                borderRadius: '16px', 
                                                padding: '30px', 
                                                backgroundColor: '#f8fafc',
                                                boxShadow: '0 8px 30px rgba(0,51,102,0.06)',
                                                marginBottom: '35px',
                                                position: 'relative'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                                            <span style={{ backgroundColor: '#003366', color: 'white', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                                                                {chosenTopic.id}
                                                            </span>
                                                            <span style={{ 
                                                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                                                                backgroundColor: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', gap: '5px'
                                                            }}>
                                                                <i className="fas fa-check-circle"></i> Đăng ký thành công
                                                            </span>
                                                        </div>
                                                        
                                                        <h2 style={{ color: '#003366', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 15px 0' }}>
                                                            {chosenTopic.name}
                                                        </h2>

                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                                            <div style={{ backgroundColor: 'white', padding: '12px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>Đối tượng đăng ký</span>
                                                                <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Nhóm {classData.nhom.userDangO}</strong>
                                                            </div>
                                                            <div style={{ backgroundColor: 'white', padding: '12px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>Người hướng dẫn</span>
                                                                <strong style={{ color: '#0f172a', fontSize: '1rem' }}>{classData.gvhd}</strong>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
                                                        <button 
                                                            onClick={() => setIsTopicDetailModalOpen(true)}
                                                            style={{
                                                                padding: '12px 20px', borderRadius: '8px', border: '1px solid #003366',
                                                                backgroundColor: 'white', color: '#003366', fontWeight: 'bold', cursor: 'pointer',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                                                        >
                                                            <i className="fas fa-info-circle"></i> Xem chi tiết
                                                        </button>

                                                        {/* NÚT YÊU CẦU ĐỔI ĐỀ TÀI */}
                                                        {chosenTopic.changeRequested ? (
                                                            <button 
                                                                disabled
                                                                style={{
                                                                    padding: '12px 20px', borderRadius: '8px', border: 'none',
                                                                    backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold', cursor: 'not-allowed',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                                                }}
                                                            >
                                                                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#d97706', borderRadius: '50%', animation: 'ping 1s infinite' }}></span>
                                                                Đang chờ duyệt đổi...
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => setIsChangeRequestModalOpen(true)}
                                                                style={{
                                                                    padding: '12px 20px', borderRadius: '8px', border: 'none',
                                                                    backgroundColor: '#fee2e2', color: '#be123c', fontWeight: 'bold', cursor: 'pointer',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fecaca'; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2'; }}
                                                            >
                                                                <i className="fas fa-sync-alt"></i> Yêu cầu đổi đề tài
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* KHỐI 3: DANH SÁCH ĐỀ TÀI THAM KHẢO (AI SIMILARITY RECOMMENDATIONS) */}
                                            <div style={{ marginTop: '40px', borderTop: '2px solid #f1f5f9', paddingTop: '30px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
                                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003366' }}>
                                                        <i className="fas fa-brain" style={{ fontSize: '18px' }}></i>
                                                    </div>
                                                    <div>
                                                        <h3 style={{ margin: 0, color: '#003366', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                            Đề tài tham khảo đề xuất bởi AI
                                                        </h3>
                                                        <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
                                                            Hệ thống so sánh độ tương đồng và gợi ý các báo cáo khóa trước có cùng định hướng
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* TRẠNG THÁI LOADING GIẢ LẬP CỦA MODEL AI */}
                                                {aiLoading ? (
                                                    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                                        {/* Spinner & Skeleton nhấp nháy */}
                                                        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '4px solid #e2e8f0', borderTop: '4px solid #003366', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '15px' }}></div>
                                                        <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                                                            Hệ thống AI đang so sánh ngữ nghĩa và phân tích tài liệu cũ...
                                                        </p>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '600px', margin: '0 auto' }}>
                                                            <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', width: '100%', animation: 'pulse 1.5s infinite' }}></div>
                                                            <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', width: '85%', animation: 'pulse 1.5s infinite' }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // SAU KHI LOAD XONG GỢI Ý ĐỀ TÀI THAM KHẢO
                                                    <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                                            <thead>
                                                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                                                    <th style={{ ...tableHeaderStyle, width: '40%' }}>Tên đề tài tham khảo</th>
                                                                    <th style={{ ...tableHeaderStyle, width: '25%' }}>Tác giả & Lớp</th>
                                                                    <th style={{ ...tableHeaderStyle, width: '10%', textAlign: 'center' }}>Năm</th>
                                                                    <th style={{ ...tableHeaderStyle, width: '15%', textAlign: 'center' }}>Độ tương đồng</th>
                                                                    <th style={{ ...tableHeaderStyle, width: '10%', textAlign: 'center' }}>Hành động</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {aiReferences.map((ref, idx) => (
                                                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                                                                        <td style={{ ...tableCellStyle, fontWeight: '500', color: '#0f172a', textAlign: 'left' }}>
                                                                            {ref.name}
                                                                        </td>
                                                                        <td style={{ ...tableCellStyle, color: '#475569', textAlign: 'left' }}>
                                                                            {ref.author}
                                                                        </td>
                                                                        <td style={{ ...tableCellStyle, textAlign: 'center', color: '#64748b' }}>
                                                                            {ref.year}
                                                                        </td>
                                                                        <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                                                {/* Thanh phần trăm tương đồng màu sắc */}
                                                                                <div style={{ width: '60px', backgroundColor: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                                                                    <div style={{ width: `${ref.similarity}%`, backgroundColor: ref.similarity > 90 ? '#10b981' : '#3b82f6', height: '100%' }}></div>
                                                                                </div>
                                                                                <span style={{ fontWeight: 'bold', color: ref.similarity > 90 ? '#10b981' : '#3b82f6', fontSize: '0.85rem' }}>
                                                                                    {ref.similarity}%
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                                                                            <button 
                                                                                onClick={() => setSelectedReferenceDetail(ref)}
                                                                                style={{
                                                                                    padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '6px',
                                                                                    backgroundColor: 'white', color: '#475569', fontSize: '0.8rem', fontWeight: 'bold',
                                                                                    cursor: 'pointer', transition: 'all 0.2s'
                                                                                }}
                                                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
                                                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                                                                            >
                                                                                Tóm tắt
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
                                        <td style={tableCellStyle}><b>{kh.moc}</b></td>
                                        <td style={tableCellStyle}>{kh.noiDung}</td>
                                        <td style={tableCellStyle}>{kh.han}</td>
                                        <td style={tableCellStyle}>
                                            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#e6f7ee', color: '#28a745', fontWeight: 'bold' }}>{kh.statusText}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'nop-bai' && (
                        <div>
                            <h4 style={{ color: '#003366', marginBottom: '15px', fontWeight: 'bold' }}>Báo cáo tiến độ</h4>
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
                                                <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#e6f7ee', color: '#28a745', fontWeight: 'bold' }}>{nb.statusText}</span>
                                            </td>
                                            <td style={tableCellStyle}><button className="btn" onClick={() => handleUpload(nb, idx)} style={{ width: 'auto', fontSize: '0.8rem', padding: '6px 12px', cursor: 'pointer' }}>{nb.uploadText}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'diem' && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>ĐIỂM TỔNG KẾT</p>
                            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: '#003366', margin: '10px 0' }}>{classData.diem.so}</div>
                            <p style={{ fontSize: '1.2rem', color: '#28a745', fontWeight: 'bold' }}>Xếp loại: {classData.diem.xepLoai}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* MODAL XÁC NHẬN CHỌN ĐỀ TÀI */}
            {topicToSelect && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setTopicToSelect(null); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '35px 40px', borderRadius: '16px',
                        maxWidth: '550px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ color: '#003366', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>
                            Xác nhận đăng ký đề tài PBL
                        </h3>
                        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                            Bạn có chắc chắn muốn đăng ký đề tài <strong>"{topicToSelect.name}"</strong> cho <strong>Nhóm {classData.nhom.userDangO}</strong> không?
                            <br />
                            <span style={{ color: '#be123c', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>
                                * Ghi chú: Sau khi đã xác nhận đăng ký, bạn không thể tự ý thay đổi đề tài mà phải gửi yêu cầu xin duyệt từ Giảng viên.
                            </span>
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button 
                                onClick={() => setTopicToSelect(null)}
                                style={{ 
                                    padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1',
                                    backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Hủy bỏ</button>
                            <button 
                                onClick={handleConfirmSelectTopic}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Xác nhận đăng ký</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL YÊU CẦU ĐỔI ĐỀ TÀI */}
            {isChangeRequestModalOpen && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setIsChangeRequestModalOpen(false); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '35px 40px', borderRadius: '16px',
                        maxWidth: '550px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ color: '#003366', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>
                            Gửi yêu cầu đổi đề tài PBL
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>
                            Vui lòng nhập lý do cụ thể gửi giảng viên hướng dẫn (<strong style={{ color: '#003366' }}>{classData.gvhd}</strong>) để được xem xét duyệt thay đổi đề tài.
                        </p>
                        
                        <form onSubmit={handleSendChangeRequest}>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', color: '#334155', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    Lý do đổi đề tài <span style={{ color: '#be123c' }}>*</span>
                                </label>
                                <textarea 
                                    rows="4"
                                    value={changeRequestReason}
                                    onChange={(e) => setChangeRequestReason(e.target.value)}
                                    placeholder="Nhập lý do cụ thể (Ví dụ: Đề tài quá sức, nhóm muốn thay đổi định hướng công nghệ sang Flutter...)"
                                    style={{
                                        width: '100%', padding: '12px 15px', borderRadius: '8px',
                                        border: '1px solid #cbd5e1', fontSize: '0.95rem',
                                        outline: 'none', boxSizing: 'border-box', resize: 'vertical'
                                    }}
                                    required
                                ></textarea>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button 
                                    type="button"
                                    onClick={() => setIsChangeRequestModalOpen(false)}
                                    style={{ 
                                        padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1',
                                        backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'
                                    }}
                                >Hủy bỏ</button>
                                <button 
                                    type="submit"
                                    style={{ 
                                        padding: '10px 24px', borderRadius: '8px', border: 'none',
                                        backgroundColor: '#be123c', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                    }}
                                >Gửi yêu cầu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CHI TIẾT ĐỀ TÀI NHÓM ĐÃ ĐĂNG KÝ */}
            {isTopicDetailModalOpen && chosenTopic && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setIsTopicDetailModalOpen(false); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '30px 40px', borderRadius: '16px',
                        maxWidth: '650px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'left'
                    }}>
                        <button 
                            onClick={() => setIsTopicDetailModalOpen(false)} 
                            style={{ 
                                position: 'absolute', top: '20px', right: '25px', 
                                border: 'none', background: 'none', fontSize: '1.5rem', 
                                cursor: 'pointer', color: '#94a3b8' 
                            }}
                        >✕</button>
                        
                        <span style={{
                            backgroundColor: '#eef2ff', color: '#003366', fontWeight: 'bold',
                            padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem',
                            textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                            Chi tiết đề tài đăng ký
                        </span>
                        
                        <h3 style={{ color: '#003366', fontSize: '1.3rem', fontWeight: 'bold', marginTop: '12px', marginBottom: '15px' }}>
                            {chosenTopic.name}
                        </h3>
                        
                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '20px' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#334155', fontSize: '0.95rem', marginBottom: '8px' }}>Mô tả kỹ thuật đề tài:</h4>
                            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                                {chosenTopic.description}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setIsTopicDetailModalOpen(false)}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Đóng</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL CHI TIẾT TÓM TẮT ĐỀ TÀI THAM KHẢO */}
            {selectedReferenceDetail && (
                <div 
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedReferenceDetail(null); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 5000,
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <div style={{
                        backgroundColor: 'white', padding: '30px 40px', borderRadius: '16px',
                        maxWidth: '600px', width: '90%', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'left'
                    }}>
                        <button 
                            onClick={() => setSelectedReferenceDetail(null)} 
                            style={{ 
                                position: 'absolute', top: '20px', right: '25px', 
                                border: 'none', background: 'none', fontSize: '1.5rem', 
                                cursor: 'pointer', color: '#94a3b8' 
                            }}
                        >✕</button>
                        
                        <span style={{
                            backgroundColor: '#ecfdf5', color: '#047857', fontWeight: 'bold',
                            padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem',
                        }}>
                            Độ tương đồng: {selectedReferenceDetail.similarity}%
                        </span>
                        
                        <h3 style={{ color: '#003366', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '12px', marginBottom: '15px' }}>
                            {selectedReferenceDetail.name}
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', backgroundColor: '#f8fafc', padding: '12px 18px', borderRadius: '8px' }}>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Tác giả thực hiện</span>
                                <strong style={{ color: '#334155' }}>{selectedReferenceDetail.author}</strong>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Năm hoàn thành</span>
                                <strong style={{ color: '#334155' }}>PBL hoàn thành năm {selectedReferenceDetail.year}</strong>
                            </div>
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#334155', fontSize: '0.95rem', marginBottom: '8px' }}>Tóm tắt nội dung báo cáo cũ:</h4>
                            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                                {selectedReferenceDetail.summary}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setSelectedReferenceDetail(null)}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#003366', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}
                            >Đóng lại</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Thêm keyframe animations trong CSS nhúng (premium style) */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SV_WorkShop;
