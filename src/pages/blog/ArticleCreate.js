import ButtonAppBar from "../../components/AppBar";
import {Backdrop, Breadcrumbs, CircularProgress, Link, Slide, Snackbar} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import ROUTES from "../../config/route";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import {useState} from "react";
import axiosInstance from "../../services/axios";
import API from "../../config/api";
import useSnackbar from "../../hooks/useSnackBar";
import * as React from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const ArticleCreatePage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const {snackbarOpen, snackbarMessage, setSnackbarMessage, openSnackbar, closeSnackbar} = useSnackbar();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleCreateArticle = async () => {
        setLoading(true)
        try {
            // 发送文章创建请求，将 title 和 content 发送给后端
            await axiosInstance.post(API.blog.article, {title, content});

            // 创建成功后，跳转到文章列表页面或其他目标页面
            navigate(ROUTES.blog.articleListPage);
        } catch (error) {
            openSnackbar(`创建文章失败: ${error}`)
            console.error('Error creating article:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Container>
            <Backdrop open={loading} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress sx={{color: "#fff"}}/>
            </Backdrop>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={closeSnackbar}
                TransitionComponent={Slide}
            >
                <Alert onClose={closeSnackbar} severity="error" variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <ButtonAppBar/>
            <h1>New Article</h1>
            <Breadcrumbs aria-label="breadcrumb">
                <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.homePage}>
                    Home
                </Link>
                <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.blog.articleListPage}>
                    Articles
                </Link>
                <Typography color="text.primary">New Article</Typography>
            </Breadcrumbs>

            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                sx={{marginTop: 4}}
            />
            <TextareaAutosize
                minRows={20} // 设置最小行数
                placeholder="Content"
                value={content}
                onChange={handleContentChange}
                style={{width: '100%', marginTop: '16px'}}
            />
            <Button variant="contained" color="primary" onClick={handleCreateArticle}>
                Create Article
            </Button>
        </Container>
    )
}

export default ArticleCreatePage;