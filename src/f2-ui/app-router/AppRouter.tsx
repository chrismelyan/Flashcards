import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import Profile from "../pages/p3-profile/Profile";
import Login from "../pages/p1-login/Login";
import NewPassword from "../pages/p4-new-password/NewPassword";
import CardsList from "../pages/p8-cardsTable/CardsList";
import LearnPack from "../pages/p7-card/LearnPack";
import NotFound from "../pages/p6-error/NotFound";
import Signup from "../pages/p2-signup/Signup";
import ForgotPassword from "../pages/p5-reset/ForgotPassword";
import {RequireAuth} from "../hoc";
import {PacksList} from "../pages/p9-packTable/TablePack/PacksList";

export const PATH = {
    login: 'login',
    signup: 'signup',
    profile: 'profile',
    newPassword: 'new-password/:token',
    resetPassword: 'reset-password',
    error: '404',
    packs: 'packs',
    cards: 'cards/:id',
    learnPack: 'learn-pack/:id'
}

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Profile/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.resetPassword} element={<ForgotPassword/>}/>
                <Route path={PATH.newPassword} element={<NewPassword/>}/>
                <Route path={PATH.signup} element={<Signup/>}/>
                <Route path={PATH.packs} element={
                    <RequireAuth>
                        <PacksList/>
                    </RequireAuth>
                } />
                <Route path={PATH.cards} element={<CardsList/>} />
                <Route path={PATH.learnPack} element={<LearnPack/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;