import {setAppError, setLoadingStatus} from './app-reducer';
import {CardsPackAPI, Pack, PackCard} from "../../f4-api/pack-api";
import {DispatchActionType, ThunkType} from "../store";

const initialState: Pack = {
    cardPacks: [],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0
}

export const packReducer = (state: Pack = initialState, action: PackReducerActionsType): Pack => {
    switch (action.type) {
        case 'PACK/SET_CARD_PACKS':
            return {...state, cardPacks: action.cardPacks}
        case 'PACK/SET_CARD_PACKS_INFO':
            return {...state, ...action.cardPacksInfo}
        default:
            return state
    }
}
// action
const setCardPacks = (cardPacks: PackCard[]) => ({type: 'PACK/SET_CARD_PACKS', cardPacks} as const)
const setCardPacksInfo = (cardPacksInfo: PackCardsInfo) => ({type: 'PACK/SET_CARD_PACKS_INFO', cardPacksInfo} as const)

// thunk
export const fetchCardsPack = (): ThunkType => async (dispatch: DispatchActionType) => {
    const pageCount = '10'
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsPackAPI.getPack({pageCount})
        dispatch(setCardPacks(res.data.cardPacks))
        const info: PackCardsInfo = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardPacksTotalCount: res.data.cardPacksTotalCount,
            minCardsCount: res.data.minCardsCount,
            maxCardsCount: res.data.minCardsCount,
            token: res.data.token,
            tokenDeathTime: res.data.tokenDeathTime
        }
        dispatch(setCardPacksInfo(info))

    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}
export const searchPacksByName = (packName: string): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'));
        const res = await CardsPackAPI.getPack({packName});
        dispatch(setCardPacks(res.data.cardPacks));
        dispatch(setCardPacks(res.data.cardPacks))
        const info: PackCardsInfo = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardPacksTotalCount: res.data.cardPacksTotalCount,
            minCardsCount: res.data.minCardsCount,
            maxCardsCount: res.data.minCardsCount,
            token: res.data.token,
            tokenDeathTime: res.data.tokenDeathTime
        }
        dispatch(setCardPacksInfo(info))

    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// types
export type PackReducerActionsType =
    | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setCardPacksInfo>

type PackCardsInfo = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number // 103
    token: string
    tokenDeathTime: number
}