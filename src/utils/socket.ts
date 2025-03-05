import { config } from "@/config";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(config.BACKEND_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export default socket;
