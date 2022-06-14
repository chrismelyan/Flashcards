import React from 'react';
import s from './CardsList.module.css';
import SearchField from '../../common/searchField/SearchField';
import {Pagination} from '../../common/pagination/Pagination';
import {useAppDispatch, useAppSelector} from '../../../f3-bll/store';
import {
    fetchCards,
    OrderType,
    searchByAnswer,
    searchByQuestion, setCards,
    setCardPage,
    setCardPageCount,
    addNewCard, setPackId
} from '../../../f3-bll/reducers/cards-reducer';
import {TableCards} from './TableCards';
import {CardType} from '../../../f4-api/cards-api';
import {Link, useParams} from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import styles from '../Profile/Profile.module.css';
import {styleBtn} from '../styles/commonMui';
import {Button} from '@mui/material';


const CardsList = () => {
    const dispatch = useAppDispatch()
    const {id: packUrlId} = useParams()

    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsCurrentPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)
    const cardsPackId = useAppSelector(state => state.cards.cardsPack_id)
    const cardsPackUserID = useAppSelector(state => state.cards.packUserId)

    //todo может потом перенести
    const authorizedUserId = useAppSelector(state => state.login.data._id)

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }

    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }

    const backToPacksHandler = () => {
        dispatch(setCards([]))
        dispatch(searchByQuestion(''))
        dispatch(searchByAnswer(''))
    }

    const setCardsPageCallback = (page: number) => {
        dispatch(setCardPage(page + 1))
    }

    const setCardsPageCountCallback = (page: number) => {
        dispatch(setCardPageCount(page))
    }

    const addNewCardHandler = () => {
        dispatch(addNewCard(cardsPackId))
    }

    React.useEffect(() => {
        packUrlId && dispatch(setPackId(packUrlId))
    }, [])

    React.useEffect(() => {
        cardsPackId && dispatch(fetchCards())
    }, [cardsAnswer, cardsQuestion, cardsCurrentPage, cardsPageCount, cardsPackId, sortCards, order])

    return (
        <div style={{margin: '30px auto'}}>
            <div className={styles.profileContainer}>

                <div className={s.contentBlock}>
                    <div className={s.backLinkWrapper}>
                        <Link className={s.backLink} to={'../pack-table'} onClick={backToPacksHandler}>
                            <ArrowRightAltIcon sx={arrow}/>
                            Back</Link>
                    </div>
                    <div className={s.cardsSearchBar}>
                        <SearchField
                            searchCallback={searchByQuestionCallback}
                            placeholder={'Question'}
                            initState={cardsQuestion}
                        />
                        <SearchField
                            searchCallback={searchByAnswerCallback}
                            placeholder={'Answer'}
                            initState={cardsAnswer}
                        />
                    </div>

                    {cardsPackUserID === authorizedUserId &&
                        <div>
                            <Button
                                sx={[styleBtn, {
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    margin: '0 0 14px 0',
                                    padding: '8px 16px 4px',
                                    color: '#2c2b3f',
                                    height: 'auto'
                                }]}
                                variant={'contained'}
                                onClick={addNewCardHandler}
                            >
                                Add new Card
                            </Button>
                        </div>
                    }

                    <TableCards cards={cards} order={order} sortCards={sortCards} authorizedUserId={authorizedUserId}/>
                    <Pagination page={cardsCurrentPage}
                                pageCount={cardsPageCount}
                                cardsPacksTotalCount={cardsTotalCount}
                                setPageCallback={setCardsPageCallback}
                                setPageCountCallback={setCardsPageCountCallback}
                    />
                </div>
            </div>
        </div>
    );
};


export default CardsList;

const arrow = {
    height: '1.4em',
    width: '1.4em',
    transform: 'scale(-1)',
    marginRight: '6px'
}