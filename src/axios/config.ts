import axios from "axios";

const envApi = process.env.NEXT_PUBLIC_API_URL;

if (!envApi) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const api = axios.create({
  baseURL: envApi,
});

const envApiNext = process.env.NEXT_PUBLIC_API_URL_NEXT;

if (!envApiNext) throw new Error("NEXT_PUBLIC_API_URL_NEXT is not defined");

export const apiNext = axios.create({
  baseURL: envApiNext,
});
