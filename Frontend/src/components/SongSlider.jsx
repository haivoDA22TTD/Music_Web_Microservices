// src/components/SongSlider.jsx
import { useEffect, useState } from "react";
import { fetchSongs } from "../api/songs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SongSlider = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const loadSongs = async () => {
        const data = await fetchSongs();
        setSongs(data);
        };
        loadSongs();
    }, []);

    const baseUrl = "http://localhost:5000/";

    return (
        <div style={{ padding: "20px" }}>
        <h2>🎵 Danh sách bài hát</h2>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            {songs.map((song) => (
            <SwiperSlide key={song.id}>
                <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    maxWidth: "600px",
                    margin: "0 auto",
                    textAlign: "center",
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
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};

export default SongSlider;
