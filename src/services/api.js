import axios from "axios"

export const Api = axios.create ({
    baseURL: "https://crm-connectfy.onrender.com",
    timeout: 8000,
})