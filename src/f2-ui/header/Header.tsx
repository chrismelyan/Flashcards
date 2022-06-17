import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import {PATH} from "../pages/Pages";

const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.pages}>
                <NavLink to={PATH.login}
                         className={({isActive}) => (isActive ? s.active : s.item)}>Log in</NavLink>
                <NavLink to={PATH.profile}
                         className={({isActive}) => (isActive ? s.active : s.item)}>Profile</NavLink>
                <NavLink to={PATH.packs}
                         className={({isActive}) => (isActive ? s.active : s.item)}>Packs</NavLink>

            </div>
        </div>
    );
};

export default Header;