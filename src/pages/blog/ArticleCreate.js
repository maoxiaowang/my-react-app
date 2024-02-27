import ButtonAppBar from "../../components/AppBar";
import {Breadcrumbs, Link} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import ROUTES from "../../config/route";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import * as React from "react";
import {useCallback, useState} from "react";
import {axiosInstance} from "../../services/axios";
import API from "../../config/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const ArticleCreatePage = () => {
    console.log('ArticleCreatePage')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = useCallback((event) => {
        setTitle(event.target.value);
    }, []);

    const handleContentChange = useCallback((event) => {
        setContent(event.target.value);
    }, [])

    const handleCreateArticle = async () => {
        try {
            // 发送文章创建请求，将 title 和 content 发送给后端
            await axiosInstance.post(API.blog.articles, {title, content});

            // 创建成功后，跳转到文章列表页面或其他目标页面
            navigate(ROUTES.blog.articleListPage);
        } catch (error) {
            console.error('Error creating article:', error.response.status, error.response.data);
            setTitle(title);
            setContent(content);
        }
    };

    return (
        <Container>
            <ButtonAppBar/>
            <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                Publish Article
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{
                marginTop: theme => theme.spacing(1),
                marginBottom: theme => theme.spacing(2)
            }}>
                <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.homePage}>
                    Home
                </Link>
                <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.blog.articleListPage}>
                    Articles
                </Link>
                <Typography color="text.primary">New Article</Typography>
            </Breadcrumbs>

            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                sx={{marginTop: theme => theme.spacing(2)}}
                value={title}
                onChange={handleTitleChange}
                // inputProps={{ autoFocus: true }}
            />
            <TextField
                label="Content"
                variant="outlined"
                multiline
                rows={8}
                fullWidth
                sx={{marginTop: theme => theme.spacing(4)}}
                value={content}
                onChange={handleContentChange}
            />
            <Button variant="contained" color="primary" sx={{marginTop: theme => theme.spacing(4)}}
                    onClick={handleCreateArticle}>
                Publish
            </Button>
        </Container>
    )
}

export default ArticleCreatePage;