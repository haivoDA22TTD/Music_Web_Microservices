-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 12, 2025 lúc 06:51 AM
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
-- Cơ sở dữ liệu: `historydb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `listening_history`
--

CREATE TABLE `listening_history` (
  `id` bigint(20) NOT NULL,
  `listened_at` datetime(6) DEFAULT NULL,
  `song_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `listening_history`
--

INSERT INTO `listening_history` (`id`, `listened_at`, `song_id`, `user_id`) VALUES
(2, '2025-08-11 20:06:37.000000', 1, 1),
(12, '2025-08-11 21:12:06.000000', 7, 1),
(13, '2025-08-11 21:12:57.000000', 8, 1),
(14, '2025-08-11 21:18:41.000000', 9, 1),
(15, '2025-08-11 21:20:35.000000', 9, 2),
(16, '2025-08-11 21:52:02.000000', 10, 2),
(17, '2025-08-11 21:52:25.000000', 1, NULL),
(18, '2025-08-12 11:24:39.000000', 11, 2),
(19, '2025-08-12 11:26:11.000000', 12, 2),
(20, '2025-08-12 11:26:25.000000', 12, 2),
(21, '2025-08-12 11:27:27.000000', 13, 2),
(22, '2025-08-12 11:27:31.000000', 13, 2),
(23, '2025-08-12 11:29:03.000000', 10, 3),
(24, '2025-08-12 11:36:25.000000', 7, 3),
(25, '2025-08-12 11:40:36.000000', 8, 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `listening_history`
--
ALTER TABLE `listening_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `listening_history`
--
ALTER TABLE `listening_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
