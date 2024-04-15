import axios from "axios";

export default axios.create({
  // baseURL: "https://chatapp-backend-alpha.vercel.app",
  baseURL: "http://chatty.evileyedev.in:5000/",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
});
