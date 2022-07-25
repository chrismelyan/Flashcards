import React, {FC} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {TableSortLabel} from "@mui/material";
import TableHead from "@mui/material/TableHead";

type PropsType = {
    sortBy: string
    order: 'desc' | 'asc'
    onClickSortByHandler: (sortBy: string) => () => void
}

export const PackTableHeader: FC<PropsType> =
    ({
        sortBy,
        order,
        onClickSortByHandler
     }) => {
    return (
        <TableHead sx={styleTHead}>
            <TableRow sx={styleAlignCell}>
                <TableCell >
                    <TableSortLabel
                        sx={styleActiveLabel}
                        active={sortBy === 'name'}
                        direction={sortBy === 'name' ? order : 'asc'}
                        onClick={onClickSortByHandler('name')}
                    >Pack name</TableSortLabel>
                </TableCell>
                <TableCell >
                    <TableSortLabel
                        sx={styleActiveLabel}
                        active={sortBy === 'cardsCount'}
                        direction={sortBy === 'cardsCount' ? order : 'asc'}
                        onClick={onClickSortByHandler('cardsCount')}
                    >Count</TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        sx={styleActiveLabel}
                        active={sortBy === 'created'}
                        direction={sortBy === 'created' ? order : 'asc'}
                        onClick={onClickSortByHandler('created')}
                    >Created at</TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        sx={styleActiveLabel}
                        active={sortBy === 'user_name'}
                        direction={sortBy === 'user_name' ? order : 'asc'}
                        onClick={onClickSortByHandler('user_name')}
                    >Created by</TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        sx={styleActiveLabel}
                        active={sortBy === 'updated'}
                        direction={sortBy === 'updated' ? order : 'asc'}
                        onClick={onClickSortByHandler('updated')}
                    >Updated</TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

const styleTHead = {
    background: '#2c2b3f',
    'th': {color: '#fff', fontWeight: 'bold'},
    'th: nth-of-type(6)': {width: '268px'}
}

const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}
