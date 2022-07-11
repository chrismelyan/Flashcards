import React, {ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useAppDispatch, useAppSelector} from "../../../f3-bll/store";
import {AddModal, DeleteModal, EditCardModal, EditModal} from "../modal-components";
import {
    addCardPack,
    cards,
    controlModalWindowAC,
    removePack,
    selectAppStatus,
    selectModal,
    selectPack,
    setCurrentPackPropsAC,
    updatePackName
} from "../../../f3-bll";
import classes from "./ModalWindow.module.css";
import {AddCardModal} from "../modal-components/AddCardModal";
import {Loader} from "../../common/loader/Loader";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "5px",
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const ModalWindow = () => {
    const dispatch = useAppDispatch()

    const isOpen = useAppSelector(selectModal).isOpen
    const component = useAppSelector(selectModal).component
    const currentPackID = useAppSelector(selectPack).currentPackID
    const currentPackName = useAppSelector(selectPack).currentPackName
    const status = useAppSelector(selectAppStatus)

    const closeModalClick = () => {
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())
    }

    const removePackClick = () => {
        dispatch(removePack(currentPackID as string))
    }

    const removeCardClick = () => {
        dispatch(cards.removeCard(currentPackID as string))
    }

    const updateCurrentPackName = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setCurrentPackPropsAC(e.currentTarget.value, currentPackID))
    }

    const addNewPack = () => {
        dispatch(addCardPack(currentPackName))
    }

    const editCardQuestion = () => {
        dispatch(cards.editCard(currentPackID as string, currentPackName))
    }

    const addNewCard = (question: string, answer: string) => {
        dispatch(cards.addNewCard(currentPackID as string, question, answer ))
    }

    const updatePackNameCallback = () => {
        dispatch(updatePackName(currentPackID as string, currentPackName))
    }

    if (status === 'loading') return <Loader/>
    return (
        <div>
            <Modal open={isOpen} onClose={closeModalClick}>
                <Fade in={isOpen}>
                    <Box className={classes.modalWrapper} sx={style}>
                        {component === "ADD" && <AddModal newPackNameValue={currentPackName}
                                                          addNewPack={addNewPack}
                                                          updateNewPackName={updateCurrentPackName}
                                                          closeModalClick={closeModalClick}/>
                        }
                        {component === "DELETE" && <DeleteModal title={"Delete Pack"}
                                                                 removeClick={removePackClick}
                                                                 currentName={currentPackName}
                                                                 closeModalClick={closeModalClick}/>
                        }
                        {component === "CARD-DELETE" && <DeleteModal title={"Delete Card"}
                                                                     removeClick={removeCardClick}
                                                                     currentName={currentPackName}
                                                                     closeModalClick={closeModalClick}/>
                        }
                        {component === "ADD-NEW-CARD" && <AddCardModal closeModalClick={closeModalClick}
                                                                       addNewCard={addNewCard}/>
                        }
                        {component === "EDIT" && <EditModal onChangeValue={updateCurrentPackName}
                                                            updatePackName={updatePackNameCallback}
                                                            value={currentPackName}
                                                            closeModalClick={closeModalClick}/>
                        }
                        {component === "CARD-EDIT" && <EditCardModal closeModalClick={closeModalClick}
                                                                     value={currentPackName}
                                                                     onChangeValue={updateCurrentPackName}
                                                                     editCardQuestion={editCardQuestion}/>
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
