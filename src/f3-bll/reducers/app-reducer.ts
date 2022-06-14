import {getUserData} from './login-reducer';
import {ThunkType} from "../store";
import {AuthApi, LoginResponseType} from "../../f4-api/auth-api";

const initialState: InitialStateType = {
    error: null,
    loadingStatus: 'idle',
    isInitialized: false
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'app/SET-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'app/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state;
    }
}

// action
export const setAppError = (error: string | null) => ({type: 'app/SET-APP-ERROR', error} as const)
export const setLoadingStatus = (loadingStatus: LoadingStatusType) =>
    ({type: 'app/SET-LOADING-STATUS', loadingStatus} as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: 'app/SET-IS-INITIALIZED', isInitialized} as const)

// thunk
export const authMe = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.authMe()
        dispatch(getUserData(res.data, true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(setIsInitialized(true))
    }
}
export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        await AuthApi.logout()
        dispatch(getUserData({} as LoginResponseType, false))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// type
export type LoadingStatusType = 'idle' | 'loading'
type InitialStateType = {
    error: string | null
    loadingStatus: LoadingStatusType
    isInitialized: boolean
}
export type AppActionType = ReturnType<typeof setAppError>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setIsInitialized>
