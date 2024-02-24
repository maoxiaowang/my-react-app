import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ROUTES from "./base/config/route";

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <RouterLink to={ROUTES.blog.articlePage}>Article</RouterLink>
        </>
    )
}

export default Home;