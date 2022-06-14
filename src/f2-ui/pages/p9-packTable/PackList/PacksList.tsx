import React from 'react';
import {TablePack} from '../TablePack/TablePack';
import {useAppDispatch, useAppSelector} from '../../../../f3-bll/store';
import {
    addCardPack,
    fetchCardsPack,
    selectPack,
    setPage,
    setPageCount,
    setSearchPackName
} from '../../../../f3-bll/reducers/pack-reducer';
import {RangeCards} from '../RangeCards/RangeCards';
import {OwnerSwitcher} from '../OwnerSwitcher/OwnerSwitcher';
import {Pagination} from '../../../common/pagination/Pagination';
import {Button} from '@mui/material';
import styles from '../Profile/Profile.module.css';
import stylesPL from './PacksList.module.css';
import {PackCard} from "../../../../f4-api/pack-api";
import SearchField from "../../../common/searchField/SearchField";
import {styleBtn} from "../../styles/commonMui";


export const PacksList = () => {
    const dispatch = useAppDispatch()

    const packName = useAppSelector(selectPack).packName
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const maxCardsCount = useAppSelector<number>(state => state.pack.maxCardsCount)
    const minCardsCount = useAppSelector<number>(state => state.pack.minCardsCount)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)

    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }
    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }
    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }
    const addNewPack = () => {
        dispatch(addCardPack())
    }

    React.useEffect(() => {
        dispatch(fetchCardsPack())
    }, [sortBy, order, owner, minSort, maxSort, packName, pageCount, page, dispatch])

    return (
        <div style={{margin: '30px auto'}}>
            <div className={styles.profileContainer}>

                <div className={styles.sidebar}>
                    <OwnerSwitcher owner={owner}/>
                    <RangeCards
                        minSort={minSort}
                        maxSort={maxSort}
                        maxCardsCount={maxCardsCount}
                        minCardsCount={minCardsCount}
                    />
                </div>

                <div className={styles.content}>
                    <SearchField searchCallback={searchByPackName} placeholder={'Search'} initState={packName}/>

                    <div className={stylesPL.buttonPosition}>
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
                            onClick={addNewPack}
                        >
                            Add new Pack
                        </Button>
                    </div>

                    {pack.length === 0 && owner === 'my'
                        ? <div>You have no any Pack, do want to add?</div>
                        : <>
                            <TablePack pack={pack} sortBy={sortBy} order={order}/>

                            <Pagination page={page}
                                        pageCount={pageCount}
                                        cardsPacksTotalCount={cardsPacksTotalCount}
                                        setPageCallback={setPackPageCallback}
                                        setPageCountCallback={setPackPageCountCallback}
                            />
                        </>
                    }

                </div>
            </div>
        </div>
    );
};
