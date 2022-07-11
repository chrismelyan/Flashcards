import {AppRootStateType} from "../../f3-bll/store";

const initialState: ModalStateType = {
    isOpen: false,
    component: null,
}

export const modalReducer = (state: ModalStateType = initialState,
                             action: ModalReducerActionType): ModalStateType => {
    switch (action.type) {
        case "MODAL/SET_MODAL_WINDOW_PROP":
            return {...state, ...action.payload}
        default:
            return state
    }
}
// selector
export const selectModal = (state: AppRootStateType) => state.modal

// action
export const controlModalWindowAC =
    (isOpen: boolean = false, component: ModalComponentType = null) => {
    return {
        type: "MODAL/SET_MODAL_WINDOW_PROP",
        payload: {
            isOpen,
            component
        }
    } as const
}

// type
export type ModalComponentType =
    | "DELETE"
    | "ADD"
    | "EDIT"
    | "ADD-NEW-CARD"
    | "CARD-DELETE"
    | "CARD-EDIT"
    | null

export type ModalStateType = {
    isOpen: boolean
    component: ModalComponentType
}

export type ModalReducerActionType = ReturnType<typeof controlModalWindowAC>
