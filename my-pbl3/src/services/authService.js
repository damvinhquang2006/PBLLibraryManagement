/**
 * authService.js
 * Xử lý xác thực người dùng — gọi API backend.
 *
 * Input : { email, password }
 * Output: { Id, email, role, message }
 */

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Đăng nhập — gọi API backend thật.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ Id, email, role, message }>}
 * @throws {Error} Nếu thông tin đăng nhập không hợp lệ hoặc lỗi server
 */
export async function loginUser(email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        // Kiểm tra xem có nội dung trả về không
        const responseText = await res.text();
        if (!responseText) {
            throw new Error(`Server trả về rỗng (Status: ${res.status}). Hãy kiểm tra lại Backend.`);
        }

        const data = JSON.parse(responseText);

        if (!res.ok) {
            throw new Error(data.message || `Lỗi server (${res.status})`);
        }

        return data;
    } catch (error) {
        console.error('Chi tiết lỗi đăng nhập:', error);
        throw error;
    }
}
