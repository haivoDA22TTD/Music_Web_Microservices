// src/api/songs.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/songs/";

export const fetchSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API bài hát:", error);
    return [];
  }
};
