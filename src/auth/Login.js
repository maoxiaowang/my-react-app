import * as React from 'react';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Backdrop, CircularProgress, Grid, Slide, Snackbar} from "@mui/material";
import {styled} from '@mui/system';
import './Login.css'
import axios, {LOGIN_URL} from '../base/api'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const InputContainer = styled('div')({
    marginBottom: '1rem'
})

const LoginPage = () => {

    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('error');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values)     => {
            setLoading(true)
            try {
                const response = await axios.post(LOGIN_URL, {
                    username: values.username,
                    password: values.password,
                });
                console.log('Login successful', response.data);
                navigate('/blog/articles',  { replace: true });
            } catch (error) {
                setSnackbarMessage('登录失败，请检查用户名和密码');  // 设置错误消息
                setSnackbarOpen(true);  // 打开SnackBar
                console.error('Login failed', error);
            } finally {
                setLoading(false)
            }
        },
        validate: (values) => {
            const errors = {};

            if (!values.username) {
                errors.username = '用户名不能为空';
            }

            if (!values.password) {
                errors.password = '密码不能为空';
            }

            return errors;
        },
    });


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleSnackbarExited = () => {
        setSnackbarMessage('');
    };

    // 处理 Snackbar 消失时重置消息


    return (
        <>
            {/* 遮罩层 */}
            <Backdrop open={loading} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress sx={{color: "#fff"}}/>
            </Backdrop>
            {/* SnackBar通知 */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleSnackbarClose}
                TransitionComponent={Slide}
                onExited={handleSnackbarExited}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{height: '100vh'}}
            >
                <Grid item xs={8} sm={6} md={4} lg={3} xl={2}>
                    <h1>Login</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <InputContainer>
                            <TextField
                                label="Username"
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
                                label="Password"
                                type="password"
                                {...formik.getFieldProps('password')}
                                fullWidth
                            />
                            {formik.touched.password && formik.errors.password && (
                                <Alert severity="error">{formik.errors.password}</Alert>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <Button variant="contained" color="primary" size="large" type="submit" sx={{width: '100%'}}>
                                Login
                            </Button>
                        </InputContainer>
                    </form>
                </Grid>
            </Grid>
        </>

    );
};

export default LoginPage;