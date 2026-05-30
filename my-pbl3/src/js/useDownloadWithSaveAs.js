import { useState } from 'react';

/**
 * Custom Hook: useDownloadWithSaveAs
 *
 * Xử lý tải file và luôn hiển thị cửa sổ File Explorer (Save As)
 * để người dùng tự chọn nơi lưu file trên máy tính.
 *
 * Ưu tiên sử dụng File System Access API (Chrome, Edge hiện đại).
 * Tự động fallback về phương thức <a download> nếu trình duyệt không hỗ trợ.
 *
 * @returns {{ downloading, downloadStatus, handleDownloadWithSaveAs }}
 *   - downloading: boolean - true khi đang trong quá trình tải
 *   - downloadStatus: { type: 'success'|'error'|'cancel'|null, message: string }
 *   - handleDownloadWithSaveAs: async (fileUrl, suggestedName) => void
 */
const useDownloadWithSaveAs = () => {
    const [downloading, setDownloading] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState({ type: null, message: '' });

    /**
     * Tải file và mở hộp thoại Save As của hệ điều hành.
     *
     * @param {string} fileUrl   - URL tuyệt đối hoặc tương đối của file cần tải.
     *                             Ví dụ: 'http://localhost:8080/api/reports/download/BaoCao.docx'
     *                             Hoặc đường dẫn local (trong /public): '/wordfiles/BaoCao.docx'
     * @param {string} suggestedName - Tên file gợi ý hiển thị trong cửa sổ Save As.
     */
    const handleDownloadWithSaveAs = async (fileUrl, suggestedName = 'BaoCao_PBL.docx') => {
        setDownloading(true);
        setDownloadStatus({ type: null, message: '' });

        // Encode URL đúng chuẩn để fetch() xử lý được tên file tiếng Việt / có khoảng trắng.
        // Tách phần gốc (origin + path prefix) ra khỏi tên file, rồi encode riêng tên file.
        const lastSlash = fileUrl.lastIndexOf('/');
        const baseUrl   = fileUrl.substring(0, lastSlash + 1);          // Ví dụ: '/wordfiles/'
        const rawName   = fileUrl.substring(lastSlash + 1);             // Ví dụ: 'Quản lý đề tài PBL.docx'
        const encodedUrl = baseUrl + encodeURIComponent(rawName);       // Encode tên file cho fetch()

        // ── Nhánh 1: Trình duyệt hỗ trợ File System Access API (Chrome, Edge 86+) ──
        if (typeof window.showSaveFilePicker === 'function') {
            try {
                // 1a. Mở cửa sổ File Explorer để người dùng chọn vị trí lưu
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName,
                    types: [
                        {
                            description: 'Word Document (.docx)',
                            accept: {
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                            },
                        },
                        {
                            description: 'PDF Document (.pdf)',
                            accept: { 'application/pdf': ['.pdf'] },
                        },
                        {
                            description: 'Tất cả file',
                            accept: { '*/*': [] },
                        },
                    ],
                });

                // 1b. Tải dữ liệu file từ server / đường dẫn (dùng URL đã encode)
                const response = await fetch(encodedUrl);
                if (!response.ok) {
                    throw new Error(`Không thể tải file. Mã lỗi: ${response.status}`);
                }
                const blob = await response.blob();

                // 1c. Ghi dữ liệu vào vị trí người dùng đã chọn
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();

                setDownloadStatus({ type: 'success', message: `✅ Đã lưu file "${suggestedName}" thành công!` });
            } catch (err) {
                if (err.name === 'AbortError') {
                    // Người dùng bấm Cancel trong cửa sổ File Explorer → không phải lỗi
                    setDownloadStatus({ type: 'cancel', message: '' });
                } else {
                    setDownloadStatus({ type: 'error', message: `❌ Lỗi khi tải file: ${err.message}` });
                }
            } finally {
                setDownloading(false);
            }
            return;
        }

        // ── Nhánh 2: Fallback cho Firefox / Safari (không hỗ trợ showSaveFilePicker) ──
        // Sử dụng thẻ <a download> — trình duyệt sẽ tải về thư mục Downloads mặc định
        // hoặc hỏi vị trí lưu nếu người dùng đã bật "Ask where to save" trong cài đặt trình duyệt.
        try {
            const response = await fetch(encodedUrl); // Dùng URL đã encode
            if (!response.ok) {
                throw new Error(`Không thể tải file. Mã lỗi: ${response.status}`);
            }
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = suggestedName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Giải phóng bộ nhớ sau khi tải
            setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

            setDownloadStatus({ type: 'success', message: `✅ Đang tải file "${suggestedName}"...` });
        } catch (err) {
            setDownloadStatus({ type: 'error', message: `❌ Lỗi khi tải file: ${err.message}` });
        } finally {
            setDownloading(false);
        }
    };

    return { downloading, downloadStatus, handleDownloadWithSaveAs };
};

export default useDownloadWithSaveAs;
