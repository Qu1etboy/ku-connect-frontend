import { config } from "@/config";
import { createClient } from "@/lib/supabase/client";
import { io, Socket } from "socket.io-client";

const supabase = createClient();
const data = await supabase.auth.getSession();
const token = data.data?.session?.access_token;

const socket: Socket = io(config.BACKEND_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ["websocket"],
  autoConnect: false,
  auth: {
    token,
  },
});

export default socket;
