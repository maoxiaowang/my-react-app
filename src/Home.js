import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <RouterLink to={"/auth/login"}>Login</RouterLink>
        </>
    )
}

export default Home;