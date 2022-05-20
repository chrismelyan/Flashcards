import React from 'react';
import {Route, Routes} from "react-router-dom";
import Test from "./p7-test/Test";
import Profile from "./p3-profile/Profile";
import Login from "./p1-login/Login";
import Signup from "./p2-signup/Signup";
import NewPassword from "./p4-new-password/NewPassword";
import ResetPassword from "./p5-reset/ResetPassword";
import Error404 from "./p6-error/404";
import s from './Pages.module.css'

export const PATH = {
    login: 'login',
    signup: 'signup',
    profile: 'profile',
    newPassword: 'new-password',
    resetPassword: 'reset-password',
    error: '404',
    test: 'test'
}

const Pages = () => {
    return (
        <div className={s.pagesContainer}>
            <Routes>
                <Route path={'/'} element={<Test/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.signup} element={<Signup/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.newPassword} element={<NewPassword/>}/>
                <Route path={PATH.resetPassword} element={<ResetPassword/>}/>
                <Route path={PATH.error} element={<Error404/>}/>
                <Route path={PATH.test} element={<Test/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;