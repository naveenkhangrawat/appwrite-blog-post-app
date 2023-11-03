import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({children, authentication=true}) {

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        if(authentication && isLoggedIn !== authentication){
            navigate('/login');
        } else if(!authentication && isLoggedIn !== authentication){
            navigate('/');
        }
        setLoader(false);
    },[isLoggedIn, navigate, authentication])

    return (
        <>
        {loader ? (
            <h1>Loading...</h1>
        ) : (
            <>
                {children}
            </>
        )}
        </>
    )
}

export default AuthLayout;