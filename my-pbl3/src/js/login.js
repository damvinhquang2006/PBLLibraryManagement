// Hàm xử lý đổi màu khi chọn vai trò
function selectRole(roleCode) {
    // 1. Gỡ active của tất cả các ô vai trò
    document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
    
    // 2. Thêm active cho thằng vừa bấm
    const idMap = { 'SV': 'roleSV', 'GV': 'roleGV', 'AD': 'roleAD' };
    document.getElementById(idMap[roleCode]).classList.add('active');
    
    // 3. Cập nhật giá trị vào input ẩn
    document.getElementById('selectedRole').value = roleCode;
    
    // 4. Thay đổi placeholder cho "Xịn"
    const input = document.getElementById('inputMaUser');
    if(roleCode === 'SV') input.placeholder = "102240400";
    else if(roleCode === 'GV') input.placeholder = "Mã giảng viên";
    else input.placeholder = "Tài khoản Admin";
}

// Xử lý khi nhấn Submit Form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Chặn load trang để test
    
    const role = document.getElementById('selectedRole').value;
    const user = document.getElementById('inputMaUser').value;
    
    alert("Đã nhận thông tin:\n- Vai trò: " + role + "\n- Tài khoản: " + user);
});