// src/components/Home.jsx
import { useEffect, useState } from "react";
import { uploadAudioFile } from '../api/uploadApi';
import { fetchSongs } from "../api/songs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [audioFile, setAudioFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [songName, setSongName] = useState('');
    const [singerId, setSingerId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const loadSongs = async () => {
        const data = await fetchSongs();
        setSongs(data);
        };
        loadSongs();
    }, []);

    const baseUrl = "http://localhost:5000/"; 

    const handleAudioChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handlePosterChange = (e) => {
        setPosterFile(e.target.files[0]);
    };

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

            {error && <p className="text-blue-600 mt-4">{error}</p>}

            {result && (
                <div className="mt-6 text-center">
                    <p className="text-green-600 font-medium">Upload thành công!</p>
                    <p className="mt-2">Tên file: <strong>{result.filename}</strong></p>
                    <p className="mt-2">Tên bài hát: <strong>{result.song_name}</strong></p>
                    <p>Phát thử: <audio controls src={`http://localhost:5000/${result.filepath}`} className="mt-2" /></p>
                    {result.poster && (
                        <p className="mt-4">
                            Poster: <img src={`http://localhost:5000/${result.poster}`} alt="poster" className="w-40 mt-2" />
                        </p>
                    )}
                </div>
            )}
            <div style={{ padding: "20px" }}>
                <h2>🎵 Danh sách bài hát</h2>
                <div
                    style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    }}
                >
                    {songs.map((song) => (
                    <div
                        key={song.id}
                        style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "300px",
                        textAlign: "center",
                        boxSizing: "border-box",
                        }}
                    >
                        <img
                        src={baseUrl + song.poster.replace(/\\/g, "/")}
                        alt={song.song_name}
                        style={{ width: "100%", borderRadius: "10px" }}
                        />
                        <h3>{song.song_name}</h3>
                        <p><strong>Ca sĩ:</strong> {song.singer_name}</p>
                        <audio
                        controls
                        src={baseUrl + song.filepath.replace(/\\/g, "/")}
                        style={{ width: "100%", marginTop: "10px" }}
                        >
                        Trình duyệt không hỗ trợ audio.
                        </audio>
                        <p><strong>Ngày tải lên:</strong> {new Date(song.uploaded_at).toLocaleString()}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
