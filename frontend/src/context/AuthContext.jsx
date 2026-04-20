import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 LOAD USER FROM LOCALSTORAGE (VERY IMPORTANT)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 LOGIN FUNCTION
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ persist
  };

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ clear
    localStorage.removeItem("token"); // optional but good
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);