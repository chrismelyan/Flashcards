import React from 'react';
import classes from "../CommonStyle.module.css";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={classes.common}>
            <p>NOT FOUND 404</p>
            Back to <Link style={{textDecoration: 'none', fontWeight: 'bold'}} to={'/'} >Profile</Link>
        </div>
    );
};

export default NotFound;