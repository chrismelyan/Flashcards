import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectLoginIsAuth} from "../../../f3-bll";
import {PATH} from "../../app-router/AppRouter";

export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const isLoggedIn = useSelector(selectLoginIsAuth)
    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to={PATH.login} state={{from: location}}/>
    }

    return children
};
