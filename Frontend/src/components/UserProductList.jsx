import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function UserProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách xe máy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Giỏ hàng ({cart.length})</h3>
        {cart.length === 0 && <p>Giỏ hàng trống</p>}
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
