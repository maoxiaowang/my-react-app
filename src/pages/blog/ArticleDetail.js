import {Link as RouterLink, useParams} from "react-router-dom";
import ButtonAppBar from "../../components/AppBar";
import Typography from "@mui/material/Typography";
import {Breadcrumbs, Card, CardContent, Link} from "@mui/material";
import ROUTES from "../../config/route";
import * as React from "react";
import FullHeightContainer from "../../components/FullHeightContainer";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../services/axios";
import API from "../../config/api";
import Box from "@mui/material/Box";


const ArticleDetailPage = () => {
    console.log('ArticleDetailPage')
    const {articleId} = useParams();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        author: '',
        created_at: null
    });

    useEffect(() => {
        console.log(API.blog.article)
        axiosInstance.get(`${API.blog.article.replace('{articleId}', articleId)}`)
            .then(response => {
                console.log(response.data)
                setArticle(response.data)
            })
            .catch(error => {
                // 处理错误
                console.error('Error fetching article details:', error);
            });
    }, [articleId]);
    return (
        <FullHeightContainer>
            <ButtonAppBar/>
            <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                Article
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
                <Typography color="text.primary">{article.title}</Typography>
            </Breadcrumbs>

            {article && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{marginBottom: (theme) => theme.spacing(2)}}>
                            {article.title}
                        </Typography>
                        <Box sx={{marginBottom: (theme) => theme.spacing(2)}}>
                            <Typography variant="caption" color="text.secondary"
                                        sx={{marginRight: (theme) => theme.spacing(4)}}>
                                Author: {article.author ? article.author.username : '-'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Date: {new Date(article.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.initial"
                                    sx={{marginBottom: (theme) => theme.spacing(2)}}>
                            {article.content}
                        </Typography>

                    </CardContent>
                </Card>
            )}
        </FullHeightContainer>
    )
}

export default ArticleDetailPage;