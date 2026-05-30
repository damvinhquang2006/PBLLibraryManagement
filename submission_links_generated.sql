-- ================================================================
--  FILE: submission_links_generated.sql
--  Sinh tu dong boi: generate_submission_links.ps1
--  Thoi gian: 2026-05-29 22:43:20
--  Thu muc nguon: D:\WordForInstall
--  Tong so ban ghi: 12
-- ================================================================

-- ----------------------------------------------------------------
--  PHAN 1: TAO BANG submission_links
--  (PostgreSQL) - Bo qua neu bang da ton tai
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS submission_links (
    id            BIGINT          PRIMARY KEY,
    description   VARCHAR(500),
    link_type     VARCHAR(50)     NOT NULL,
    url           VARCHAR(1000)   NOT NULL,
    submission_id BIGINT          NOT NULL
);

-- SQL Server equivalent:
-- IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='submission_links' AND xtype='U')
-- CREATE TABLE submission_links (
--     id            BIGINT          PRIMARY KEY,
--     description   NVARCHAR(500),
--     link_type     NVARCHAR(50)    NOT NULL,
--     url           NVARCHAR(1000)  NOT NULL,
--     submission_id BIGINT          NOT NULL
-- );

-- ----------------------------------------------------------------
--  PHAN 2: INSERT DU LIEU (12 ban ghi)
-- ----------------------------------------------------------------

-- [1] 24Nh10-DHMT-BaiTapTinhToan05-102240049.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (1, 'Bai tap / Nop bai: 24Nh10-DHMT-BaiTapTinhToan05-102240049', 'assignment', 'http://localhost:8080/api/reports/download/24Nh10-DHMT-BaiTapTinhToan05-102240049.docx', 1001);

-- [2] 24Nh10-DHMT-Lab02a-102240065-102240034-102240049.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (2, 'Tai lieu thuc hanh: 24Nh10-DHMT-Lab02a-102240065-102240034-102240049', 'lab', 'http://localhost:8080/api/reports/download/24Nh10-DHMT-Lab02a-102240065-102240034-102240049.docx', 1002);

-- [3] 7.9.25.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (3, 'Tai lieu dinh kem: 7.9.25', 'document', 'http://localhost:8080/api/reports/download/7.9.25.docx', 1003);

-- [4] CHƯƠNG 6.  Quy tắc coding, Kịch bản kiểm thứ.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (4, 'Tai lieu huong dan ky thuat: CHƯƠNG 6.  Quy tắc coding, Kịch bản kiểm thứ', 'guideline', 'http://localhost:8080/api/reports/download/CH%C6%AF%C6%A0NG%206.%20%20Quy%20t%E1%BA%AFc%20coding%2C%20K%E1%BB%8Bch%20b%E1%BA%A3n%20ki%E1%BB%83m%20th%E1%BB%A9.docx', 1004);

-- [5] Lab3 - Thực hành cấu hình IPv6 trên Packet Tracer.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (5, 'Tai lieu thuc hanh: Lab3 - Thực hành cấu hình IPv6 trên Packet Tracer', 'lab', 'http://localhost:8080/api/reports/download/Lab3%20-%20Th%E1%BB%B1c%20h%C3%A0nh%20c%E1%BA%A5u%20h%C3%ACnh%20IPv6%20tr%C3%AAn%20Packet%20Tracer.docx', 1005);

-- [6] lệnh lab4.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (6, 'Tai lieu thuc hanh: lệnh lab4', 'lab', 'http://localhost:8080/api/reports/download/l%E1%BB%87nh%20lab4.docx', 1006);

-- [7] Link source code.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (7, 'Lien ket ma nguon du an: Link source code', 'source_code', 'http://localhost:8080/api/reports/download/Link%20source%20code.docx', 1007);

-- [8] Mẫu báo cáo đồ họa máy tính.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (8, 'Tai lieu dinh kem: Mẫu báo cáo đồ họa máy tính', 'document', 'http://localhost:8080/api/reports/download/M%E1%BA%ABu%20b%C3%A1o%20c%C3%A1o%20%C4%91%E1%BB%93%20h%E1%BB%8Da%20m%C3%A1y%20t%C3%ADnh.docx', 1008);

-- [9] Nộp OOAD.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (9, 'So do thiet ke he thong: Nộp OOAD', 'diagram', 'http://localhost:8080/api/reports/download/N%E1%BB%99p%20OOAD.docx', 1009);

-- [10] Quản lý đề tài PBL version Quang.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (10, 'Bao cao de tai PBL: Quản lý đề tài PBL version Quang', 'pbl_project', 'http://localhost:8080/api/reports/download/Qu%E1%BA%A3n%20l%C3%BD%20%C4%91%E1%BB%81%20t%C3%A0i%20PBL%20version%20Quang.docx', 1010);

-- [11] Sơ đồ lớp và sơ đồ tuần tự (Class, Sequence Diagram).docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (11, 'So do thiet ke he thong: Sơ đồ lớp và sơ đồ tuần tự (Class, Sequence Diagram)', 'diagram', 'http://localhost:8080/api/reports/download/S%C6%A1%20%C4%91%E1%BB%93%20l%E1%BB%9Bp%20v%C3%A0%20s%C6%A1%20%C4%91%E1%BB%93%20tu%E1%BA%A7n%20t%E1%BB%B1%20(Class%2C%20Sequence%20Diagram).docx', 1011);

-- [12] Xây dựng hệ thống quản lý sinh viên.docx
INSERT INTO submission_links (id, description, link_type, url, submission_id)
VALUES (12, 'Tai lieu dinh kem: Xây dựng hệ thống quản lý sinh viên', 'document', 'http://localhost:8080/api/reports/download/X%C3%A2y%20d%E1%BB%B1ng%20h%E1%BB%87%20th%E1%BB%91ng%20qu%E1%BA%A3n%20l%C3%BD%20sinh%20vi%C3%AAn.docx', 1012);

-- ----------------------------------------------------------------
--  THONG KE PHAN LOAI (link_type)
--    assignment      : 1 file
--    diagram         : 2 file
--    document        : 3 file
--    guideline       : 1 file
--    lab             : 3 file
--    pbl_project     : 1 file
--    source_code     : 1 file
-- ----------------------------------------------------------------
