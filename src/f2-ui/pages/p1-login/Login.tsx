import React from 'react';
import classes from '../CommonStyle.module.css';
import * as Yup from 'yup';
import s from './Login.module.css';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Grid,
    TextField, InputAdornment, IconButton,
} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {styleBtn, styleForm, styleInput, styleRememberMe} from "./LoginMUI";
import {Loader} from "../../common/loader/Loader";
import {useAppDispatch, useAppSelector} from "../../../f3-bll/store";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {loginTC} from "../../../f3-bll/reducers/login-reducer";

const Login = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const loadingStatus = useAppSelector<string>(state => state.app.loadingStatus)
    const [hidden, setHidden] = React.useState(true)

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email('invalid email'),
            password: Yup.string().required().min(7, 'min 7 characters'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe));
            setSubmitting(false)
            formik.resetForm();
        }
    })

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={classes.common}>
            {loadingStatus === 'loading' && <Loader/>}
            <Grid container justifyContent={'center'} style={{padding: '30px'}}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl sx={styleForm} variant={"filled"}>
                            <FormLabel>
                                <h1 className={s.styleH1}>It-incubator</h1>
                                <h2 className={s.styleH2}>Sign In</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    id={'email'}
                                    style={styleInput}
                                    label={'email'}
                                    error={formik.touched.email && !!formik.errors.email}
                                    variant="standard"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email
                                    && formik.errors.email
                                    && <div style={{fontSize: '10px', color: 'red'}}>{formik.errors.email}</div>}
                                <TextField
                                    id={'password'}
                                    variant="standard"
                                    style={styleInput}
                                    error={formik.touched.password && !!formik.errors.password}
                                    label={'password'}
                                    type={hidden ? 'password' : 'text'}
                                    {...formik.getFieldProps('password')}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        >
                                    {!hidden ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                />
                                {formik.touched.password
                                    && formik.errors.password
                                    && <div style={{fontSize: '10px', color: 'red'}}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    style={styleRememberMe}
                                    label={'Remember me'}
                                    control={<Checkbox checked={formik.values.rememberMe}/>}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                                <div style={{textAlign: "right", marginRight: "33px"}}>
                                    <Link className={s.forgotPassword} to={'/recovery-password'}>Forgot Password</Link>
                                </div>
                                <Button sx={styleBtn} type={'submit'}>Login</Button>
                                <FormLabel>
                                    <p className={s.styleP}>Don't have an account?</p>
                                    <Link className={s.signUp} to={'/registration'}>Sign Up</Link>
                                </FormLabel>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;