import {setAppError, setLoadingStatus} from "./app-reducer";
import {AuthApi, RegistrationParamsType} from "../../f4-api/auth-api";
import {ThunkType} from "../store";

export const InitialRegistrationState = {
    isRegistered: false
}

//Types
export type InitialRegistrationStateType = typeof InitialRegistrationState;
export type RegistrationActionType = ReturnType<typeof setRegistrationAC>;

//Reducer
export const RegistrationReducer = (state: InitialRegistrationStateType = InitialRegistrationState, action: RegistrationActionType):InitialRegistrationStateType => {
    switch (action.type) {
        case "REGISTRATION":
            return {...state, isRegistered: action.isRegistered};
        default:
            return state;
    }
}

//ActionCreators
export const setRegistrationAC = (isRegistered: boolean) => ({type: "REGISTRATION", isRegistered} as const);

//ThunkCreator
export const setRegistrationTC = (data: RegistrationParamsType): ThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingStatus('loading'));
        const res = await AuthApi.registration(data);
        console.log(res.data);
        dispatch(setRegistrationAC(true));
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error));
    } finally {
        dispatch(setLoadingStatus('idle'));
    }
}
