import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} from "../services/api";

const emptyProduct = {
  name: "",
  brand: "",
  price: 0,
  imageUrl: "",
  description: "",
  stockQuantity: 0,
};

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const startEdit = (product) => {
    setIsAdding(false);
    setEditingProduct(product);
    setFormData(product);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: name === "price" || name === "stockQuantity" ? +value : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: result.imageUrl }));
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Lỗi upload ảnh: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      const updated = await fetchProducts();
      setProducts(updated);
      cancelEdit();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      alert("Lỗi khi lưu sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        alert("Lỗi khi xóa sản phẩm");
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm (Admin)</h2>

      <button
        onClick={() => {
          setIsAdding(true);
          setEditingProduct(null);
          setFormData(emptyProduct);
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Thêm sản phẩm mới
      </button>

      {(isAdding || editingProduct !== null) && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <input
            name="name"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            name="brand"
            placeholder="Thương hiệu"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            name="price"
            type="number"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />

          {/* Upload ảnh */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full mb-2 rounded"
            disabled={uploading}
          />
          {uploading && <p>Đang tải ảnh lên...</p>}
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Ảnh sản phẩm"
              className="w-32 h-20 object-cover mb-2 rounded"
            />
          )}

          <textarea
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            name="stockQuantity"
            type="number"
            placeholder="Số lượng tồn"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />

          <div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
            >
              Lưu
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Tên</th>
            <th className="border border-gray-300 p-2">Thương hiệu</th>
            <th className="border border-gray-300 p-2">Giá</th>
            <th className="border border-gray-300 p-2">Số lượng</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border border-gray-300 p-2">{p.name}</td>
              <td className="border border-gray-300 p-2">{p.brand}</td>
              <td className="border border-gray-300 p-2">${p.price}</td>
              <td className="border border-gray-300 p-2">{p.stockQuantity}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => startEdit(p)}
                  className="mr-2 px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
