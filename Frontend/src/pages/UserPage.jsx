import React, { useContext, useState, useEffect } from "react";
import UserProductList from "../components/UserProductList";
import { AuthContext } from "../components/AuthContext";
import AvatarUpload from "../components/AvatarUpload";

export default function UserPage() {
  const { user, token } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    async function fetchHistory() {
      if (!token || !user) return;
      try {
        const res = await fetch(`http://localhost:8082/api/history/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setHistory(data);
        }
      } catch (err) {
        console.error("Lỗi lấy lịch sử nghe nhạc", err);
      }
    }
    fetchHistory();
  }, [token, user]);

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

      {/* Danh sách lịch sử nghe nhạc */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lịch sử nghe nhạc</h2>
        {history.length === 0 ? (
          <p>Bạn chưa nghe bài hát nào</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item) => {
              const song = item.song || {};
              const songName = song.song_name || `Bài hát #${item.songId}`;
              // Đường dẫn file nhạc và poster, sửa theo url server Node.js
              const audioUrl = `http://localhost:5000/${song.filepath?.replace(/\\/g, "/")}`;
              const posterUrl = `http://localhost:5000/${song.poster?.replace(/\\/g, "/")}`;

              return (
                <li key={item.id} className="flex items-center space-x-4">
                  {posterUrl && (
                    <img
                      src={posterUrl}
                      alt={songName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{songName}</div>
                    <div className="text-gray-500 text-sm">
                      {new Date(item.listenedAt).toLocaleString()}
                    </div>
                    {audioUrl && (
                      <audio controls src={audioUrl} className="mt-1 w-full" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <UserProductList token={token} />
    </div>
  );
}
