// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { login as loginApi } from "../services/authService";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle = async e => {
    e.preventDefault();
    try {
      const res = await loginApi(username, password);
      login(res.data.token);
      navigate("/");
    } catch {
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handle} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-xl mb-4">Đăng nhập</h2>
        <input className="w-full border p-2 mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="w-full border p-2 mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
