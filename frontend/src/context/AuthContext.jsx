import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/user.service";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        setUser({
          token,
          ...currentUser,
        });
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);

    const currentUser = await getCurrentUser();

    setUser({
      token,
      ...currentUser,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}