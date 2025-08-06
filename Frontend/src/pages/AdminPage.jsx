import React, { useContext } from "react";
import AdminProductList from "../components/AdminProductList";
import { AuthContext } from "../components/AuthContext"; // để lấy token nếu cần

export default function AdminPage() {
  const { token } = useContext(AuthContext); // lấy token từ context

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Panel</h1>
      <AdminProductList token={token} />
    </div>
  );
}
