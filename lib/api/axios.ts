import axios from "axios";


export default axios.create({
    baseURL:process.env.BACK_END_URL || "https://localhost:7166",
    headers:{'Content-Type':'application/json'}
});

export const axiosAuth = axios.create({
    baseURL:process.env.BACK_END_URL || "https://localhost:7166",
    headers:{'Content-Type':'application/json'}
});