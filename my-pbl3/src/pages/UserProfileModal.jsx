import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import '../css/DashboardExt.css';

const API_BASE = 'http://localhost:8080/api';

// Map short-form roles (used in AccountManagement) and full roles to endpoints
const ROLE_ENDPOINT = {
    STUDENT:  (id) => `${API_BASE}/students/${id}`,
    LECTURER: (id) => `${API_BASE}/lecturers/${id}`,
    ADMIN:    (id) => `${API_BASE}/admins/${id}`,
    SV:       (id) => `${API_BASE}/students/${id}`,
    GV:       (id) => `${API_BASE}/lecturers/${id}`,
    AD:       (id) => `${API_BASE}/admins/${id}`,
};

const MOCK_STUDENTS = [
  // Class 1
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
  { "id": "user_998", "fullName": "Hoàng Văn Châu", "email": "user998@dut.udn.vn", "gender": "MALE", "dateOfBirth": "1997-01-01", "role": "STUDENT", "phoneNumber": "0905778899", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },

  // Class 2
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
  { "id": "user_991", "fullName": "Bùi Thị Minh", "email": "user991@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-12-01", "role": "STUDENT", "phoneNumber": "0905778809", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_01", "majorName": "Công nghệ Phần mềm" },

  // Class 3
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
  { "id": "user_997", "fullName": "Ngô Thị Tú", "email": "user997@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-10-01", "role": "STUDENT", "phoneNumber": "0905778883", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_07", "majorName": "An toàn Thông tin" },

  // Class 4
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
  { "id": "user_963", "fullName": "Lê Thị Bình", "email": "user963@dut.udn.vn", "gender": "FEMALE", "dateOfBirth": "1997-04-01", "role": "STUDENT", "phoneNumber": "0905778808", "homeTown": "TP Hồ Chí Minh", "homeClass": "22T_05", "majorName": "Công nghệ Phần mềm" },

  // Class 5
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

/**
 * Normalise an API response from the accounts table.
 * The backend may return snake_case OR camelCase — handle both.
 */
const normalise = (data) => ({
    id:          data.id,
    role:        data.role ?? 'STUDENT',
    fullName:    data.fullname      ?? data.fullName      ?? data.full_name  ?? '',
    email:       data.email         ?? '',
    phoneNumber: data.phone_number  ?? data.phonenumber   ?? data.phoneNumber ?? '',
    gender:      data.gender        ?? 'FEMALE',
    dateOfBirth: data.date_of_birth ?? data.dateofbirth   ?? data.dateOfBirth ?? '',
    homeTown:    data.home_town     ?? data.hometown      ?? data.homeTown    ?? '',
    homeClass:   data.homeClass     ?? data.home_class    ?? data.class_name  ?? '',
    majorName:   data.majorName     ?? data.major_name    ?? '',
    degree:         data.degree         ?? '',
    position:       data.position       ?? '',
    specialization: data.specialization ?? '',
    departmentName: data.departmentName ?? data.department_name ?? '',
    pblClassNames:  data.pblClassNames  ?? data.pbl_class_names ?? [],
});

const fmt = {
    date: (d) => { 
        if (!d) return '—'; 
        const parts = d.split('-'); 
        if (parts.length !== 3) return d;
        const [y, m, day] = parts; 
        return `${day}/${m}/${y}`; 
    },
    gender: (g) => g === 'MALE' ? 'Nam' : g === 'FEMALE' ? 'Nữ' : g || '—',
    role: (r) => ({ STUDENT: 'Sinh viên', LECTURER: 'Giảng viên', ADMIN: 'Quản trị viên', SV: 'Sinh viên', GV: 'Giảng viên', AD: 'Quản trị viên' }[r] ?? r),
};

/**
 * UserProfileModal
 * Props:
 *   userId  {string} — the target user's ID
 *   role    {string} — STUDENT | LECTURER | ADMIN | SV | GV | AD
 *   onClose {func}   — called when modal is dismissed
 */
const UserProfileModal = ({ userId, role, onClose }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Hỗ trợ kiểm thử trực tiếp bằng mock data cho toàn bộ danh sách sinh viên
        let targetId = userId;
        let suffix = "";
        if (userId.includes("_c")) {
            // ví dụ: user_65_c6 -> targetId: user_65, suffix: " (Lớp 6)"
            const parts = userId.split("_c");
            targetId = parts[0];
            suffix = ` (Lớp ${parts[1]})`;
        }

        const mockFound = MOCK_STUDENTS.find(s => s.id === targetId);
        if (mockFound) {
            setProfile(normalise({
                ...mockFound,
                id: userId,
                fullName: mockFound.fullName + suffix,
                email: suffix ? `user${targetId.split('_')[1]}c${userId.split('_c')[1]}@dut.udn.vn` : mockFound.email,
                homeClass: suffix ? `22T_${(10 + parseInt(userId.split('_c')[1])) % 25}` : mockFound.homeClass
            }));
            setLoading(false);
            return;
        }

        const endpoint = ROLE_ENDPOINT[role]?.(userId);
        if (!endpoint) { setError('Vai trò không hợp lệ.'); setLoading(false); return; }

        fetch(endpoint, { credentials: 'include' })
            .then(r => { if (!r.ok) throw new Error(`Lỗi ${r.status}`); return r.json(); })
            .then(data => setProfile(normalise(data)))
            .catch(e => {
                console.error("Lỗi fetch profile:", e);
                // Fallback nếu kết nối API thất bại để người dùng luôn xem được giao diện
                if (role === 'STUDENT' || role === 'SV') {
                    setProfile(normalise(MOCK_STUDENTS[0]));
                } else {
                    setError(`Không thể tải thông tin: ${e.message}`);
                }
            })
            .finally(() => setLoading(false));
    }, [userId, role]);

    // Close on backdrop click
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

    const isStudent = profile && (profile.role === 'STUDENT' || role === 'SV' || role === 'STUDENT');
    const modalWidth = isStudent ? '850px' : '520px';
    const modalPadding = isStudent ? '40px' : '32px';

    return (
        <div onClick={handleBackdrop} style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
            backdropFilter: 'blur(3px)'
        }}>
            <div style={{
                backgroundColor: '#fff', borderRadius: '16px', padding: modalPadding,
                width: modalWidth, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)', transition: 'all 0.3s ease-in-out'
            }}>
                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '15px' }}>
                        <div style={{ width: '35px', height: '35px', border: '3px solid #eef0f3', borderTopColor: '#003366', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        <p style={{ color: '#888', margin: 0 }}>Đang tải thông tin chi tiết...</p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <p style={{ color: '#e11d48', fontWeight: '600', marginBottom: '15px' }}>⚠️ {error}</p>
                        <button onClick={onClose} className="btn" style={{ width: 'auto', padding: '8px 20px' }}>Đóng lại</button>
                    </div>
                )}

                {!loading && !error && profile && (
                    <>
                        {isStudent ? (
                            /* ============================================================== */
                            /* STUDENT DETAIL INTERFACE - SYNCHRONIZED WITH THUVIENPBL_XEM.JSX */
                            /* ============================================================== */
                            <div>
                                {/* Back Button Container */}
                                <div style={{ marginBottom: '25px' }}>
                                    <button onClick={onClose} className="back-btn">
                                        <i className="fas fa-arrow-left"></i> Quay lại Danh sách Tài khoản
                                    </button>
                                </div>

                                {/* Header Profile Section */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '30px' }}>
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`}
                                        alt="avatar"
                                        style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid #eef2ff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                                    />
                                    <div>
                                        <h2 style={{ color: '#003366', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                                            {profile.fullName}
                                        </h2>
                                        <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ padding: '3px 10px', backgroundColor: '#eef2ff', color: '#003366', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {fmt.role(profile.role)}
                                            </span>
                                            <span>&middot; Mã sinh viên: <b>{profile.id}</b></span>
                                        </p>
                                    </div>
                                </div>

                                {/* Section 1: Thông tin cá nhân */}
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366', borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '30px 0 20px' }}>
                                    Thông tin cá nhân
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#f9fbff', padding: '25px', borderRadius: '10px', border: '1px solid #eef2f6', marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-venus-mars" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Giới tính:</b> {fmt.gender(profile.gender)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-calendar-alt" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Ngày sinh:</b> {fmt.date(profile.dateOfBirth)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-phone" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Số điện thoại:</b> {profile.phoneNumber || '—'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-map-marker-alt" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Quê quán:</b> {profile.homeTown || '—'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333', gridColumn: 'span 2' }}>
                                        <i className="fas fa-envelope" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Email liên hệ:</b> <a href={`mailto:${profile.email}`} style={{ color: '#003366', textDecoration: 'none', fontWeight: '500' }}>{profile.email}</a></span>
                                    </div>
                                </div>

                                {/* Section 2: Thông tin học tập & Chuyên ngành */}
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366', borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '30px 0 20px' }}>
                                    Thông tin học tập & Chuyên ngành
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#f9fbff', padding: '25px', borderRadius: '10px', border: '1px solid #eef2f6', marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-graduation-cap" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Lớp hành chính:</b> {profile.homeClass || '—'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#333' }}>
                                        <i className="fas fa-book" style={{ color: '#003366', fontSize: '1.2rem', width: '20px', textAlign: 'center' }}></i>
                                        <span><b>Chuyên ngành:</b> {profile.majorName || '—'}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ============================================================== */
                            /* DEFAULT INTERFACE FOR OTHER ROLES (LECTURER, ADMIN)            */
                            /* ============================================================== */
                            <div>
                                {/* Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <h3 style={{ margin: 0, color: '#003366', fontSize: '1.1rem', fontWeight: 700 }}>
                                        Thông tin chi tiết
                                    </h3>
                                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }}>✕</button>
                                </div>

                                {/* Avatar + name */}
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`}
                                        alt="avatar"
                                        style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 10 }}
                                    />
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#003366' }}>{profile.fullName}</div>
                                    <span style={{
                                        backgroundColor: '#eef2ff', color: '#003366',
                                        padding: '3px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600
                                    }}>
                                        {fmt.role(profile.role ?? role)}
                                    </span>
                                </div>

                                {/* Basic fields */}
                                <Section title="Thông tin cơ bản">
                                    <Row label="Email"        value={profile.email} />
                                    <Row label="Giới tính"    value={fmt.gender(profile.gender)} />
                                    <Row label="Ngày sinh"    value={fmt.date(profile.dateOfBirth)} />
                                    <Row label="Số điện thoại" value={profile.phoneNumber} />
                                    <Row label="Quê quán"     value={profile.homeTown} />
                                </Section>

                                {/* Lecturer-specific */}
                                {(profile.role === 'LECTURER' || role === 'GV') && (
                                    <Section title="Thông tin giảng viên">
                                        <Row label="Học vị"      value={profile.degree} />
                                        <Row label="Chức vụ"     value={profile.position} />
                                        <Row label="Chuyên môn"  value={profile.specialization} />
                                        <Row label="Khoa/Bộ môn" value={profile.departmentName} />
                                        {profile.pblClassNames?.length > 0 && (
                                            <Row label="Lớp PBL phụ trách" value={profile.pblClassNames.join(', ')} />
                                        )}
                                    </Section>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
);

const Row = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8f9fa', borderRadius: 8 }}>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>{label}</span>
        <span style={{ color: '#333', fontWeight: 600, fontSize: '0.9rem' }}>{value || '—'}</span>
    </div>
);

export default UserProfileModal;
