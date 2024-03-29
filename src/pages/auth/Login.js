import * as React from 'react';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Backdrop, CircularProgress, Grid, Link, Slide, Snackbar} from "@mui/material";
import '../../assets/styles/auth/Login.css'
import Alert from '@mui/material/Alert';
import {useNavigate} from 'react-router-dom';
import ROUTES from "../../config/route";
import useSnackBar from "../../hooks/useSnackBar";
import {useAuth} from "../../context/useAuth";
import Typography from "@mui/material/Typography";
import InputContainer from "../../components/InputContainer";
import {Link as RouterLink} from 'react-router-dom';


const LoginPage = () => {

    const [loading, setLoading] = React.useState(false);
    const {snackbarOpen, snackbarMessage, openSnackbar, closeSnackbar} = useSnackBar();
    const navigate = useNavigate();

    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await auth.login(values.username, values.password)
                navigate(ROUTES.homePage, {replace: true})
            } catch (error) {
                openSnackbar('登录失败，请检查用户名和密码');
            } finally {
                setLoading(false);
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
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={closeSnackbar}
                TransitionComponent={Slide}
            >
                <Alert onClose={closeSnackbar} severity="error" variant="outlined">
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
                    <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                        Login
                    </Typography>
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
                    <Typography variant="body1" color="text.secondary">
                        没有账号？
                        <Link component={RouterLink} to={ROUTES.auth.registerPage} color="primary" onMouseDown={
                            (event) => {
                                // 解决失去焦点导致无法导航的问题
                                event.preventDefault();
                                navigate(ROUTES.auth.registerPage, { replace: true });
                                document.activeElement.blur();
                            }}>
                            去注册
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </>

    );
};


export default LoginPage;