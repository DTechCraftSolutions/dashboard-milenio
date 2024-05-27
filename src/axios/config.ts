import axios from "axios";

const env = process.env.NEXT_PUBLIC_API_URL;
if (!env) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const api = axios.create({
  baseURL: env,
});
