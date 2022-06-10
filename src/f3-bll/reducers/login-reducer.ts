import {setAppError, setLoadingStatus} from "./app-reducer";
import {ThunkType} from "../store";
import {AuthApi} from "../../f4-api/auth-api";

type LoginStateType = {
    data: LoginResponseType
    isAuth: boolean
}
export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

const initState: LoginStateType = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,  // количество колод
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: ''
    },
    isAuth: false
}
export type LoginActionType = ReturnType<typeof getUserData> | ReturnType<typeof updateUserDataInfo>

export const loginReducer = (state: LoginStateType = initState, action: LoginActionType): LoginStateType => {
    switch (action.type) {
        case 'login/GET-USER-DATA':
            return {...state, data: action.data, isAuth: action.isAuth}
        case 'UPDATE-USER-DATA-INFO':
            return {...state, data: action.data}
        default:
            return state
    }
}
export const getUserData = (data: LoginResponseType, isAuth: boolean) =>
    ({type: 'login/GET-USER-DATA', data, isAuth} as const)
export const updateUserDataInfo = (data: LoginResponseType) =>
    ({type: 'UPDATE-USER-DATA-INFO', data} as const)

export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.login(email, password, rememberMe)
        dispatch(getUserData(res.data, true));
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'));
    }
}
export const updateUserInfo = (name: string, avatar: string): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        let temp: string = avatar
        temp = ' '
        const data = {name, avatar: temp}
        const res = await AuthApi.updateUserInfo(data)
        dispatch(updateUserDataInfo(res.data.updatedUser))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}
