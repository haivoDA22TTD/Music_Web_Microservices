import axios from "axios";

// Lấy token từ localStorage để dùng chung
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// API gọi lấy danh sách sản phẩm
export const fetchProducts = () =>
  axios.get("http://localhost:8083/api/products").then(r => r.data);

// Tạo sản phẩm mới
export const createProduct = (prod) =>
  axios.post("http://localhost:8083/api/products", prod, {
    headers: getAuthHeader(),
  }).then(r => r.data);

// Cập nhật sản phẩm
export const updateProduct = (id, prod) =>
  axios.put(`http://localhost:8083/api/products/${id}`, prod, {
    headers: getAuthHeader(),
  }).then(r => r.data);

// Xóa sản phẩm
export const deleteProduct = (id) =>
  axios.delete(`http://localhost:8083/api/products/${id}`, {
    headers: getAuthHeader(),
  }).then(r => r.data);

// Upload ảnh chung (cũ)
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post("http://localhost:8083/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeader(),
    },
  }).then(r => r.data);
};

// Upload avatar riêng cho backend NestJS port 3000
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file); // field name trùng backend

  return axios.post("http://localhost:3000/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeader(),
    },
  }).then(r => r.data);
};
