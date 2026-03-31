import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials: true
})

export const registerUserAPI = async(email, username, password) => {
    const res = await api.post("/api/auth/register", {email,username,password})
    console.log(res.data)
    return res.data
}

export const loginUserAPI = async(email, username, password) => {
    const res = await api.post("/api/auth/login", {email,username,password})
    console.log(res.data)
    return res.data
}

export const getMeAPI = async() => {
    const res = await api.get("/api/auth/get-me")
    console.log(res.data)
    return res.data
}

export const logoutUserAPI = () => {
    const res = api.post("/api/auth/logout")
    console.log(res.data)
    return res.data
}