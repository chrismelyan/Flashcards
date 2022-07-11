import {setAppError, setLoadingStatus} from "./app-reducer";
import {AppRootStateType, ThunkType} from "../store";
import {AuthApi, LoginResponseType} from "../../f4-api/auth-api";
import {EMPTY_STRING} from "../constants/constants";

const initState: LoginStateType = {
    data: {
        _id: EMPTY_STRING,
        email: EMPTY_STRING,
        name: EMPTY_STRING,
        avatar: EMPTY_STRING,
        publicCardPacksCount: 0,  // количество колод
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: EMPTY_STRING
    },
    isAuth: false
}

export const loginReducer = (state: LoginStateType = initState, action: LoginActionType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/GET-USER-DATA':
            return {...state, data: action.data, isAuth: action.isAuth}
        case 'LOGIN/UPDATE-USER-DATA-INFO':
            return {...state, data: action.data}
        default:
            return state
    }
}
// selector
export const selectLoginIsAuth = (state: AppRootStateType) => state.login.isAuth

// action
export const getUserData = (data: LoginResponseType, isAuth: boolean) =>
    ({type: 'LOGIN/GET-USER-DATA', data, isAuth} as const)
export const updateUserDataInfo = (data: LoginResponseType) =>
    ({type: 'LOGIN/UPDATE-USER-DATA-INFO', data} as const)

// thunk
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

// type
export type LoginActionType = ReturnType<typeof getUserData> | ReturnType<typeof updateUserDataInfo>

type LoginStateType = {
    data: LoginResponseType
    isAuth: boolean
}
