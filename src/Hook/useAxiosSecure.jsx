import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://artify-server-site.vercel.app",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInstance = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInstance);
    };
  }, [user]);
  return axiosInstance;
};

export default useAxiosSecure;
