import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function UserProductList() {
  const { token } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);

  // Lấy danh sách bài hát từ Music Service
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("http://localhost:5000/api/songs");
        const data = await res.json();
        if (res.ok) {
          setSongs(data);
        }
      } catch (err) {
        console.error("Lỗi lấy danh sách bài hát", err);
      }
    }
    fetchSongs();
  }, []);

  // Lưu lịch sử nghe nhạc
  const handlePlaySong = async (songId) => {
    try {
      const res = await fetch("http://localhost:8082/api/history/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });

      if (res.ok) {
        alert("Bắt đầu nghe nhạc và lưu vào lịch sử");
      } else {
        console.error("Không lưu được lịch sử nghe nhạc");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API History Service", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách bài hát</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="border rounded-lg p-4 flex flex-col items-center shadow-sm"
          >
            <img
              src={song.poster}
              alt={song.songName}
              className="w-32 h-32 object-cover mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold">{song.songName}</h3>
            <p className="text-gray-500 text-sm mb-2">ID: {song.id}</p>
            <button
              onClick={() => handlePlaySong(song.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-auto"
            >
              Nghe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
