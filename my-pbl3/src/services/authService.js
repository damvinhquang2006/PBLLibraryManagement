/**
 * authService.js
 * Xử lý xác thực người dùng — gọi API backend (hoặc mock data khi dev).
 *
 * Input : { email, password, role }
 * Output: { username, avatar, phoneNumber, email, age, gender, role }
 */

// ─── Mock database người dùng ────────────────────────────────────────────────
// Thay thế phần này bằng lời gọi fetch() thật khi có backend.
const MOCK_USERS = [
    {
        email: 'sinhvien@gmail.com',
        password: '123456',
        role: 'SV',
        username: 'Nguyễn Như Quỳnh',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=QuynhSV',
        phoneNumber: '0901234567',
        gender: 'Nữ',
        class_name: '22T_DT1',
        card_id: '102220123',
        dob: '2004-05-15',
        // Student specific
        session_year: '2022 - 2027',
        faculty: 'Công nghệ Thông tin',
    },
    {
        email: 'giangvien@gmail.com',
        password: '123456',
        role: 'GV',
        username: 'Trần Văn Minh',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhGV',
        phoneNumber: '0912345678',
        gender: 'Nam',
        class_name: 'Giao diện mẫu',
        card_id: 'GV9999',
        dob: '1988-10-20',
        // Lecturer specific
        graduated_college: 'Đại học Bách Khoa - ĐHĐN',
        academic_degree: 'Thạc sĩ',
        major: 'Khoa học máy tính',
    },
    {
        email: 'admin@gmail.com',
        password: '123456',
        role: 'AD',
        username: 'Lê Quang Đạo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminAD',
        phoneNumber: '0900000000',
        gender: 'Nam',
        class_name: 'Phòng Quản trị',
        card_id: 'AD001',
        dob: '1980-01-01',
        // Admin specific
        position: 'Cán bộ cao cấp nhà trường',
    },
];

/**
 * Đăng nhập — mock hoặc gọi API thật.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} role  - 'SV' | 'GV' | 'AD'
 * @returns {Promise<{ username, avatar, phoneNumber, email, age, gender, role }>}
 * @throws {Error} Nếu thông tin đăng nhập không hợp lệ
 */
export async function loginUser(email, password, role) {
    // ── Bật phần này khi có backend thật ──────────────────────────────────────
    // const res = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password, role }),
    // });
    // if (!res.ok) throw new Error('Sai email hoặc mật khẩu');
    // const data = await res.json();
    // return data; // backend trả về { username, avatar, phoneNumber, email, age, gender, role }
    // ─────────────────────────────────────────────────────────────────────────

    // ── Mock: giả lập delay mạng 600ms ────────────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 600));

    const user = MOCK_USERS.find(
        (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password &&
            u.role === role
    );

    if (!user) {
        throw new Error('Sai email, mật khẩu, hoặc vai trò không khớp.');
    }

    // Chỉ trả về các trường cần thiết (không trả về password)
    const { password: _pw, ...safeUser } = user;
    return safeUser;
}
