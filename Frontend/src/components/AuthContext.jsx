import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({
          id: decoded.id, // ✅ Thêm id để dùng khi gọi API
          username: decoded.sub,
          roles: decoded.roles || decoded.role,
        });
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode(newToken);
    setUser({
      id: decoded.id, // ✅ id từ token
      username: decoded.sub,
      roles: decoded.roles || decoded.role,
    });
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
