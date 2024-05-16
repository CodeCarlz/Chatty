"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./Usercontext";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hisTyping, setHisTyping] = useState(false);

  useEffect(() => {
    const socket = io("http://chatty-backend.evileyedev.in:5000", {
      withCredentials: true,
      auth: { user_id: user._id },
    });
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, setIsConnected, isConnected, setHisTyping, hisTyping }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const Socket = useContext(SocketContext);
  if (!Socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return Socket;
};
