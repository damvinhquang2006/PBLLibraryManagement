/**
 * studentService.js
 * Gọi các API liên quan đến sinh viên (STUDENT role).
 *
 * Base URL : http://localhost:8080/api/students
 * Auth     : Bearer token lưu trong sessionStorage ('pbl_token')
 */

const API_BASE_URL = 'http://localhost:8080/api';

/** Lấy token đang lưu trong sessionStorage */
function getToken() {
    return sessionStorage.getItem('pbl_token');
}

/** Header chuẩn có Bearer token */
function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    };
}

/**
 * GET /api/students/profile
 * Lấy hồ sơ của chính sinh viên đang đăng nhập.
 *
 * @returns {Promise<StudentResponseDTO>}
 */
export async function getStudentProfile() {
    const res = await fetch(`${API_BASE_URL}/students/profile`, {
        method: 'GET',
        headers: authHeaders(),
    });

    const text = await res.text();
    if (!text) throw new Error(`Server trả về rỗng (Status: ${res.status})`);

    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message || `Lỗi server (${res.status})`);

    return data;
}

/**
 * PUT /api/students/profile
 * Sinh viên tự cập nhật hồ sơ của mình.
 *
 * @param {StudentSelfUpdateRequestDTO} dto
 * @returns {Promise<StudentResponseDTO>}
 */
export async function updateStudentProfile(dto) {
    const res = await fetch(`${API_BASE_URL}/students/profile`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(dto),
    });

    const text = await res.text();
    if (!text) throw new Error(`Server trả về rỗng (Status: ${res.status})`);

    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message || `Lỗi server (${res.status})`);

    return data;
}
/**
 * GET /api/students/{id}
 * Lấy chi tiết một sinh viên bất kỳ (thường dành cho Admin/Giảng viên).
 *
 * @param {string} id
 * @returns {Promise<StudentResponseDTO>}
 */
export async function getStudentById(id) {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    const text = await res.text();
    if (!text) throw new Error(`Server trả về rỗng (Status: ${res.status})`);

    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message || `Lỗi server (${res.status})`);

    return data;
}
