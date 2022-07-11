import React, {ChangeEvent, FC} from 'react';
import classes from "./AddModal.module.css";
import {Button, TextField} from "@mui/material";
import {ButtonCP} from "../../pages/p9-packTable/TablePack/TablePackMUI";

type PropsType = {
    closeModalClick: () => void
    updateNewPackName: (e: ChangeEvent<HTMLTextAreaElement>) => void
    newPackNameValue: string
    addNewPack: () => void
}

export const AddModal: FC<PropsType> =
    ({
         closeModalClick,
         newPackNameValue,
         updateNewPackName,
         addNewPack
     }) => {

        return (
            <div className={classes.wrapper}>
                <h3>Add new pack</h3>
                <TextField id="standard-basic"
                           value={newPackNameValue}
                           onChange={updateNewPackName}
                           label="Name pack" variant="standard"/>
                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <Button
                        variant="contained"
                        style={{width: "130px", backgroundColor: '#33b198'}}
                        sx={{textTransform: 'none'}}
                        onClick={addNewPack}
                    >
                        Add
                    </Button>
                </div>
            </div>
        );
    };
