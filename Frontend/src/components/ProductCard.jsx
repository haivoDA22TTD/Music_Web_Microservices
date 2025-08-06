import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition bg-white">
      <h2 className="font-bold text-lg text-blue-700">{product.name}</h2>

      {/* Hiển thị ảnh sản phẩm nếu có */}
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover my-2 rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-image.png"; // Ảnh mặc định nếu ảnh bị lỗi load
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center my-2 rounded">
          <span>Chưa có ảnh</span>
        </div>
      )}

      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold mt-2">{product.price} VND</p>
    </div>
  );
}
