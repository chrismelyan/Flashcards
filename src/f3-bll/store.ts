import {applyMiddleware, combineReducers, compose} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionType, appReducer} from "./reducers/app-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {RecoveryPasswordActionsType, recoveryPasswordReducer} from "./reducers/recoveryPassword-reducer";
import {LoginActionType, loginReducer} from "./reducers/login-reducer";
import {RegistrationActionType, RegistrationReducer} from "./reducers/registration-reducer";
import {packReducer, PackReducerActionsType} from "./reducers/pack-reducer";
import {cardsReducer, CardsReducerActionType} from "./reducers/cards-reducer";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    app: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: RegistrationReducer,
    pack: packReducer,
    cards: cardsReducer
})

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof reducer>
export type AppRootActionsType =
    | RegistrationActionType
    | LoginActionType
    | RecoveryPasswordActionsType
    | AppActionType
    | PackReducerActionsType
    | CardsReducerActionType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export default store

//@ts-ignore
window.store = store