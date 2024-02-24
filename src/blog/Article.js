import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ButtonAppBar from "../components/AppBar";

const ArticleListPage = () => {
    return (
        <>
            <ButtonAppBar />
            <h1>Article</h1>
            <RouterLink to={"/auth/login"}>Login</RouterLink>
        </>
    )
}

export default ArticleListPage;