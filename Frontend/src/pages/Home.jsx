// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import { fetchSongs } from "../api/songs";
import { saveListeningHistory } from "../api/history"; // ✅ import API lưu lịch sử
import { AuthContext } from "../components/AuthContext"; // ✅ lấy token người dùng

const Home = () => {
    const [songs, setSongs] = useState([]);

    const { user, token } = useContext(AuthContext); // lấy cả user và token
    const baseUrl = "http://localhost:5000/"; // ✅ Base URL cho file/audio

    useEffect(() => {
        const loadSongs = async () => {
            const data = await fetchSongs();
            setSongs(data);
        };
        loadSongs();
    }, []);

    // ✅ Gọi API lưu lịch sử nghe
    const handlePlay = async (songId) => {
        if (!token) {
            console.warn("Người dùng chưa đăng nhập, không thể lưu lịch sử nghe.");
            return;
        }
        if (!user || !user.id) {
            console.warn("user hoặc user.id chưa có, không thể lưu lịch sử nghe.");
            return;
        }

        try {
            await saveListeningHistory(user.id, songId, token);
        } catch (error) {
            console.error("Lỗi lưu lịch sử nghe:", error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="mt-10 w-full px-4">
                <h2 className="text-2xl font-semibold mb-4">🎵 Danh sách bài hát</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {songs.map((song) => (
                        <div key={song.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
                            {song.poster && (
                                <img
                                    src={baseUrl + song.poster.replace(/\\/g, "/")}
                                    alt={song.song_name}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                            )}
                            <h3 className="text-lg font-bold">{song.song_name}</h3>
                            <p className="text-sm text-gray-600">Ca sĩ: {song.singer_name}</p>
                            <audio
                                controls
                                src={baseUrl + song.filepath.replace(/\\/g, "/")}
                                className="w-full mt-2"
                                onPlay={() => handlePlay(song.id)} // ✅ Gọi lưu lịch sử
                            >
                                Trình duyệt không hỗ trợ audio.
                            </audio>
                            <p className="text-sm text-gray-500 mt-2">
                                Ngày tải lên: {new Date(song.uploaded_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
