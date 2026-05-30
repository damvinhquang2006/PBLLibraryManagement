import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileModal from './UserProfileModal';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const API_BASE = 'http://localhost:8080/api';

const AccountManagement = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('SV');
    const [viewingUser, setViewingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pblClassFilter, setPblClassFilter] = useState(''); // ID lớp PBL đang lọc
    const [showFilterDialog, setShowFilterDialog] = useState(null);
    const [filterSearch, setFilterSearch] = useState('');

    // ── Dữ liệu từ API ──────────────────────────────────────────────────────
    const [pblClasses, setPblClasses] = useState(() => 
        Array.from({ length: 15 }, (_, i) => ({
            id: `pbl_class_${i + 1}`,
            className: `Lớp PBL ${i + 1}`,
            semester: 'Học kỳ 2 (2025-2026)',
            lecturerName: `TS. Giảng viên ${String.fromCharCode(65 + (i % 6))}`
        }))
    );
    const [svByClass, setSvByClass] = useState(() => {
        const mockMap = {};
        
        const class1 = [
          { "id": "user_65", "fullName": "Nguyễn Thị Lan", "email": "user65@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-05-12", "role": "STUDENT", "phoneNumber": "0987654321", "homeTown": "Đà Nẵng", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_534", "fullName": "Đặng Văn Bình", "email": "user534@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-11-23", "role": "STUDENT", "phoneNumber": "0912345678", "homeTown": "Quảng Nam", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_639", "fullName": "Hoàng Thị Lan", "email": "user639@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-08-15", "role": "STUDENT", "phoneNumber": "0905112233", "homeTown": "Huế", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_640", "fullName": "Hoàng Văn Quân", "email": "user640@dut.udn.vn", "gender": "MALE", "dateOfBirth": "2000-02-28", "role": "STUDENT", "phoneNumber": "0934567890", "homeTown": "Quảng Trị", "homeClass": "22T_10", "majorName": "Học máy" },
          { "id": "user_648", "fullName": "Đặng Văn Châu", "email": "user648@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1996-04-10", "role": "STUDENT", "phoneNumber": "0978123456", "homeTown": "Quảng Bình", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_675", "fullName": "Phạm Thị Châu", "email": "user675@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-12-05", "role": "STUDENT", "phoneNumber": "0967123987", "homeTown": "Nghệ An", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_700", "fullName": "Lê Văn Vinh", "email": "user700@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-07-22", "role": "STUDENT", "phoneNumber": "0915998877", "homeTown": "Hà Tĩnh", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_701", "fullName": "Nguyễn Thị Hương", "email": "user701@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-09-30", "role": "STUDENT", "phoneNumber": "0982334455", "homeTown": "Thanh Hóa", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_704", "fullName": "Ngô Văn Khánh", "email": "user704@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-01-14", "role": "STUDENT", "phoneNumber": "0909556677", "homeTown": "Bình Định", "homeClass": "22T_14", "majorName": "Mạng máy tính" },
          { "id": "user_726", "fullName": "Vũ Văn Nhân", "email": "user726@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-10-08", "role": "STUDENT", "phoneNumber": "0935889900", "homeTown": "Phú Yên", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_731", "fullName": "Phạm Thị Trung", "email": "user731@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-04-02", "role": "STUDENT", "phoneNumber": "0996517453", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_10", "majorName": "Học máy" },
          { "id": "user_740", "fullName": "Lê Văn Linh", "email": "user740@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-03-25", "role": "STUDENT", "phoneNumber": "0972445566", "homeTown": "Khánh Hòa", "homeClass": "22T_18", "majorName": "An toàn Thông tin" },
          { "id": "user_771", "fullName": "Đặng Thị Hoa", "email": "user771@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-06-18", "role": "STUDENT", "phoneNumber": "0918778899", "homeTown": "Gia Lai", "homeClass": "22T_14", "majorName": "Mạng máy tính" },
          { "id": "user_793", "fullName": "Đặng Thị Minh", "email": "user793@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-11", "role": "STUDENT", "phoneNumber": "0903223344", "homeTown": "Đắk Lắk", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_865", "fullName": "Trần Thị Tú", "email": "user865@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-02-14", "role": "STUDENT", "phoneNumber": "0934112233", "homeTown": "Lâm Đồng", "homeClass": "22T_11", "majorName": "Học máy" },
          { "id": "user_879", "fullName": "Đỗ Thị Quân", "email": "user879@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-07-04", "role": "STUDENT", "phoneNumber": "0965334455", "homeTown": "Ninh Thuận", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_881", "fullName": "Đỗ Thị Nhân", "email": "user881@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-05-19", "role": "STUDENT", "phoneNumber": "0979445566", "homeTown": "Bình Thuận", "homeClass": "22T_10", "majorName": "Học máy" },
          { "id": "user_897", "fullName": "Nguyễn Thị Phúc", "email": "user897@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-11-09", "role": "STUDENT", "phoneNumber": "0911889900", "homeTown": "Đồng Nai", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_952", "fullName": "Đỗ Văn Ý", "email": "user952@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-08-27", "role": "STUDENT", "phoneNumber": "0988556677", "homeTown": "Bình Dương", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_998", "fullName": "Hoàng Văn Châu", "email": "user998@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-01-01", "role": "STUDENT", "phoneNumber": "0905778899", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" }
        ];

        const class2 = [
          { "id": "user_9", "fullName": "Ngô Thị Nhân", "email": "user9@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-08-12", "role": "STUDENT", "phoneNumber": "0987654309", "homeTown": "Đà Nẵng", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_99", "fullName": "Bùi Thị Châu", "email": "user99@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-03-24", "role": "STUDENT", "phoneNumber": "0912345609", "homeTown": "Quảng Nam", "homeClass": "22T_10", "majorName": "Học máy" },
          { "id": "user_513", "fullName": "Ngô Thị Vân", "email": "user513@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-05-15", "role": "STUDENT", "phoneNumber": "0905112209", "homeTown": "Huế", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_551", "fullName": "Lê Thị Anh", "email": "user551@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "2000-06-28", "role": "STUDENT", "phoneNumber": "0934567809", "homeTown": "Quảng Trị", "homeClass": "22T_19", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_559", "fullName": "Đặng Thị Hoa", "email": "user559@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1996-01-10", "role": "STUDENT", "phoneNumber": "0978123409", "homeTown": "Quảng Bình", "homeClass": "22T_18", "majorName": "Mạng máy tính" },
          { "id": "user_586", "fullName": "Phạm Văn Trung", "email": "user586@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-10-05", "role": "STUDENT", "phoneNumber": "0967123909", "homeTown": "Nghệ An", "homeClass": "22T_04", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_620", "fullName": "Hoàng Văn Xuân", "email": "user620@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-02-22", "role": "STUDENT", "phoneNumber": "0915998809", "homeTown": "Hà Tĩnh", "homeClass": "22T_14", "majorName": "Mạng máy tính" },
          { "id": "user_637", "fullName": "Hoàng Thị Vinh", "email": "user637@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-04-30", "role": "STUDENT", "phoneNumber": "0982334409", "homeTown": "Thanh Hóa", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_689", "fullName": "Đặng Thị Hương", "email": "user689@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-07-14", "role": "STUDENT", "phoneNumber": "0909556609", "homeTown": "Bình Định", "homeClass": "22T_07", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_690", "fullName": "Nguyễn Văn Vinh", "email": "user690@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-12-08", "role": "STUDENT", "phoneNumber": "0935889909", "homeTown": "Phú Yên", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_716", "fullName": "Đỗ Văn Anh", "email": "user716@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-08-02", "role": "STUDENT", "phoneNumber": "0996517409", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_11", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_746", "fullName": "Hoàng Văn Vinh", "email": "user746@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-01-25", "role": "STUDENT", "phoneNumber": "0972445509", "homeTown": "Khánh Hòa", "homeClass": "22T_19", "majorName": "Học máy" },
          { "id": "user_751", "fullName": "Nguyễn Thị Vân", "email": "user751@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-03-18", "role": "STUDENT", "phoneNumber": "0918778809", "homeTown": "Gia Lai", "homeClass": "22T_14", "majorName": "Mạng máy tính" },
          { "id": "user_807", "fullName": "Lê Thị Vân", "email": "user807@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-10-11", "role": "STUDENT", "phoneNumber": "0903223309", "homeTown": "Đắk Lắk", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_863", "fullName": "Ngô Thị Quân", "email": "user863@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-11-14", "role": "STUDENT", "phoneNumber": "0934112209", "homeTown": "Lâm Đồng", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_870", "fullName": "Đỗ Văn Vân", "email": "user870@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-05-04", "role": "STUDENT", "phoneNumber": "0965334409", "homeTown": "Ninh Thuận", "homeClass": "22T_12", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_900", "fullName": "Ngô Văn Ý", "email": "user900@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-03-19", "role": "STUDENT", "phoneNumber": "0979445509", "homeTown": "Bình Thuận", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_943", "fullName": "Đỗ Thị Vinh", "email": "user943@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-09-09", "role": "STUDENT", "phoneNumber": "0911889909", "homeTown": "Đồng Nai", "homeClass": "22T_07", "majorName": "Học máy" },
          { "id": "user_974", "fullName": "Bùi Văn Nhân", "email": "user974@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-07-27", "role": "STUDENT", "phoneNumber": "0988556609", "homeTown": "Bình Dương", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_991", "fullName": "Bùi Thị Minh", "email": "user991@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-01", "role": "STUDENT", "phoneNumber": "0905778809", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" }
        ];

        const class3 = [
          { "id": "user_83", "fullName": "Ngô Thị Dũng", "email": "user83@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-02-12", "role": "STUDENT", "phoneNumber": "0987654383", "homeTown": "Đà Nẵng", "homeClass": "22T_04", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_535", "fullName": "Trần Thị Anh", "email": "user535@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-04-23", "role": "STUDENT", "phoneNumber": "0912345683", "homeTown": "Quảng Nam", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_539", "fullName": "Ngô Thị Minh", "email": "user539@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-09-15", "role": "STUDENT", "phoneNumber": "0905112283", "homeTown": "Huế", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_544", "fullName": "Phạm Văn Châu", "email": "user544@dut.udn.vn", "gender": "MALE", "dateOfBirth": "2000-01-28", "role": "STUDENT", "phoneNumber": "0934567883", "homeTown": "Quảng Trị", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_565", "fullName": "Đặng Thị Linh", "email": "user565@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1996-03-10", "role": "STUDENT", "phoneNumber": "0978123483", "homeTown": "Quảng Bình", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_576", "fullName": "Nguyễn Văn Lan", "email": "user576@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-11-05", "role": "STUDENT", "phoneNumber": "0967123983", "homeTown": "Nghệ An", "homeClass": "22T_16", "majorName": "An toàn Thông tin" },
          { "id": "user_590", "fullName": "Bùi Văn Quân", "email": "user590@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-05-22", "role": "STUDENT", "phoneNumber": "0915998883", "homeTown": "Hà Tĩnh", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_619", "fullName": "Vũ Thị Nhân", "email": "user619@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-03-30", "role": "STUDENT", "phoneNumber": "0982334483", "homeTown": "Thanh Hóa", "homeClass": "22T_18", "majorName": "Mạng máy tính" },
          { "id": "user_651", "fullName": "Bùi Thị Châu", "email": "user651@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-01-14", "role": "STUDENT", "phoneNumber": "0909556683", "homeTown": "Bình Định", "homeClass": "22T_19", "majorName": "An toàn Thông tin" },
          { "id": "user_653", "fullName": "Hoàng Thị Châu", "email": "user653@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-08-08", "role": "STUDENT", "phoneNumber": "0935889983", "homeTown": "Phú Yên", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_676", "fullName": "Ngô Văn Hoa", "email": "user676@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-06-02", "role": "STUDENT", "phoneNumber": "0996517483", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_697", "fullName": "Trần Thị Thảo", "email": "user697@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-07-25", "role": "STUDENT", "phoneNumber": "0972445583", "homeTown": "Khánh Hòa", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_705", "fullName": "Ngô Thị Tú", "email": "user705@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-01-18", "role": "STUDENT", "phoneNumber": "0918778883", "homeTown": "Gia Lai", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_709", "fullName": "Đặng Thị Minh", "email": "user709@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-11", "role": "STUDENT", "phoneNumber": "0903223383", "homeTown": "Đắk Lắk", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_729", "fullName": "Trần Thị Ý", "email": "user729@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-02-14", "role": "STUDENT", "phoneNumber": "0934112283", "homeTown": "Lâm Đồng", "homeClass": "22T_19", "majorName": "Học máy" },
          { "id": "user_759", "fullName": "Ngô Thị Bình", "email": "user759@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-05-04", "role": "STUDENT", "phoneNumber": "0965334483", "homeTown": "Ninh Thuận", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_822", "fullName": "Vũ Văn Tú", "email": "user822@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-09-19", "role": "STUDENT", "phoneNumber": "0979445583", "homeTown": "Bình Thuận", "homeClass": "22T_15", "majorName": "An toàn Thông tin" },
          { "id": "user_890", "fullName": "Phạm Văn Tú", "email": "user890@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-05-09", "role": "STUDENT", "phoneNumber": "0911889983", "homeTown": "Đồng Nai", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_953", "fullName": "Hoàng Thị Tú", "email": "user953@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-03-27", "role": "STUDENT", "phoneNumber": "0988556683", "homeTown": "Bình Dương", "homeClass": "22T_02", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_997", "fullName": "Ngô Thị Tú", "email": "user997@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-10-01", "role": "STUDENT", "phoneNumber": "0905778883", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_07", "majorName": "An toàn Thông tin" }
        ];

        const class4 = [
          { "id": "user_8", "fullName": "Trần Văn Lan", "email": "user8@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-04-12", "role": "STUDENT", "phoneNumber": "0987654308", "homeTown": "Đà Nẵng", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_66", "fullName": "Nguyễn Văn Châu", "email": "user66@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-07-23", "role": "STUDENT", "phoneNumber": "0912345608", "homeTown": "Quảng Nam", "homeClass": "22T_03", "majorName": "Hệ thống Thông tin" },
          { "id": "user_71", "fullName": "Trần Thị Xuân", "email": "user71@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-15", "role": "STUDENT", "phoneNumber": "0905112208", "homeTown": "Huế", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_82", "fullName": "Trần Văn Tú", "email": "user82@dut.udn.vn", "gender": "MALE", "dateOfBirth": "2000-09-28", "role": "STUDENT", "phoneNumber": "0934567808", "homeTown": "Quảng Trị", "homeClass": "22T_16", "majorName": "An toàn Thông tin" },
          { "id": "user_515", "fullName": "Lê Thị Quân", "email": "user515@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1996-08-10", "role": "STUDENT", "phoneNumber": "0978123408", "homeTown": "Quảng Bình", "homeClass": "22T_10", "majorName": "Học máy" },
          { "id": "user_523", "fullName": "Đỗ Thị Khánh", "email": "user523@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-05-05", "role": "STUDENT", "phoneNumber": "0967123908", "homeTown": "Nghệ An", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_636", "fullName": "Hoàng Văn Trung", "email": "user636@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-11-22", "role": "STUDENT", "phoneNumber": "0915998808", "homeTown": "Hà Tĩnh", "homeClass": "22T_16", "majorName": "An toàn Thông tin" },
          { "id": "user_687", "fullName": "Phạm Thị Lan", "email": "user687@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-10-30", "role": "STUDENT", "phoneNumber": "0982334408", "homeTown": "Thanh Hóa", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_723", "fullName": "Trần Thị Minh", "email": "user723@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-01-14", "role": "STUDENT", "phoneNumber": "0909556608", "homeTown": "Bình Định", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_752", "fullName": "Ngô Văn Lan", "email": "user752@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-12-08", "role": "STUDENT", "phoneNumber": "0935889908", "homeTown": "Phú Yên", "homeClass": "22T_18", "majorName": "An toàn Thông tin" },
          { "id": "user_754", "fullName": "Ngô Văn Minh", "email": "user754@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-04-02", "role": "STUDENT", "phoneNumber": "0996517408", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_763", "fullName": "Đỗ Thị Trung", "email": "user763@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-05-25", "role": "STUDENT", "phoneNumber": "0972445508", "homeTown": "Khánh Hòa", "homeClass": "22T_08", "majorName": "An toàn Thông tin" },
          { "id": "user_813", "fullName": "Hoàng Thị Dũng", "email": "user813@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-06-18", "role": "STUDENT", "phoneNumber": "0918778808", "homeTown": "Gia Lai", "homeClass": "22T_11", "majorName": "Học máy" },
          { "id": "user_824", "fullName": "Lê Văn Châu", "email": "user824@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-09-11", "role": "STUDENT", "phoneNumber": "0903223308", "homeTown": "Đắk Lắk", "homeClass": "22T_19", "majorName": "Học máy" },
          { "id": "user_856", "fullName": "Nguyễn Văn Ý", "email": "user856@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-10-14", "role": "STUDENT", "phoneNumber": "0934112208", "homeTown": "Lâm Đồng", "homeClass": "22T_13", "majorName": "Mạng máy tính" },
          { "id": "user_926", "fullName": "Phạm Văn Ý", "email": "user926@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-05-04", "role": "STUDENT", "phoneNumber": "0965334408", "homeTown": "Ninh Thuận", "homeClass": "22T_18", "majorName": "An toàn Thông tin" },
          { "id": "user_929", "fullName": "Đặng Thị Trung", "email": "user929@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-06-19", "role": "STUDENT", "phoneNumber": "0979445508", "homeTown": "Bình Thuận", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_931", "fullName": "Lê Thị Linh", "email": "user931@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-11-09", "role": "STUDENT", "phoneNumber": "0911889908", "homeTown": "Đồng Nai", "homeClass": "22T_16", "majorName": "An toàn Thông tin" },
          { "id": "user_947", "fullName": "Trần Thị Vinh", "email": "user947@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-08-27", "role": "STUDENT", "phoneNumber": "0988556608", "homeTown": "Bình Dương", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_963", "fullName": "Lê Thị Bình", "email": "user963@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-04-01", "role": "STUDENT", "phoneNumber": "0905778808", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" }
        ];

        const class5 = [
          { "id": "user_1", "fullName": "Đỗ Thị Hương", "email": "user1@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-01-12", "role": "STUDENT", "phoneNumber": "0987654301", "homeTown": "Đà Nẵng", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_6", "fullName": "Đặng Văn Thảo", "email": "user6@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-02-23", "role": "STUDENT", "phoneNumber": "0912345601", "homeTown": "Quảng Nam", "homeClass": "22T_02", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_76", "fullName": "Đỗ Văn Anh", "email": "user76@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-09-15", "role": "STUDENT", "phoneNumber": "0905112201", "homeTown": "Huế", "homeClass": "22T_09", "majorName": "Khoa học Dữ liệu" },
          { "id": "user_518", "fullName": "Trần Văn Hương", "email": "user518@dut.udn.vn", "gender": "MALE", "dateOfBirth": "2000-05-28", "role": "STUDENT", "phoneNumber": "0934567801", "homeTown": "Quảng Trị", "homeClass": "22T_17", "majorName": "Mạng máy tính" },
          { "id": "user_527", "fullName": "Nguyễn Thị Vân", "email": "user527@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1996-12-10", "role": "STUDENT", "phoneNumber": "0978123401", "homeTown": "Quảng Bình", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_564", "fullName": "Lê Văn Hoa", "email": "user564@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-02-05", "role": "STUDENT", "phoneNumber": "0967123901", "homeTown": "Nghệ An", "homeClass": "22T_02", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_617", "fullName": "Phạm Thị Bình", "email": "user617@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-04-22", "role": "STUDENT", "phoneNumber": "0915998801", "homeTown": "Hà Tĩnh", "homeClass": "22T_04", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_629", "fullName": "Hoàng Thị Vinh", "email": "user629@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-06-30", "role": "STUDENT", "phoneNumber": "0982334401", "homeTown": "Thanh Hóa", "homeClass": "22T_16", "majorName": "An toàn Thông tin" },
          { "id": "user_644", "fullName": "Ngô Văn Vinh", "email": "user644@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-08-14", "role": "STUDENT", "phoneNumber": "0909556601", "homeTown": "Bình Định", "homeClass": "22T_08", "majorName": "Mạng máy tính" },
          { "id": "user_674", "fullName": "Ngô Văn Khánh", "email": "user674@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-12-08", "role": "STUDENT", "phoneNumber": "0935889901", "homeTown": "Phú Yên", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_706", "fullName": "Phạm Văn Bình", "email": "user706@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-08-02", "role": "STUDENT", "phoneNumber": "0996517401", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_08", "majorName": "Mạng máy tính" },
          { "id": "user_720", "fullName": "Phạm Văn Dũng", "email": "user720@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-04-25", "role": "STUDENT", "phoneNumber": "0972445501", "homeTown": "Khánh Hòa", "homeClass": "22T_04", "majorName": "Công nghệ Phần mềm" },
          { "id": "user_737", "fullName": "Trần Thị Tú", "email": "user737@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1999-07-18", "role": "STUDENT", "phoneNumber": "0918778801", "homeTown": "Gia Lai", "homeClass": "22T_07", "majorName": "Học máy" },
          { "id": "user_774", "fullName": "Đỗ Văn Ý", "email": "user774@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-12-11", "role": "STUDENT", "phoneNumber": "0903223301", "homeTown": "Đắk Lắk", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" },
          { "id": "user_782", "fullName": "Phạm Văn Hương", "email": "user782@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1998-02-14", "role": "STUDENT", "phoneNumber": "0934112201", "homeTown": "Lâm Đồng", "homeClass": "22T_19", "majorName": "Học máy" },
          { "id": "user_784", "fullName": "Đỗ Văn Phúc", "email": "user784@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-08-04", "role": "STUDENT", "phoneNumber": "0965334401", "homeTown": "Ninh Thuận", "homeClass": "22T_08", "majorName": "Mạng máy tính" },
          { "id": "user_809", "fullName": "Lê Thị Thảo", "email": "user809@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-05-19", "role": "STUDENT", "phoneNumber": "0979445501", "homeTown": "Bình Thuận", "homeClass": "22T_08", "majorName": "Mạng máy tính" },
          { "id": "user_869", "fullName": "Vũ Thị Ý", "email": "user869@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1998-11-09", "role": "STUDENT", "phoneNumber": "0911889901", "homeTown": "Đồng Nai", "homeClass": "22T_06", "majorName": "Mạng máy tính" },
          { "id": "user_872", "fullName": "Ngô Văn Vân", "email": "user872@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1999-07-27", "role": "STUDENT", "phoneNumber": "0988556601", "homeTown": "Bình Dương", "homeClass": "22T_14", "majorName": "Mạng máy tính" },
          { "id": "user_913", "fullName": "Đặng Thị Trung", "email": "user913@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-01", "role": "STUDENT", "phoneNumber": "0905778801", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_20", "majorName": "Khoa học Máy tính" }
        ];

        mockMap['pbl_class_1'] = class1;
        mockMap['pbl_class_2'] = class2;
        mockMap['pbl_class_3'] = class3;
        mockMap['pbl_class_4'] = class4;
        mockMap['pbl_class_5'] = class5;

        // Sinh tự động cho các lớp từ pbl_class_6 đến pbl_class_15 từ các lớp trên
        const allStudents = [...class1, ...class2, ...class3, ...class4, ...class5];
        for (let i = 6; i <= 15; i++) {
            mockMap[`pbl_class_${i}`] = allStudents.slice((i - 6) * 6, (i - 6) * 6 + 20).map((sv, idx) => ({
                ...sv,
                id: `user_${sv.id.split('_')[1]}_c${i}`,
                fullName: sv.fullName + ` (Lớp ${i})`,
                email: `user${sv.id.split('_')[1]}c${i}@dut.udn.vn`,
                homeClass: `22T_${(10 + i) % 25}`
            }));
        }

        return mockMap;
    });
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [fetchError, setFetchError] = useState('');

    // ── Mock data cho GV và AD (giữ nguyên) ─────────────────────────────────
    const [mockUsers] = useState([
        { id: 'gv_01', username: 'Trần Văn Minh', email: 'minh.tran@dut.udn.vn', role: 'GV', faculty: 'Công nghệ Thông tin' },
        { id: 'gv_02', username: 'Lê Thị Thu', email: 'thu.le@dut.udn.vn', role: 'GV', faculty: 'Điện - Điện tử' },
        { id: 'ad_01', username: 'Lê Quang Đạo', email: 'daole@dut.udn.vn', role: 'AD', faculty: 'Ban Giám hiệu' },
    ]);

    // ── 1. Fetch tất cả lớp PBL khi vào tab SV ──────────────────────────────
    const fetchAllClasses = useCallback(async () => {
        setLoadingClasses(true);
        setFetchError('');
        try {
            const res = await fetch(`${API_BASE}/pbl-classes`, { credentials: 'include' });
            if (!res.ok) throw new Error(`Lỗi tải danh sách lớp (${res.status})`);
            const classes = await res.json();
            setPblClasses(classes);
            return classes;
        } catch (err) {
            setFetchError(err.message);
            return [];
        } finally {
            setLoadingClasses(false);
        }
    }, []);

    // ── 2. Fetch sinh viên của TẤT CẢ lớp song song ─────────────────────────
    const fetchAllStudents = useCallback(async (classes) => {
        if (!classes || classes.length === 0) return;
        setLoadingStudents(true);
        try {
            const results = await Promise.allSettled(
                classes.map(cls =>
                    fetch(`${API_BASE}/pbl-classes/${cls.id}/students`, { credentials: 'include' })
                        .then(r => r.ok ? r.json() : [])
                        .then(students => ({ classId: cls.id, students }))
                )
            );
            const map = {};
            results.forEach(r => {
                if (r.status === 'fulfilled') {
                    map[r.value.classId] = r.value.students;
                }
            });
            setSvByClass(map);
        } catch (err) {
            console.error('Lỗi tải sinh viên:', err);
        } finally {
            setLoadingStudents(false);
        }
    }, []);

    // Chạy khi vào tab SV lần đầu hoặc khi activeTab chuyển sang SV
    useEffect(() => {
        if (activeTab === 'SV' && pblClasses.length === 0) {
            fetchAllClasses().then(classes => fetchAllStudents(classes));
        }
    }, [activeTab]);

    // ── Tổng hợp danh sách SV đã lọc ────────────────────────────────────────
    const allStudents = useMemo(() => {
        const seen = new Set();
        const result = [];

        if (pblClassFilter) {
            const list = svByClass[pblClassFilter] || [];
            list.forEach(sv => {
                if (!seen.has(sv.id)) {
                    seen.add(sv.id);
                    result.push(sv);
                }
            });
            return result;
        }

        Object.values(svByClass).forEach(list => {
            list.forEach(sv => {
                if (!seen.has(sv.id)) {
                    seen.add(sv.id);
                    result.push(sv);
                }
            });
        });

        return result;
    }, [svByClass, pblClassFilter]);

    const filteredStudents = useMemo(() => {
        if (!searchTerm.trim()) return allStudents;
        const kw = searchTerm.toLowerCase();
        return allStudents.filter(sv =>
            sv.fullName?.toLowerCase().includes(kw) ||
            sv.email?.toLowerCase().includes(kw) ||
            sv.id?.toLowerCase().includes(kw)
        );
    }, [allStudents, searchTerm]);

    // Lọc GV / AD từ mock
    const filteredMock = useMemo(() => {
        let result = mockUsers.filter(u => u.role === activeTab);
        if (searchTerm.trim()) {
            const kw = searchTerm.toLowerCase();
            result = result.filter(u =>
                u.username.toLowerCase().includes(kw) ||
                u.email.toLowerCase().includes(kw)
            );
        }
        return result;
    }, [mockUsers, activeTab, searchTerm]);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const getPblClassName = (classId) => {
        const cls = pblClasses.find(c => c.id === classId);
        return cls ? `${cls.className} (${cls.semester})` : classId;
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm('');
        setPblClassFilter('');
        setShowFilterDialog(null);
    };

    const isLoading = activeTab === 'SV' && (loadingClasses || loadingStudents);

    return (
        <div className="dashboard-body" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
            
            {/* ── Header Navbar ── */}
            <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1000 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/picture/ITFDUT.jpg" alt="ITFDUT Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Hệ thống PBL</h1>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Project-Based Learning Portal</p>
                    </div>
                </div>
                
                <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                    <i className="fas fa-user-shield" style={{ fontSize: '18px' }}></i> Admin Portal
                </div>
            </header>

            <main className="container-fluid" style={{ maxWidth: '1300px', margin: '40px auto', padding: '0 40px', boxSizing: 'border-box', textAlign: 'left' }}>
                <div style={{ marginBottom: '25px' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="back-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Quay lại Dashboard
                    </button>
                </div>

                <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ color: '#003366', fontSize: '2.5rem', marginBottom: '10px' }}>Quản lý Tài khoản</h2>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>Hệ thống quản trị tài khoản Giảng viên, Sinh viên và Admin</p>
                </div>

                {/* Tab buttons */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <TabButton active={activeTab === 'SV'} onClick={() => handleTabChange('SV')} label="Tài khoản Sinh viên" />
                    <TabButton active={activeTab === 'GV'} onClick={() => handleTabChange('GV')} label="Tài khoản Giảng viên" />
                    <TabButton active={activeTab === 'AD'} onClick={() => handleTabChange('AD')} label="Tài khoản Admin" />
                </div>

                <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eef0f3', marginBottom: '40px' }}>
                    
                    {/* Toolbar / Filters */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', flexGrow: 1 }}>
                            
                            {/* Search box */}
                            <div className="search-container" style={{ margin: 0, maxWidth: '400px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '12px', color: '#666' }}></i>
                                <input
                                    type="text"
                                    placeholder={`Tìm theo tên, email${activeTab === 'SV' ? ', mã SV' : ''}...`}
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', padding: '10px 15px 10px 35px', borderRadius: '20px', border: '1px solid #eee', outline: 'none', backgroundColor: '#f8f9fa' }}
                                />
                            </div>

                            {/* Bộ lọc Lớp PBL — chỉ hiện ở tab SV */}
                            {activeTab === 'SV' && (
                                <div style={{ minWidth: '240px' }}>
                                    <select
                                        value={pblClassFilter}
                                        onChange={(e) => setPblClassFilter(e.target.value)}
                                        style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #eee', outline: 'none', backgroundColor: '#f8f9fa', fontSize: '0.9rem', color: '#333' }}
                                    >
                                        <option value="">Tất cả lớp PBL</option>
                                        {pblClasses.map(cls => (
                                            <option key={cls.id} value={cls.id}>📚 {cls.className} ({cls.semester})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Nút reset bộ lọc */}
                            {(searchTerm || pblClassFilter) && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setPblClassFilter('');
                                    }}
                                    className="back-btn"
                                    style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '0.85rem' }}
                                >
                                    <i className="fas fa-undo"></i> Thiết lập lại
                                </button>
                            )}
                        </div>

                        {/* Thống kê nhanh nằm bên phải */}
                        <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#666', background: '#f8f9fa', padding: '8px 20px', borderRadius: '20px', border: '1px solid #eee', fontWeight: '500' }}>
                            {activeTab === 'SV' ? (
                                <>
                                    <span>Tổng số lớp: <b>{pblClasses.length}</b></span>
                                    <span>|</span>
                                    <span>Tổng SV: <b>{allStudents.length}</b></span>
                                    {pblClassFilter && (
                                        <>
                                            <span>|</span>
                                            <span>Bộ lọc: <b>{filteredStudents.length}</b></span>
                                        </>
                                    )}
                                </>
                            ) : (
                                <span>Tổng số: <b>{filteredMock.length}</b></span>
                            )}
                        </div>
                    </div>

                    {/* ── Bảng dữ liệu ── */}
                    <div style={{ overflowX: 'auto' }}>
                        {/* Tab SV */}
                        {activeTab === 'SV' && (
                            <>
                                {fetchError && (
                                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem' }}>
                                        ⚠️ {fetchError} —{' '}
                                        <button onClick={() => fetchAllClasses().then(c => fetchAllStudents(c))} style={{ background: 'none', border: 'none', color: '#e11d48', textDecoration: 'underline', cursor: 'pointer' }}>Thử lại</button>
                                    </div>
                                )}

                                {isLoading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', border: '4px solid #eef0f3', borderTopColor: '#003366', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                        <span style={{ color: '#888', fontSize: '0.95rem' }}>
                                            {loadingClasses ? 'Đang tải danh sách lớp...' : 'Đang tải sinh viên từ các lớp...'}
                                        </span>
                                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                    </div>
                                ) : (
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left', backgroundColor: '#fafbff' }}>
                                                <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Mã SV</th>
                                                <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Họ và tên</th>
                                                <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Email</th>
                                                <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Lớp hành chính</th>
                                                <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.map(sv => (
                                                <tr key={sv.id} style={{ borderBottom: '1px solid #f4f7fe' }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafbff'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <td style={{ padding: '14px 15px' }}>
                                                        <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: '#f4f7fe', padding: '3px 8px', borderRadius: '6px', color: '#003366', fontWeight: '600' }}>
                                                            {sv.id}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 15px' }}>
                                                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{sv.fullName}</div>
                                                    </td>
                                                    <td style={{ padding: '14px 15px', color: '#555', fontSize: '0.9rem' }}>{sv.email}</td>
                                                    <td style={{ padding: '14px 15px' }}>
                                                        {sv.homeClass ? (
                                                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '600' }}>
                                                                {sv.homeClass}
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: '#bbb', fontSize: '0.85rem' }}>—</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '14px 15px' }}>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button
                                                                onClick={() => setViewingUser({ id: sv.id, role: 'STUDENT' })}
                                                                style={{ border: 'none', background: '#eef2ff', color: '#003366', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem' }}
                                                                title="Xem hồ sơ"
                                                            >
                                                                👁️ Xem
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredStudents.length === 0 && !isLoading && (
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
                                                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎓</div>
                                                        <div style={{ fontWeight: '600', marginBottom: '5px' }}>Không có sinh viên</div>
                                                        <div style={{ fontSize: '0.85rem' }}>
                                                            {pblClassFilter ? 'Lớp này chưa có sinh viên nào.' : 'Không tìm thấy sinh viên phù hợp.'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}

                        {/* Tab GV / AD — dữ liệu mock */}
                        {(activeTab === 'GV' || activeTab === 'AD') && (
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left', backgroundColor: '#fafbff' }}>
                                        <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Người dùng</th>
                                        <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Email</th>
                                        <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Khoa / Đơn vị</th>
                                        <th style={{ padding: '14px 15px', color: '#003366', fontSize: '0.95rem', fontWeight: 'bold' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMock.map(u => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid #f4f7fe' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafbff'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td style={{ padding: '14px 15px' }}>
                                                <div style={{ fontWeight: '600', color: '#1e293b' }}>{u.username}</div>
                                            </td>
                                            <td style={{ padding: '14px 15px', color: '#555' }}>{u.email}</td>
                                            <td style={{ padding: '14px 15px', color: '#555' }}>{u.faculty}</td>
                                            <td style={{ padding: '14px 15px' }}>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        onClick={() => setViewingUser({ id: u.id, role: u.role === 'GV' ? 'LECTURER' : 'ADMIN' })}
                                                        style={{ border: 'none', background: '#eef2ff', color: '#003366', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem' }}
                                                    >
                                                        👁️ Xem
                                                    </button>
                                                    {activeTab === 'GV' && (
                                                        <>
                                                            <button style={{ border: 'none', background: '#f0f9ff', color: '#0066cc', padding: '7px 10px', borderRadius: '8px', cursor: 'pointer' }}>✏️</button>
                                                            <button style={{ border: 'none', background: '#fff1f2', color: '#e11d48', padding: '7px 10px', borderRadius: '8px', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredMock.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
                                                Không có dữ liệu phù hợp.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>

            {viewingUser && (
                <UserProfileModal
                    userId={viewingUser.id}
                    role={viewingUser.role}
                    onClose={() => setViewingUser(null)}
                />
            )}
        </div>
    );
};

const TabButton = ({ active, onClick, label }) => (
    <button
        onClick={onClick}
        style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', borderRadius: '16px',
            border: active ? '2px solid #003366' : '1px solid #eef0f3',
            backgroundColor: active ? '#eef2ff' : '#fff',
            cursor: 'pointer', transition: 'all 0.3s'
        }}
    >
        <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: active ? '#003366' : '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#fff' : '#003366', fontSize: '1.2rem' }}>
            {label.includes('Sinh viên') ? '👥' : label.includes('Giảng viên') ? '👩‍🏫' : '🛡️'}
        </div>
        <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: active ? '#003366' : '#888', fontWeight: '500' }}>Quản lý</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{label}</div>
        </div>
    </button>
);

export default AccountManagement;