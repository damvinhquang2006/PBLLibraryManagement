import React from 'react';
import './css/Dashboard.css';
import './css/DashboardExt.css';

function App() {
  const handleLoginClick = () => {
    // Tạm thời điều hướng tới trang login.html (có thể thay đổi sau này nếu dùng react-router)
    window.location.href = '/pages/login.html';
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <i className="fas fa-book-open"></i>
          <div>
            <h1>Hệ thống PBL</h1>
            <p>Project-Based Learning Portal</p>
          </div>
        </div>
        <div className="user-email">
          <i className="fas fa-user-circle"></i> Khách
        </div>
      </header>

      <main className="container">
        <div className="welcome-text">
          <h2>Dashboard Khách</h2>
          <p>Chào mừng bạn đến với Hệ thống PBL</p>
        </div>

        <div className="card-grid">
          <div className="card clickable">
            <div className="icon-box blue"><i className="fas fa-columns"></i></div>
            <h3>Thư viện PBL</h3>
            <p>Truy cập tài liệu, mẫu dự án và tài nguyên học tập</p>
          </div>

          <div className="card clickable account-card" onClick={handleLoginClick}>
            <div className="icon-box gray"><i className="fas fa-sign-in-alt"></i></div>
            <h3>Đăng nhập tài khoản</h3>
            <p>Đăng nhập để sử dụng đầy đủ các tính năng của hệ thống</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
