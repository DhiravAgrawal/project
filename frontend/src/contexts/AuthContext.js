import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
})


export const AuthProvider = ({ children }) => {



    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            const response = await axios.post(`${server}/api/v1/users`, { name, username, password });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }


        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })

            console.log(request);
            if (request.status === httpStatus.CREATED) {
                console.log("..");
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {

                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }



    const data = {
        handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
