// src/components/MusicList.jsx
import React, { useEffect, useState } from 'react';
import { fetchMusic, deleteMusic } from '../api/music';

function MusicList() {
    const [musicList, setMusicList] = useState([]);

    const getData = async () => {
        const data = await fetchMusic();
        setMusicList(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài hát này không?')) {
            try {
                await deleteMusic(id);
                // Cập nhật lại danh sách sau khi xóa
                setMusicList(musicList.filter((item) => item.id !== id));
            } catch (error) {
                alert('Có lỗi xảy ra khi xóa bài hát.');
                console.error(error);
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">🎵 Danh sách bài hát</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Poster</th>
                            <th className="px-4 py-2 text-left">Tên bài hát</th>
                            <th className="px-4 py-2 text-left">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musicList.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={`http://localhost:5000/${item.poster.replace(/\\/g, '/')}`}
                                        alt={item.song_name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">{item.song_name}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-center cursor-pointer text-red-500 hover:underline"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MusicList;
