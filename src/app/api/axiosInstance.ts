import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
});

export default axiosInstance;
