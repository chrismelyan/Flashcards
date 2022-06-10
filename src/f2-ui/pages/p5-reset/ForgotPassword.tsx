import React from 'react';
import {Grid, Typography} from '@mui/material';
import {Answer} from './Answer/Answer';
import {ForgotPasswordForm} from './RecoveryPasswordForm/ForgotPasswordForm';
import '../../pages/styles/common.css';
import {useAppSelector} from "../../../f3-bll/store";


const ForgotPassword = () => {

    const responseInfo = useAppSelector<string>(state => state.recoverPassword.info)

    const titleOne: React.CSSProperties = {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 26,
        lineHeight: '39px',
        color: '#2D2E46',
        marginBottom: '30px'
    }

    return (
        <>
            <Grid container className={'containerGrid'}>
                <Grid className={'itemGrid'}>

                    <Typography sx={titleOne} variant={'h1'}>
                        It-incubator</Typography>

                    {responseInfo
                        ? <Answer/>
                        : <ForgotPasswordForm/>
                    }

                </Grid>
            </Grid>
        </>
    );
};

export default ForgotPassword;