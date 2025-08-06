// src/pages/UserPage.jsx
import React, { useContext } from "react";
import UserProductList from "../components/UserProductList";
import { AuthContext } from "../components/AuthContext";

export default function UserPage() {
  const { token } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <UserProductList token={token} />
    </div>
  );
}
