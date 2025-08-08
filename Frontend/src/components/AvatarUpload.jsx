import React, { useState } from "react";
import axios from "axios";

export default function AvatarUpload({ token, initialAvatar }) {
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar || null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.patch("http://localhost:3000/users/me/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // axios tự set content-type cho formData rồi
        },
      });

      setAvatarUrl(`http://localhost:3000${res.data.avatarUrl}`);
      alert("Upload avatar thành công!");
    } catch (error) {
      alert("Upload thất bại: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Upload Avatar</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang tải lên..." : "Upload"}
      </button>

      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="mt-4 w-32 h-32 rounded-full object-cover border"
        />
      )}
    </div>
  );
}
