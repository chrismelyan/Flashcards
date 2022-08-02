import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../../../f3-bll/store';
import {PackCard} from '../../../../f4-api/pack-api';
import {setCurrentPackPropsAC, setSearchPackName, setSortBy} from '../../../../f3-bll/reducers/pack-reducer';
import {useNavigate} from 'react-router-dom';
import {controlModalWindowAC, ModalComponentType} from "../../../../f3-bll";
import {PackTableHeader} from "../pack-table-header/PackTableHeader";
import {PackItemSkeleton} from "../pack-item-skeleton/PackItemSkeleton";
import {PackItem} from "../pack-item/PackItem";

type TablePackPropsType = {
    pack: PackCard[]
    sortBy: string
    order: 'desc' | 'asc'
}

export const TablePack: React.FC<TablePackPropsType> = ({pack, sortBy, order}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const authorizedUserId = useAppSelector(state => state.login.data._id)
    const status = useAppSelector(state => state.app.loadingStatus)

    const rows = pack.map(el => createData(
        el.name,
        el.cardsCount,
        new Date(el.created).toLocaleDateString(),
        el.user_name,
        new Date(el.updated).toLocaleString(),
        el._id,
        el.user_id))

    const onClickSortByHandler = (sortBy: string) => () => {
        dispatch(setSortBy(sortBy))
    }
    const handlerGetCards = (e: React.MouseEvent<HTMLAnchorElement>, length: number, isOwner: boolean) => {
        if (length === 0 && !isOwner) {
            e.preventDefault()
        }
    }
    const handlerLearnCards = (id: string, name: string) => {
        navigate(`../learn-pack/${id}`)
        // dispatch(setPackId(id))
        dispatch(setSearchPackName(name))
    }
    const openModalWindowHandle = (isOpen: boolean, component: ModalComponentType, packID: string, packName: string) => {
        dispatch(controlModalWindowAC(isOpen, component))
        dispatch(setCurrentPackPropsAC(packName, packID))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <PackTableHeader sortBy={sortBy} order={order} onClickSortByHandler={onClickSortByHandler}/>
                    <TableBody>
                        {rows.map((row) => {
                                if (status === "loading") {
                                    return <PackItemSkeleton key={row.packID}
                                                             isOwner={authorizedUserId === row.packUserID}/>
                                }
                                return <PackItem authorizedUserId={authorizedUserId}

                                                 key={row.packID}
                                                 handlerLearnCards={handlerLearnCards}
                                                 openModalWindow={openModalWindowHandle}
                                                 handlerGetCards={handlerGetCards} {...row}/>
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

// type
interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    packID: string;
    packUserID: string;
    actions?: null;
}
function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string,
    packID: string,
    packUserID: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate, packID, packUserID};
}