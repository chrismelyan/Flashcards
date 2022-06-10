import React from 'react';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {Button, IconButton, Input, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AppRootStateType, useAppDispatch} from "../../../f3-bll/store";
import {LoadingStatusType} from "../../../f3-bll/reducers/app-reducer";
import {setRegistrationTC} from "../../../f3-bll/reducers/registration-reducer";


const styleBtn: React.CSSProperties = {
    borderRadius: '18px',
    width: "180px",
    height: "36px",
    textTransform: "none",
    background: "linear-gradient(to right, #F8FFAE, #43C6AC)",
    fontSize: "16px",
    fontWeight: "400",
    color: "#21268F",
}
const mainBlock: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
}
const styleForm: React.CSSProperties = {
    marginTop: "84px",
    textAlign: 'center',
    width: "413px",
    minHeight: "580px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "24px",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)"
}
const styleInput: React.CSSProperties = {
    margin: "20px 0 0 0"
}
const styleH1: React.CSSProperties = {
    marginTop: "25px",
    lineHeight: "39px",
    fontWeight: "700",
    fontSize: "26px",
}
const styleH2: React.CSSProperties = {
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "33px",
}
const styleLink: React.CSSProperties = {
    backgroundColor: "#D7D8EF",
    color: "#21268F",
    textDecoration: "none",
    height: "36px",
    lineHeight: "2.0",
    borderRadius: "18px",
    fontWeight: "400",
    fontSize: "16px",
    padding: "0 20px",
    width: "120px"
}
const styleButtons: React.CSSProperties = {
    margin: "100px 0 0 0",
    display: "flex",
    justifyContent: "space-between"
}

type FormikErrorType = {
    email?: string
    password?: string
}

export const Signup = () => {

    const [hidden, setHidden] = React.useState(true);

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };

    const dispatch = useAppDispatch();
    const isRegisteredIn = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered);
    const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(state => state.app.loadingStatus);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 7) {
                errors.password = 'Password should be more than 7 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setRegistrationTC(values));
            formik.resetForm({});
        }
    });

    if (isRegisteredIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div style={mainBlock}>
            <div style={styleForm}>
                <h1 style={styleH1}>It-incubator</h1>
                <h2 style={styleH2}>Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <TextField id={"standard-basic"}
                               label={"Email"}
                               variant={"standard"}
                               style={styleInput}
                               fullWidth
                               {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red', fontSize: "small"}}>{formik.errors.email}</div>}
                    <Input style={styleInput}
                           placeholder={"Password"}
                           id="standard-adornment-password"
                           type={hidden ? 'password' : 'text'}
                           fullWidth
                           {...formik.getFieldProps("password")}

                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                   >
                                       {!hidden ? <VisibilityOff/> : <Visibility/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red', fontSize: "small"}}>{formik.errors.password}</div>}
                    <div style={styleButtons}>
                        <NavLink to={'/login'} style={styleLink}>Cancel</NavLink>
                        <Button type={'submit'}
                                variant={'contained'}
                                sx={styleBtn}
                                disabled={loadingStatus === 'loading'}>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;