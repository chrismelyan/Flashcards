import styles from './Profile.module.css'
import React from 'react';
import {Navigate} from 'react-router-dom';
import stylesPL from "../p9-packTable/TablePack/PacksList.module.css";
import {controlModalWindowAC, selectPack} from "../../../f3-bll";
import {useAppDispatch, useAppSelector} from "../../../f3-bll/store";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import SearchField from "../../common/searchField/SearchField";
import {TablePack} from "../p9-packTable/TablePack/TablePack";
import {EditProfile} from "./EditProfile/EditProfile";
import {Pagination} from "../../common/pagination/Pagination";
import {logOut} from "../../../f3-bll/reducers/app-reducer";
import {
    fetchCardsPack,
    setPackOwner,
    setPage,
    setPageCount,
    setSearchPackName
} from "../../../f3-bll/reducers/pack-reducer";
import {PackCard} from "../../../f4-api/pack-api";
import {styleBtn} from "../styles/commonMui";
import AppButton from "../../common/appButton/AppButton";
import {Button} from "@mui/material";

const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)
    const packName = useAppSelector(selectPack).packName
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const [editMode, setEditMode] = React.useState(false)

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }

    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }
    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }

    const openAddModalWindowHandle = () => {
        dispatch(controlModalWindowAC(true, "ADD"))
    }

    React.useEffect(() => {
        isAuth && dispatch(setPackOwner('my'))
    }, [dispatch, isAuth])

    React.useEffect(() => {
        isAuth && dispatch(fetchCardsPack());
    }, [sortBy, order, minSort, maxSort, packName, pageCount, page])

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <>
            {!editMode
                ? <div className={styles.profileContainer}>
                    <div className={styles.sidebar}>

                        <ProfileInfo avatar={avatar}
                                     name={name}
                                     editMode={editMode}
                                     onClickChangeEditModeHandler={onClickChangeEditModeHandler}/>

                        <div>
                            <AppButton callback={onClickLogOutHandler} title={'Log out'}/>
                        </div>
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

                : <EditProfile avatar={avatar}
                               name={name}
                               editMode={editMode}
                               onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                />}
        </>
    );
};

export default Profile;