// src/components/Home.jsx
import React, { useState } from 'react';
import { uploadAudioFile } from '../api/uploadApi';

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
        setError('Vui lòng chọn một file âm thanh.');
        return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    try {
        const data = await uploadAudioFile(file);
        console.log('Upload result:', data);
        setResult(data.data); // 👈 kiểm tra data có đúng cấu trúc không
    } catch (err) {
        console.error('Upload failed:', err); // 👈 log lỗi chi tiết
        setError(err.message || 'Lỗi khi upload');
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
        onChange={handleFileChange}
        className="mb-4"
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
          <p>
            Phát thử: <audio controls src={`http://localhost:3000/${result.path}`} className="mt-2" />
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
