import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import các trang cho routing chính
import DashboardGuest from './pages/DashboardGuest';
import Login from './pages/Login';
import DashboardSV from './pages/DashboardSV';
import DashboardGV from './pages/DashboardGV';
import DashboardAdmin from './pages/DashboardAdmin';
import MyClassesAdmin from './pages/MyClassesAdmin';
import MyClassesGV from './pages/MyClassesGV';
import ClassDashboardGV from './pages/ClassDashboardGV';

import Profile from './pages/Profile';

import Statistics from './pages/Statistics';
import AccountManagement from './pages/AccountManagement';
import PBLApproval from './pages/PBLApproval';


import StudentResults from './pages/StudentResults';
import LecturerTopicManagement from './pages/LecturerTopicManagement';
import LecturerGrading from './pages/LecturerGrading';
import StudentPlanTracking from './pages/StudentPlanTracking';
import LecturerDeadlineManagement from './pages/LecturerDeadlineManagement';
import LecturerPublishRequest from './pages/LecturerPublishRequest';
import SV_TruyCapLopPBL from './pages/SV_TruyCapLopPBL';
import SV_WorkShop from './pages/SV_WorkShop';
import ThuVienPBL from './pages/ThuVienPBL';
import ThuVienPBL_Xem from './pages/ThuVienPBL_Xem';

// ==========================================
// DEV UI GALLERY - Chỉ dùng để test giao diện
// Truy cập tại: http://localhost:5173/dev-ui
// ==========================================

// Glob load tất cả file .jsx trong /pages (eager = load ngay, không lazy)
const pageModules = import.meta.glob('./pages/**/*.jsx', { eager: true });

function DevUIGallery() {
  const [selectedPath, setSelectedPath] = useState(null);

  // Lọc chỉ lấy những module có export default (là React component)
  const validModules = Object.entries(pageModules).filter(
    ([, mod]) => typeof mod.default === 'function'
  );

  const ActiveComponent = selectedPath
    ? pageModules[selectedPath]?.default
    : null;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>

      {/* ---- Sidebar trái ---- */}
      <div style={{ width: '270px', borderRight: '1px solid #ccc', padding: '15px', overflowY: 'auto', backgroundColor: '#1e1e2e', color: '#cdd6f4', flexShrink: 0 }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#cba6f7', fontSize: '16px' }}>
          🛠 Dev UI Gallery
        </h3>
        <p style={{ fontSize: '12px', color: '#a6adc8', marginBottom: '18px', borderBottom: '1px solid #45475a', paddingBottom: '12px' }}>
          {validModules.length} file tìm thấy trong /pages
        </p>

        {validModules.map(([path]) => {
          // Rút gọn: ./pages/DashboardSV.jsx -> DashboardSV.jsx
          const label = path.replace('./pages/', '');
          const isActive = selectedPath === path;

          return (
            <button
              key={path}
              onClick={() => setSelectedPath(path)}
              style={{
                display: 'block',
                width: '100%',
                padding: '9px 12px',
                marginBottom: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '13px',
                backgroundColor: isActive ? '#cba6f7' : '#313244',
                color: isActive ? '#1e1e2e' : '#cdd6f4',
                border: 'none',
                borderRadius: '6px',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ---- Khu vực xem UI bên phải ---- */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#cdd6f4', position: 'relative' }}>
        {/* Thanh tiêu đề nhỏ phía trên */}
        <div style={{ backgroundColor: '#313244', color: '#a6adc8', padding: '6px 16px', fontSize: '12px', position: 'sticky', top: 0, zIndex: 1 }}>
          {selectedPath
            ? `📄 Đang xem: ${selectedPath.replace('./pages/', '')}`
            : '👈 Chọn một file ở sidebar để preview UI'}
        </div>

        {/* Render component được chọn */}
        {ActiveComponent ? (
          <div style={{ position: 'relative', minHeight: 'calc(100% - 30px)' }}>
            <ActiveComponent />
          </div>
        ) : (
          <div style={{ display: 'flex', height: 'calc(100% - 30px)', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px', color: '#585b70' }}>
            <span style={{ fontSize: '48px' }}>🎨</span>
            <span style={{ fontSize: '16px' }}>Chưa có file nào được chọn</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// APP CHÍNH với Router
// ==========================================

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardGuest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard-sv" element={<DashboardSV />} />
          <Route path="/dashboard-gv" element={<DashboardGV />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/my-classes-admin" element={<MyClassesAdmin />} />
          <Route path="/my-classes-gv" element={<MyClassesGV />} />
          <Route path="/class-dashboard-gv" element={<ClassDashboardGV />} />

          <Route path="/profile" element={<Profile />} />
  
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/pbl-approval" element={<PBLApproval />} />


          <Route path="/student-results" element={<StudentResults />} />
          <Route path="/lecturer-topics" element={<LecturerTopicManagement />} />
          <Route path="/lecturer-grading" element={<LecturerGrading />} />
          <Route path="/student-plan-tracking" element={<StudentPlanTracking />} />
          <Route path="/lecturer-deadlines" element={<LecturerDeadlineManagement />} />
          <Route path="/lecturer-publish" element={<LecturerPublishRequest />} />
          <Route path="/sv-truy-cap-lop" element={<SV_TruyCapLopPBL />} />
          <Route path="/sv-workshop" element={<SV_WorkShop />} />
          <Route path="/thu-vien-pbl" element={<ThuVienPBL />} />
          <Route path="/thu-vien-pbl-xem" element={<ThuVienPBL_Xem />} />

          {/* 🛠 Route để test UI - truy cập /dev-ui */}
          <Route path="/dev-ui" element={<DevUIGallery />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;