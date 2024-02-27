import {Link as RouterLink} from 'react-router-dom';
import ButtonAppBar from "../../components/AppBar";
import ROUTES from "../../config/route";
import {AlertTitle, Breadcrumbs, Card, CardContent, Fab, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../services/axios";
import API from "../../config/api";
import FullHeightContainer from "../../components/FullHeightContainer";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";


const ArticleListPage = () => {
    console.log('ArticleListPage')
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // 异步请求获取文章数据
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get(API.blog.articles);
                setArticles(response.data.results);

            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        // 调用异步请求函数
        fetchArticles().then();
    }, []);

    const ArticleCard = ({title, content, id}) => {
        return (
            <Grid item xs={12} >
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{marginBottom: (theme) => theme.spacing(2)}}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                                    sx={{marginBottom: (theme) => theme.spacing(2)}}>
                            {content}
                        </Typography>
                        <Link component={RouterLink} to={`${ROUTES.blog.articleDetailPage}/${id}`} variant="contained"
                              color="primary">
                            Read More >
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    const ArticleList = ({articles}) => {
        return (
            <Grid container spacing={2}>
                {articles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </Grid>
        );
    };

    const FloatingActionButton = () => {
        return (
            <Fab
                color="primary"
                aria-label="add"
                style={{position: 'fixed', bottom: 32, right: 16}}
                component={RouterLink}
                to={ROUTES.blog.articleCreatePage}
            >
                <AddIcon sx={{width: '32px', height: '32px'}}/>
            </Fab>
        );
    };

    const NoArticlesMessage = () => {
        return (

                <Alert severity="info">
                    <AlertTitle grum>Woo</AlertTitle>
                    <Typography gutterBottom>
                        暂时还没有文章，成为第一个发布者吧！
                    </Typography>
                                    <Button
                    component={RouterLink}
                    to={ROUTES.blog.articleCreatePage}
                    variant="outlined"
                    color="primary"
                    size="small"
                >
                    去发布
                </Button>
                </Alert>

        );
    };


    return (
        <FullHeightContainer>
            <ButtonAppBar/>
            <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                Articles
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{
                marginTop: theme => theme.spacing(1),
                marginBottom: theme => theme.spacing(2)
            }}>
                <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.homePage}>
                    Home
                </Link>
                <Typography color="text.primary">Articles</Typography>
            </Breadcrumbs>

            {articles && <ArticleList articles={articles}/> && <NoArticlesMessage />}
            <FloatingActionButton/>
        </FullHeightContainer>
    )
}

export default ArticleListPage;