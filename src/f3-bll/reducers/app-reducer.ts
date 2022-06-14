import {ThunkType} from '../store';
import {AuthApi, LoginResponseType} from '../../f4-api/auth-api';
import {getUserData} from './login-reducer';

const initialState: InitialStateType = {
    error: null,
    loadingStatus: 'idle',
    isInitialized: false,
    trash: null
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-TRASH':
            return {...state, trash: action.value}
        default:
            return state;
    }
}

// action
export const setAppError = (error: string | null) => ({type: 'APP/SET-APP-ERROR', error} as const)
export const setLoadingStatus = (loadingStatus: LoadingStatusType) =>
    ({type: 'APP/SET-LOADING-STATUS', loadingStatus} as const)
export const setIsInitialized = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
export const setTrash = (value?: any) => ({type: 'APP/SET-TRASH', value} as const)

// thunk
export const authMe = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.authMe()
        dispatch(getUserData(res.data, true))
    } catch (e: any) {
        // const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(setIsInitialized(true))
    }
}
export const logOut = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.logout()
        dispatch(setTrash(res.data.info))
        dispatch(getUserData({} as LoginResponseType, false))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// type
export type AppActionType = ReturnType<typeof setAppError>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setTrash>

export type LoadingStatusType = 'idle' | 'loading'
type InitialStateType = {
    error: string | null
    loadingStatus: LoadingStatusType
    isInitialized: boolean
    trash: any
}