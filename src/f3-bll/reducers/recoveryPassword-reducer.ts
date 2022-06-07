import {setAppError, setLoadingStatus} from './app-reducer';
import {DispatchActionType, ThunkType} from "../store";
import {AuthApi} from "../../f4-api/auth-api";

export type Nullable<T> = T | null

type InitStateType = {
    info: string,
}
export type RecoveryPasswordActionsType = SetResponseInfoRecoveryPassword
type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>

const init: InitStateType = {
    info: '',
}

export const recoveryPasswordReducer = (state: InitStateType = init,
                                        action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
        case 'rp/SET_RESPONSE_INFO': {
            return {...state, info: action.info}
        }
        default:
            return state
    }
}
const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)

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


