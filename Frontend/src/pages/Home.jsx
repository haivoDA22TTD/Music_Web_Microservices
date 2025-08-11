// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import { uploadAudioFile } from "../api/uploadApi";
import { fetchSongs } from "../api/songs";
import { saveListeningHistory } from "../api/history"; // ✅ import API lưu lịch sử
import { AuthContext } from "../components/AuthContext"; // ✅ lấy token người dùng

const Home = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [songName, setSongName] = useState('');
    const [singerId, setSingerId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
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

    const handleAudioChange = (e) => setAudioFile(e.target.files[0]);
    const handlePosterChange = (e) => setPosterFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!audioFile || !songName || !singerId) {
            setError('Vui lòng điền đầy đủ thông tin và chọn file');
            return;
        }

        setUploading(true);
        setError('');
        setResult(null);

        try {
            const res = await uploadAudioFile({
                audioFile,
                posterFile,
                songName,
                singerId,
            });
            setResult(res.data);
        } catch (err) {
            setError(err.message || 'Upload thất bại');
        } finally {
            setUploading(false);
        }
    };

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
            <h1 className="text-3xl font-bold mb-6">Upload Nhạc</h1>

            <input
                type="file"
                accept=".mp3,.wav,.ogg,.m4a"
                onChange={handleAudioChange}
                className="mb-4"
            />
            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handlePosterChange}
                className="mb-4"
            />
            <input
                type="text"
                placeholder="Tên bài hát"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                className="mb-4 border border-gray-300 px-3 py-2 rounded w-64"
            />
            <input
                type="number"
                placeholder="ID ca sĩ (id_singer)"
                value={singerId}
                onChange={(e) => setSingerId(e.target.value)}
                className="mb-4 border border-gray-300 px-3 py-2 rounded w-64"
            />

            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {uploading ? 'Đang upload...' : 'Upload'}
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {result && (
                <div className="mt-6 text-center">
                    <p className="text-green-600 font-medium">Upload thành công!</p>
                    <p className="mt-2">Tên file: <strong>{result.filename}</strong></p>
                    <p className="mt-2">Tên bài hát: <strong>{result.song_name}</strong></p>
                    <p>Phát thử:
                        <audio controls src={`${baseUrl}${result.filepath}`} className="mt-2" />
                    </p>
                    {result.poster && (
                        <p className="mt-4">
                            Poster: <img src={`${baseUrl}${result.poster}`} alt="poster" className="w-40 mt-2" />
                        </p>
                    )}
                </div>
            )}

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
