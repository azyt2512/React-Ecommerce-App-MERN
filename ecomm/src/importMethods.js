import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const user = (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser);
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTZiMTJiMzczOGUzMzZjZWI0MDNhYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjE0NDQ4NDIsImV4cCI6MTY2MTcwNDA0Mn0.MfTgW1XmCeNuyn2dfooO32dskPJPebHlB4da1fvchz0"
//user ? user.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});