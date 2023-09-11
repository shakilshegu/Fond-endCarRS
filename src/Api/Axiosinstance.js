import axios from "axios"

export const AxiosUser =axios.create({
    baseURL:"http://localhost:5000/"
})


export const AxiosAdmin =axios.create({
    baseURL:"http://localhost:5000/admin/"
})

export const AxiosPartner =axios.create({
    baseURL:"http://localhost:5000/partner/"
})