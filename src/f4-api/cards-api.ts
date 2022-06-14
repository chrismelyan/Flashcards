import {instance} from "./auth-api";

export const CardsApi = {
    fetchCards({cardAnswer, cardQuestion, cardsPack_id, sortCards, min, max, page, pageCount}: CardsQueryParams) {
        return instance.get<CardsResponseType>('/cards/card',
            {params: {cardAnswer, cardQuestion, cardsPack_id, sortCards, min, max, page, pageCount}})
    },
    addNewCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post('/cards/card', {card: {cardsPack_id, question, answer}})
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card', {params: {id}})
    },
    updateCard(_id: string, question: string) {
        return instance.put('/cards/card', {card: {_id, question}})
    },
    updateGrade(card_id: string, grade: number) {
        return instance.put<GradeResponseType>('/cards/grade', {grade, card_id})
    }
}

// type
export type CardType = {
    question: string
    answer: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsQueryParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type GradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
    token: string
    tokenDeathTime: Date
}
