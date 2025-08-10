import axios from 'axios';

export const uploadAudioFile = async ({ audioFile, posterFile, songName, singerId }) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    if (posterFile) {
        formData.append('poster', posterFile);
    }
    formData.append('song_name', songName);
    formData.append('id_singer', singerId);

    try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('RESPONSE FROM SERVER:', response.data);
        return response.data;
    } catch (error) {
        console.error('UPLOAD ERROR:', error);
        throw error.response?.data || { message: 'Đã upload thành công' };
    }
};
