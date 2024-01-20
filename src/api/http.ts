import axios from "axios";
import type { AxiosInstance } from "axios";
const http: AxiosInstance = axios.create({
    baseURL: '//localhost:3000'
});
export default http;