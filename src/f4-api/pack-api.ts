import {instance} from './auth-api';

export const CardsPackAPI = {
    getPack({packName, min, max, sortPacks, page, pageCount, user_id}: PackQueryParams) {
        return instance.get<Pack>('/cards/pack', {params: {packName, min, max, sortPacks, page, pageCount, user_id}})
    },
    addNewPack(name: string) {
        return instance.post('/cards/pack', {cardsPack: {name}})
    },
    deletePack(id: string) {
        return instance.delete('/cards/pack', {params: {id}})
    },
    updatePack(_id: string, name: string) {
        return instance.put('/cards/pack', {cardsPack: {_id, name}})
    }
}

// type
export type PackCard = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type Pack = {
    cardPacks: PackCard[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number // 103
    token: string
    tokenDeathTime: number
}
export type PackQueryParams = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}