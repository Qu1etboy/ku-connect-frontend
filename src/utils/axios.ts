import { config } from "@/config";
import axios from "axios";

export const instance = axios.create({
  baseURL: config.BACKEND_URL,
  timeout: 5000,
});
