import React from 'react';
import {CircularProgress} from '@mui/material';

import styles from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.progress}>
                <CircularProgress size={50}/>
            </div>
        </div>
    );
};
