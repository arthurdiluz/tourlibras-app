import axios from "axios";
import {
  contentType,
  applicationJson,
  accept,
  baseURL,
  timeout,
} from "../constants";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    [contentType]: applicationJson,
    [accept]: applicationJson,
  },
  timeout: timeout,
});

export default api;
