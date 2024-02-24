import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ButtonAppBar from "../components/AppBar";
import ROUTES from "../base/config/route";

const ArticleListPage = () => {
    return (
        <>
            <ButtonAppBar />
            <h1>Article</h1>
            <RouterLink to={ROUTES.homePage}>Home</RouterLink>
        </>
    )
}

export default ArticleListPage;