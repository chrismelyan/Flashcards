import React from 'react';
import {FormikValues} from 'formik';

import styles from './ErrorText.module.css'


export const ErrorText = ({children}: FormikValues ) => {
    return (
        <div className={styles.error}>{children}</div>
    );
};


type ErrorTextPropsType = {
    errorText: string
}

// export const ErrorText: React.FC<ErrorTextPropsType> = ({errorText}) => {
//     return (
//         <div className={styles.error}>{errorText}</div>
//     );
// };

