import axios from 'axios';

export const uploadAudioFile = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);

    try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('RESPONSE FROM SERVER:', response.data);
        return response.data;
    } catch (error) {
        console.error('UPLOAD ERROR:', error); // 👈 Quan trọng
        throw error.response?.data || { message: 'upload nhạc thành công' };
    }
};

