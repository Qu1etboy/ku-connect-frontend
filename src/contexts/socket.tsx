"use client"; // Ensures it only runs on the client side

import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeSocket } from "@/utils/socket";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      const newSocket = await initializeSocket();
      if (newSocket) {
        newSocket.connect();
        setSocket(newSocket);
      }
    };

    setupSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
