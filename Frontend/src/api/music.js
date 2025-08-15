import axios from "axios";

const API_URL = "http://localhost:5001/api/music/";

// Lấy danh sách tất cả bài hát
export const fetchMusic = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài hát:", error);
        return [];
    }
};

export async function deleteMusic(id) {
    try {
        const response = await axios.delete(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa bài hát ID ${id}:`, error);
        return null;
    }
}