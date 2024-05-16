"use client";
import { axiosInstance } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("users/showMe");
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push(`/`);
    }
    if (token) {
      fetchUser();
      setToken(token);
      router.push(`/home`);
    }
  }, []);

  //   const logout = () => {
  //     LocalStorageService.clear();
  //     router.push("/auth/creator/login");
  //   };

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {user && token ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
