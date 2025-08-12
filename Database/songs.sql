-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 12, 2025 lúc 06:50 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `music`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `song_name` varchar(255) DEFAULT NULL,
  `id_singer` int(11) DEFAULT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `songs`
--

INSERT INTO `songs` (`id`, `filename`, `poster`, `song_name`, `id_singer`, `filepath`, `uploaded_at`) VALUES
(1, '7pxhe9uuri.mp3', 'uploads\\1754880040978-968029296.png', 'Bởi vì đam mê', 1, 'uploads\\1754880040940-26156430.mp3', NULL),
(7, 'ChayNgayDi-SonTungMTP-5468704.mp3', 'uploads\\1754921390611-388746727.png', 'Chạy ngay đi', 2, 'uploads\\1754921390535-944446633.mp3', NULL),
(8, 'HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3', 'uploads\\1754921571603-943968422.png', 'Hãy trao cho anh', 2, 'uploads\\1754921571569-622279292.mp3', NULL),
(9, 'NgoiSaoCoDon-JackJ97-7611601.mp3', 'uploads\\1754921903298-108359765.png', 'Ngôi sao cô đơn', 3, 'uploads\\1754921903264-486615905.mp3', NULL),
(10, 'tong_phu.mp3', 'uploads\\1754923863223-467103275.png', 'Tòng phu', 4, 'uploads\\1754923863170-82442229.mp3', NULL),
(11, 'song_gio.mp3', 'uploads\\1754923893173-238656936.png', 'Sóng gió', 3, 'uploads\\1754923893137-191480675.mp3', NULL),
(12, 'bac_phan.mp3', 'uploads\\1754972765329-225360953.png', 'bạc phận', 3, 'uploads\\1754972765295-374836178.mp3', NULL),
(13, 'EmCuaNgayHomQua-SonTungMTP-2882720.mp3', 'uploads\\1754972831796-900158147.png', 'Em của ngày hôm qua', 2, 'uploads\\1754972831754-38815193.mp3', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_singer` (`id_singer`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`id_singer`) REFERENCES `singers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
