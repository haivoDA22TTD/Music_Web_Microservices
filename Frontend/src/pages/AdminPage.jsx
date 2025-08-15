import React, { useContext, useState } from "react";
import AdminProductList from "../components/AdminProductList";
import { AuthContext } from "../components/AuthContext"; // để lấy token nếu cần
import MusicList from "../components/MusicList"; // Import MusicList component
import { uploadAudioFile } from "../api/uploadApi";

export default function AdminPage() {
  const { token } = useContext(AuthContext); // lấy token từ context
  const [audioFile, setAudioFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [songName, setSongName] = useState('');
  const [singerId, setSingerId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const baseUrl = "http://localhost:5000/"; // ✅ Base URL cho file/audio

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

  return (
    <div className="p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Panel</h1>
        {/* <AdminProductList token={token} /> */}
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
      </div>
      <MusicList />
    </div>
  );
}
