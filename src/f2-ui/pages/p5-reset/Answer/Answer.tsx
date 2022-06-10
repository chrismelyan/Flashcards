import React from 'react';
import styles from './Answer.module.css'
import {ReactComponent as Letter} from '../assets/letter.svg';


export const Answer = () => {
    return (
        <>
            <Letter/>
            <div className={styles.check}>Check Email</div>
            <div className={styles.text}>We’ve sent an Email with instructions to example@mail.com</div>
        </>
    );
};