# 🎵 Online Music(Microservices Architecture)

Một nền tảng nghe nhạc trực tuyến được xây dựng theo kiến trúc Microservice, giúp người dùng trải nghiệm nghe nhạc mượt mà, tìm kiếm bài hát, tạo playlist cá nhân, và nhiều tính năng hấp dẫn khác.

---

## 📌 Mục Lục

- [🚀 Tính năng chính](#-tính-năng-chính)
- [⚙️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🧩 Cấu trúc Microservices](#-cấu-trúc-microservices)
- [🖥️ Hướng dẫn chạy ứng dụng](#️-hướng-dẫn-chạy-ứng-dụng)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [📜 License](#-license)

---

## 🚀 Tính năng chính

- 🎧 Nghe nhạc trực tuyến chất lượng cao
- 🔍 Tìm kiếm bài hát, nghệ sĩ, album
- 📂 Tạo và quản lý playlist cá nhân
- ❤️ Yêu thích bài hát
- 🧑 Trang cá nhân và quản lý tài khoản
- ⏱ Lịch sử nghe nhạc gần đây
- 🧠 Gợi ý bài hát theo sở thích
- 📱 Responsive UI cho cả desktop và mobile
- 🌙 Hỗ trợ Dark Mode: Giao diện nền tối giúp bảo vệ mắt và tiết kiệm pin.

---

  ## 🔌 Port của các Service

| Tên Service           | Công nghệ sử dụng | Port mặc định |
|-----------------------|-------------------|---------------|
| Frontend (UI)         | React Vite        | `5173`        |
| Managerment Music Service | Node.js | `5001 |
| Auth Service          | Spring Boot       | `8081`        |
| User Service          | NestJS            | `3000`        |
| Music Service         | Node js           | `5000`        |
| Listening History Service| Spring Boot    | `8082`        |
| Eureka Server         |    Spring Boot    | `8761`        |
## ⚙️ Kiến trúc hệ thống

Ứng dụng được thiết kế theo kiến trúc **Microservices** giúp dễ dàng mở rộng, bảo trì và phát triển độc lập từng module.

<img width="600" height="685" alt="image" src="https://github.com/user-attachments/assets/dc5b07a5-b152-459e-828a-79595a778d80" />
