import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import {PATH} from "../pages/Pages";

const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.pages}>
                <NavLink to={PATH.login} className={({isActive}) => (isActive ? s.active : s.item)}>Log in</NavLink>
                <NavLink to={PATH.signup} className={({isActive}) => (isActive ? s.active : s.item)}>Sign up</NavLink>
                <NavLink to={PATH.profile} className={({isActive}) => (isActive ? s.active : s.item)}>Profile</NavLink>
                <NavLink to={PATH.newPassword}
                         className={({isActive}) => (isActive ? s.active : s.item)}>Password</NavLink>
                <NavLink to={PATH.resetPassword}
                         className={({isActive}) => (isActive ? s.active : s.item)}>Reset</NavLink>
                <NavLink to={PATH.error} className={({isActive}) => (isActive ? s.active : s.item)}>404</NavLink>
                <NavLink to={PATH.test} className={({isActive}) => (isActive ? s.active : s.item)}>Test</NavLink>
            </div>
        </div>
    );
};

export default Header;