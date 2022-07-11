import React, {FC} from 'react';
import classes from "./DeleteModal.module.css";
import {ButtonCP} from "../../pages/p9-packTable/TablePack/TablePackMUI";
import {Button} from "@mui/material";

type PropsType = {
    currentName?: string | null
    closeModalClick: () => void
    removeClick: () => void
    title: string
}

export const DeleteModal: FC<PropsType> =
    ({
         closeModalClick,
         removeClick,
         currentName,
         title
     }) => {

        return (
            <div className={classes.wrapper}>
                <h3>{title}</h3>

                <p className={classes.text}>
                    Do you really want to remove
                    <span className={classes.packName}>{" " + currentName + " "}</span>?
                </p>

                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <Button
                        variant="contained"
                        style={{width: "130px"}}
                        color={'error'}
                        sx={{textTransform: 'none'}}
                        onClick={removeClick}
                    >
                        Delete
                    </Button>

                </div>
            </div>
        );
    };
