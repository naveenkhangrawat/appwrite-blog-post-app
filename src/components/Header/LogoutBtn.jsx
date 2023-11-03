import React from 'react'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../reduxTK/authSlice';

function LogoutBtn() {

    const dispatch = useDispatch();

    function logoutHandler(){
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((error) => {
            console.log('logoutHandler error', error);
        })
    }

    return (
        <button 
            type='button'
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn;