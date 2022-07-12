import React from 'react';
import s from './Header.module.css'
import {CustomLink} from "../pages/utilities/CustomLink";
import {PATH} from "../app-router/AppRouter";

const Header = () => {
    return (
        <div className={s.header}>
                <CustomLink to={PATH.profile}>Profile</CustomLink>
                <CustomLink to={PATH.packs}>Packs list</CustomLink>
        </div>
    );
};

export default Header;