import axios from 'axios'; // Bạn nhớ import axios nhé

export const saveListeningHistory = async (userId, songId, token) => {
  try {
    if (!userId) {
      throw new Error("userId bị thiếu");
    }
    const response = await axios.post(
      'http://localhost:8082/api/history/add',
      { userId, songId }, // gửi data trong body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi chi tiết từ axios:", error);

    if (error.response) {
      throw new Error("Lưu lịch sử thất bại: " + JSON.stringify(error.response.data));
    } else if (error.request) {
      throw new Error("Không có phản hồi từ server.");
    } else {
      throw new Error("Lỗi khi tạo yêu cầu: " + error.message);
    }
  }
};
