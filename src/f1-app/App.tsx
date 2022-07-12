import React, {useEffect} from 'react';
import s from './App.module.css';
import {useAppDispatch, useAppSelector} from "../f3-bll/store";
import {authMe} from "../f3-bll/reducers/app-reducer";
import {Loader} from "../f2-ui/common/loader/Loader";
import ErrorSnackbar from "../f2-ui/common/errorSnackbar/ErrorSnackbar";
import {ModalWindow} from "../f2-ui/modal/modal-window/ModalWindow";
import AppRouter from "../f2-ui/app-router/AppRouter";

function App() {
    const dispatch = useAppDispatch()

    const loadingStatus = useAppSelector<string>(state => state.app.loadingStatus)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    if(!isInitialized) return <Loader/>

    return (
        <div className={s.app}>
            {loadingStatus === 'loading' && <Loader/>}
            <ErrorSnackbar/>
            <ModalWindow/>
            <AppRouter/>
        </div>
    );
}

export default App;
