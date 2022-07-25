import React from 'react';
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";
import TableRow from "@mui/material/TableRow";

const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}
const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

export const PackItemSkeleton = ({isOwner}: { isOwner: boolean }) => {

    return (
        <TableRow sx={[styleTd, styleAlignCell]}>
            <TableCell>
                <Skeleton animation={'wave'} width={130} variant={"text"}/>
            </TableCell>
            <TableCell>
                <Skeleton animation={'wave'} width={20} variant={"text"}/>
            </TableCell>
            <TableCell>
                <Skeleton animation={'wave'} width={80} variant={"text"}/>
            </TableCell>
            <TableCell>
                <Skeleton animation={'wave'} width={180} variant={"text"}/>
            </TableCell>
            <TableCell>
                <Skeleton animation={'wave'} width={160} variant={"text"}/>
            </TableCell>
            <TableCell>
                <div style={{display: 'flex', gap: '14px', justifyContent: 'end'}}>
                    {
                        isOwner
                        &&
                        <>
                            <Skeleton animation={'wave'} sx={{borderRadius: '5px'}} width={75} height={36.5}
                                      variant={"rectangular"}/>
                            <Skeleton animation={'wave'} sx={{borderRadius: '5px'}} width={65} height={36.5}
                                      variant={"rectangular"}/>
                        </>
                    }
                    <Skeleton animation={'wave'} sx={{borderRadius: '5px'}} width={65} height={36.5}
                              variant={"rectangular"}/>
                </div>
            </TableCell>
        </TableRow>
    );
};
