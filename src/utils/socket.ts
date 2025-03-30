import { config } from "@/config";
import { createClient } from "@/lib/supabase/client";
import { io, Socket } from "socket.io-client";

const supabase = createClient();

let socket: Socket | null = null;

/**
 * Initializes the socket connection with an up-to-date auth token.
 */
const initializeSocket = async (): Promise<Socket | null> => {
  if (typeof window === "undefined") return null; // Prevent server-side execution

  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  console.log("[socket] has token =", token !== null || token !== "");

  if (!token) {
    console.warn("No access token found. Skipping socket connection.");
    return null;
  }

  if (!socket) {
    socket = io(config.BACKEND_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ["websocket"],
      autoConnect: false,
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("[socket] Socket connected");
    });

    socket.on("exception", (err) => {
      console.log("[socket] error =", err);
    });

    socket.on("disconnect", () => {
      console.log("[socket] Socket disconnected");
    });

    console.log("[socket] Socket initialized");
  }

  return socket;
};

/**
 * Handles authentication state changes to update the socket authentication.
 */
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    console.log("[socket.onAuthStateChange] user signed in or token refreshed");
    if (!socket) {
      console.log("[socket.onAuthStateChange] socket uninitialized");
      return;
    }

    console.log("[socket.onAuthStateChange] connect to socket");
    socket.auth = { token: session?.access_token };
    socket.connect();
  } else if (event === "SIGNED_OUT") {
    console.log(
      "[socket.onAuthStateChange] user signed out, disconnect socket",
    );
    socket?.disconnect();
  }
});

export { initializeSocket };
