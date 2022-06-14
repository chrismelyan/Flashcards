import React from 'react';
import {Route, Routes} from "react-router-dom";
import Profile from "./p3-profile/Profile";
import Login from "./p1-login/Login";
import Signup from "./p2-signup/Signup";
import NewPassword from "./p4-new-password/NewPassword"
import s from './Pages.module.css'
import ForgotPassword from "./p5-reset/ForgotPassword";
import NotFound from "./p6-error/NotFound";
import {PacksList} from "./p9-packTable/PackList/PacksList";
import CardsList from "./p8-cardsTable/CardsList";
import LearnPack from "./p7-card/LearnPack";

export const PATH = {
    login: 'login',
    signup: 'signup',
    profile: 'profile',
    newPassword: 'new-password',
    resetPassword: 'reset-password',
    error: '404',
    packs: 'packs',
    cards: 'cards',
    learnPack: 'learn-pack'
}

const Pages = () => {
    return (
        <div className={s.pagesContainer}>
            <Routes>
                <Route path={'/'} element={<Login/>}>
                    <Route index element={<Profile/>}/>
                    <Route path={PATH.login} element={<Login/>}/>
                    <Route path={PATH.signup} element={<Signup/>}/>
                    <Route path={PATH.profile} element={<Profile/>}/>
                    <Route path={PATH.newPassword} element={<NewPassword/>}/>
                    <Route path={PATH.resetPassword} element={<ForgotPassword/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                    <Route path={PATH.packs} element={<PacksList/>} />
                    <Route path={PATH.cards} element={<CardsList/>} />
                    <Route path={PATH.learnPack} element={<LearnPack/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default Pages;