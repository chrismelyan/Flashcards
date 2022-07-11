import React from 'react';
import s from './Header.module.css'
import {PATH} from "../pages/Pages";
import {CustomLink} from "../pages/utilities/CustomLink";

const Header = () => {
    return (
        <div className={s.header}>
                <CustomLink to={PATH.profile}>Profile</CustomLink>
                <CustomLink to={PATH.packs}>Packs list</CustomLink>
        </div>
    );
};

export default Header;