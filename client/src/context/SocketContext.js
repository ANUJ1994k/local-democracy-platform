import { createContext } from "react";
import { io } from "socket.io-client";

// Connect to backend socket server
export const socket = io("http://localhost:5173"); 
export const SocketContext = createContext();
