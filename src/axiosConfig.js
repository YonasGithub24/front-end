import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://back-end-9au5.onrender.com/api",
});

export default axiosBase;
