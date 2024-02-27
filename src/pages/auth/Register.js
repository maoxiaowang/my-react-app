import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import ROUTES from "../../config/route";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputContainer from "../../components/InputContainer";
import {axiosInstance} from "../../services/axios";
import API from "../../config/api";

const RegistrationSuccessDialog = ({open, onClose}) => {
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate(ROUTES.auth.loginPage, {replace: true});
        onClose(); // 关闭Dialog
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>注册成功</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    恭喜您，注册成功，请登录后继续使用。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleLoginButtonClick} color="primary">
                    去登录
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const RegisterPage = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password1: '',
            password2: ''
        },
        onSubmit: async (values) => {
            console.log('values', values)
            await axiosInstance.post(API.auth.register, {
                username: values.username,
                password1: values.password1,
                password2: values.password2
            })
            setDialogOpen(true);
        },
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = '用户名不能为空';
            }
            if (!values.password1) {
                errors.password1 = '密码不能为空';
            }
            if (values.password1.length < 4) {
                errors.password1 = '密码不能少于4位'
            }
            if (!values.password2) {
                errors.password2 = '确认密码不能为空';
            }
            if (values.password2.length < 4) {
                errors.password2 = '确认密码不能少于4位'
            }
            if (values.password2 !== values.password1) {
                errors.password2 = '两次密码不一致'
            }

            // 更新 formik 的 isValid 属性
            formik.isValid = Object.keys(errors).length === 0;

            return errors;
        },
    });

    const handleCloseSuccessDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{height: '100vh'}}
            >
                <Grid item xs={8} sm={6} md={4} lg={3} xl={2}>
                    <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                        Register
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <InputContainer>
                            <TextField
                                label="用户名"
                                type="text"
                                {...formik.getFieldProps('username')}
                                fullWidth
                                autoFocus
                            />
                            {formik.touched.username && formik.errors.username && (
                                <Alert severity="error">{formik.errors.username}</Alert>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <TextField
                                label="密码"
                                type="password"
                                {...formik.getFieldProps('password1')}
                                fullWidth
                            />
                            {formik.touched.password1 && formik.errors.password1 && (
                                <Alert severity="error">{formik.errors.password1}</Alert>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <TextField
                                label="密码确认"
                                type="password"
                                {...formik.getFieldProps('password2')}
                                fullWidth
                            />
                            {formik.touched.password2 && formik.errors.password2 && (
                                <Alert severity="error">{formik.errors.password2}</Alert>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <Button variant="contained" color="primary" size="large" type="submit" sx={{width: '100%'}}>
                                提交
                            </Button>
                        </InputContainer>
                    </form>

                    <Typography variant="body1" color="text.secondary">
                        <Link component={RouterLink} to={ROUTES.auth.loginPage} color="primary" onMouseDown={
                            (event) => {
                                // 解决失去焦点导致无法导航的问题
                                event.preventDefault();
                                navigate(ROUTES.auth.loginPage, { replace: true });
                                document.activeElement.blur();
                            }}
                        >
                            去登录
                        </Link>
                    </Typography>
                </Grid>
            </Grid>

            <RegistrationSuccessDialog open={isDialogOpen} onClose={handleCloseSuccessDialog}/>
        </>

    );
};


export default RegisterPage;
