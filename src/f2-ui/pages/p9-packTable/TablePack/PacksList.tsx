import React, {useState} from 'react';
import {TablePack} from './TablePack';
import {useAppDispatch, useAppSelector} from '../../../../f3-bll/store';
import {Button} from '@mui/material';
import {styleBtn} from '../../styles/commonMui';
import styles from '../../p3-profile/Profile.module.css';
import stylesPL from './PacksList.module.css';
import {controlModalWindowAC, selectPack} from "../../../../f3-bll";
import {PackCard} from "../../../../f4-api/pack-api";
import {
    fetchCardsPack,
    setPackOwner,
    setPage,
    setPageCount,
    setSearchPackName
} from "../../../../f3-bll/reducers/pack-reducer";
import {OwnerSwitcher} from "../OwnerSwitcher/OwnerSwitcher";
import {RangeCards} from "../RangeCards/RangeCards";
import SearchField from "../../../common/searchField/SearchField";
import {Pagination} from "../../../common/pagination/Pagination";

export const PacksList = () => {
    const dispatch = useAppDispatch()

    const [first, setFirst] = useState<boolean>(true)

    const packName: string = useAppSelector(selectPack).packName
    const pack: PackCard[] = useAppSelector(selectPack).cardPacks
    const sortBy: string = useAppSelector(selectPack).sortBy
    const order: 'desc' | 'asc' = useAppSelector(selectPack).order
    const owner: 'all' | 'my' = useAppSelector(selectPack).packOwner
    const maxCardsCount: number = useAppSelector(selectPack).maxCardsCount
    const minCardsCount: number = useAppSelector(selectPack).minCardsCount
    const maxSort: number = useAppSelector(selectPack).maxSort
    const minSort: number = useAppSelector(selectPack).minSort
    const page: number = useAppSelector(selectPack).page
    const pageCount: number = useAppSelector(selectPack).pageCount
    const cardsPacksTotalCount: number = useAppSelector(selectPack).cardPacksTotalCount

    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }
    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }
    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }
    const openAddModalWindowHandle = () => {
        dispatch(controlModalWindowAC(true, 'ADD'))
    }

    React.useEffect(() => {
        debugger
        if (first) {
            dispatch(setPackOwner('all'))
            setFirst(false)
            return
        }
        debugger
        dispatch(fetchCardsPack())
        debugger

    }, [dispatch, sortBy, order, owner, minSort, maxSort, packName, pageCount, page, first])

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
                    <SearchField searchCallback={searchByPackName} placeholder={'Search'}
                                 initState={packName}/>

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
                            onClick={openAddModalWindowHandle}
                        >
                            Add new Pack
                        </Button>
                    </div>

                    {pack.length === 0 && owner === 'my'
                        ? <div>You have no packs. Do you want to add?</div>
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
