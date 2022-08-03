import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const user = (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser);
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTZiMTBiMzczOGUzMzZjZWI0MDNhOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTk1MDE5MDYsImV4cCI6MTY1OTc2MTEwNn0.Sm56TYA7hatrG3IeObOtzG-ie6mkhp0LtmO0Rh9zrpc"
//user ? user.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});