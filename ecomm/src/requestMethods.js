import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const user = (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser);
const TOKEN =  user?user.accessToken:"" ;
 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTZiMTBiMzczOGUzMzZjZWI0MDNhOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTk0NTY3NDQsImV4cCI6MTY1OTcxNTk0NH0.my2XFEc8aV16ZSNraAJmINc3RD1b2CdAyMEIJ7HMo3c"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
