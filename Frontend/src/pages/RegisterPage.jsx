import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      await register(username, password);
      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data || "Đăng ký thất bại";
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl mb-4 text-center font-semibold">Đăng ký tài khoản</h2>
        <input
          className="w-full border p-2 mb-3"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Xác nhận mật khẩu"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
