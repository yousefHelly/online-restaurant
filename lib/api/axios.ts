import axios from "axios";

const baseUrl = 'https://localhost:7166'

export default axios.create({
    baseURL:baseUrl,
    headers:{'Content-Type':'application/json'}
});

export const axiosAuth = axios.create({
    baseURL:baseUrl,
    headers:{'Content-Type':'application/json'}
});