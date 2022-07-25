import '../../styles/common.css';
import styles from './EditProfile.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from '../../../../f3-bll/store';
import {LoadingStatusType} from '../../../../f3-bll/reducers/app-reducer';
import Grid from '@mui/material/Grid';
import {TextField} from '@mui/material';
import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {ErrorText} from '../../p5-reset/ErrorText/ErrorText';
import {styleBtn} from '../../styles/commonMui';
import {updateUserInfo} from '../../../../f3-bll/reducers/login-reducer';
import {UserAvatar} from '../UserAvatar/UserAvatar';

type EditProfilePropsType = {
    avatar?: string
    editMode: boolean
    name: string
    onClickChangeEditModeHandler: () => void
}
type InitialValuesType = {
    nickname: string
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    nickname: Yup.string().required('Nick, please').min(3, 'minimum 3 symbols')
})

export const EditProfile: React.FC<EditProfilePropsType> = ({avatar, name, editMode, onClickChangeEditModeHandler}) => {
    const dispatch = useAppDispatch()

    const loadingStatus = useAppSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const email = useAppSelector<string>(state => state.login.data.email)

    const initialValues: InitialValuesType = {
        email: email,
        nickname: name
    }

    const onSubmit = (values: InitialValuesType) => {
        if (values.nickname === initialValues.nickname && values.email === initialValues.email) {
            onClickChangeEditModeHandler()
            return
        }
        dispatch(updateUserInfo(values.nickname, values.email))
        onClickChangeEditModeHandler()

    }

    return (
        <Grid container className={'containerGrid'}>
            <Grid className={'itemGrid'}>
                <div className={styles.wrapper}>
                    <div style={{fontSize: '20px', fontWeight: 'bolder', marginBottom: '16px'}}>Personal Information</div>

                    <UserAvatar avatar={avatar} editMode={editMode}/>

                    <div className={styles.formWrapper}>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignupSchema}>
                            {
                                (formik) => {
                                    return (
                                        <Form>
                                            <div style={{position: 'relative', marginTop: 20}}><>

                                                <TextField id={'nickname'}
                                                           label={'Nickname'}
                                                           variant={'standard'}
                                                           autoComplete={'off'}
                                                           error={!!formik.touched.nickname && !!formik.errors.nickname}
                                                           fullWidth
                                                           disabled={loadingStatus === 'loading'}
                                                           {...formik.getFieldProps('nickname')}/>
                                                <ErrorMessage
                                                    name={'nickname'}
                                                    component={ErrorText}
                                                />
                                            </>
                                            </div>
                                            <div style={{position: 'relative', marginTop: 26}}>
                                                <TextField id={'email'}
                                                           label={'Email'}
                                                           variant={'standard'}
                                                           autoComplete={'off'}
                                                           error={!!formik.touched.email && !!formik.errors.email}
                                                           fullWidth
                                                           disabled
                                                           {...formik.getFieldProps('email')}/>
                                                <ErrorMessage
                                                    name={'email'}
                                                    component={ErrorText}
                                                />
                                            </div>
                                            <div className={styles.buttonsGroup}>
                                                <Button sx={styleBtn}
                                                        type={'reset'}
                                                        variant={'contained'}
                                                        disabled={loadingStatus === 'loading'}>
                                                    Reset
                                                </Button>
                                                <Button sx={styleBtn}
                                                        type={'submit'}
                                                        variant={'contained'}
                                                        disabled={loadingStatus === 'loading'}>
                                                    Save
                                                </Button>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};