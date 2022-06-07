import axios from "axios";
import {LoginResponseType} from "../f3-bll/reducers/login-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export type RegistrationParamsType = {
    email: string
    password: string
}

export const AuthApi = {
    getPing() {
        return instance.get("/ping?frontTime=1596635884283")
    },
    setNewPass() {
        return instance.post("/auth/set-new-password", {password: "new-password"})
    },
    registration(data: RegistrationParamsType) {
        return instance.post("/auth/register", data)
    },
    recoveryPassword(email: string) {
        return instance.post<{info: string}>(
            "/auth/forgot",
            {
                email, // кому восстанавливать пароль
                from: "test-front-admin <gipis67316@nifect.com>",
                // можно указать разработчика фронта)
                message: `<div style="background-color: #f7f7f7; padding: 15px">
                    Follow 
                    <a href='https://sergeyichnik.github.io/projectFriday/#/set-new-password/$token$'
                    style="font-weight: bold; color: #1a73e8;">
                    this link</a> to recover your password
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<{info: string}>('/auth/me', {})
    },
    authMe() {
        return instance.post<LoginResponseType>('/auth/me', {})
    }
}