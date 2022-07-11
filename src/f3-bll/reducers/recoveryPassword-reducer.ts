import {AuthApi} from '../../f4-api/auth-api';
import {DispatchActionType, ThunkType} from '../store';
import {setAppError, setLoadingStatus} from './app-reducer';
import {EMPTY_STRING} from "../constants/constants";

const init: InitStateType = {
    info: EMPTY_STRING,
}

export const recoveryPasswordReducer = (state: InitStateType = init, action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
        case 'RP/SET_RESPONSE_INFO':
            return {...state, info: action.info}
        default:
            return state
    }
}
// action
const setResponseInfoRecoveryPassword = (info: string) => ({type: 'RP/SET_RESPONSE_INFO', info} as const)

// thunk
export const sendPasswordRecovery = (email: string):ThunkType => async (dispatch: DispatchActionType) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.recoveryPassword(email)
        dispatch(setResponseInfoRecoveryPassword(res.data.info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}
export const setNewPasswordTC = (password: string, token: string) => async (dispatch: DispatchActionType) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await AuthApi.setNewPass(password, token)
        dispatch(setResponseInfoRecoveryPassword(res.data.info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// type
type InitStateType = {
    info: string
}
export type RecoveryPasswordActionsType = SetResponseInfoRecoveryPassword
type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>
