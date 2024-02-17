import axios from "axios"

export const Api = axios.create ({
    baseURL: "http://localhost:3333/",
    timeout: 8000,
})