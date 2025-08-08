import React, { useContext, useState, useEffect } from "react";
import UserProductList from "../components/UserProductList";
import { AuthContext } from "../components/AuthContext";
import AvatarUpload from "../components/AvatarUpload"; // import component upload avatar

export default function UserPage() {
  const { token } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Giả sử bạn có API lấy profile user để lấy avatar URL
  useEffect(() => {
    async function fetchProfile() {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAvatarUrl(`http://localhost:3000${data.avatarUrl || ""}`);
        }
      } catch (err) {
        console.error("Lỗi lấy profile", err);
      }
    }

    fetchProfile();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border mb-4"
        />
      )}

      <AvatarUpload token={token} initialAvatar={avatarUrl} />

      <UserProductList token={token} />
    </div>
  );
}
