import React from "react"

export const host = "http://localhost:8081"

export const approveApplication = (host: string, applicationId: string) => {
    return `${host}/api/application/${applicationId}/approve`
}

export const getApplications = (host: string, page: number, size: number) => {
    return `${host}/api/application?page=${page}&size=${size}`
}

export const authenticate = (host: string) => {
    return `${host}/api/auth`
}

export const refreshToken = (host: string) => {
    return `${host}/api/auth/refresh`
}

export const createConstruction = (host: string) => {
    return `${host}/api/construction`
}

export const getConstructions = (host: string, page: number, size: number) => {
    return `${host}/api/construction?page=${page}&size=${size}`
}

export const updateConstruction = (host: string, constructionId: string) => {
    return `${host}/api/construction/${constructionId}`
}

export const deleteConstruction = (host: string, constructionId: string) => {
    return `${host}/api/construction/${constructionId}`
}

export const getConstruction = (host: string, constructionId: string) => {
    return `${host}/api/construction/${constructionId}`
}

export const getFilterConstructions = (host: string, page: number, size: number) => {
    return `${host}/api/construction/filter?page=${page}&size=${size}`
}

export const getEndDate = (host: string, constructionId: string) => {
    return `${host}/api/construction/${constructionId}/order`
}

export const createOrder = (host: string) => {
    return `${host}/api/order`
}

export const registration = (host: string) => {
    return `${host}/api/user`
}

export const getUser = (host: string, userId: string) => {
    return `${host}/api/user/${userId}`
}

export const getCurrentUser = (host: string) => {
    return `${host}/api/user`
}

export const updateUser = (host: string, userId: string) => {
    return `${host}/api/user/${userId}`
}

export const createApplication = (host: string, userId: string) => {
    return `${host}/api/user/${userId}/application`
}

export const getUserOrders = (host: string, userId: string) => {
    return `${host}/api/user/${userId}/order`
}

export const getUserConstructions = (host: string, userId: string) => {
    return `${host}/api/user/${userId}/construction`
}