import axios from "axios";
import { baseURL, timeout } from "../constants";

const api = axios.create({
  baseURL,
  timeout,
});

export default api;

export function createAxiosAuthInterceptor(token: string) {
  api.interceptors.request.clear();
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
}
