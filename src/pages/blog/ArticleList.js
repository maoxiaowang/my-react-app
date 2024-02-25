import {Link as RouterLink} from 'react-router-dom';
import ButtonAppBar from "../../components/AppBar";
import ROUTES from "../../config/route";
import {Container} from "@mui/system";
import {Breadcrumbs, Card, CardContent, Fab, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import axiosInstance from "../../services/axios";
import API from "../../config/api";
import FullHeightContainer from "../../components/FullHeightContainer";
import AddIcon from '@mui/icons-material/Add';


const ArticleListPage = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // 异步请求获取文章数据
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get(API.blog.articles);
                setArticles(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        // 调用异步请求函数
        fetchArticles().then();
    }, []);

    const ArticleCard = ({title, description, link}) => {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Link component={RouterLink} to={link} variant="contained" color="primary">
                        Read More
                    </Link>
                </CardContent>
            </Card>
        );
    };

    const ArticleList = ({articles}) => {
        return (
            <div>
                {articles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        );
    };

    const FloatingActionButton = () => {
        return (
            <Fab
                color="primary"
                aria-label="add"
                style={{position: 'absolute', bottom: 32, right: 16}}
                component={RouterLink}
                to={ROUTES.blog.articleCreatePage}
            >
                <AddIcon sx={{width: '32px', height: '32px'}}/>
            </Fab>
        );
    };

    const InnerContent = () => {
        return (
            <>
                <ButtonAppBar/>
                <h1>Articles</h1>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} underline="hover" color="inherit" to={ROUTES.homePage}>
                        Home
                    </Link>
                    <Typography color="text.primary">Articles</Typography>
                </Breadcrumbs>

                <ArticleList articles={articles}/>
                <FloatingActionButton/>
            </>
        )

    }

    return (
        <FullHeightContainer element={<InnerContent/>}/>
    )
}

export default ArticleListPage;