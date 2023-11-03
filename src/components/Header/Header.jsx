import React, { useEffect } from 'react'
import Container from '../Container';
import { useSelector } from 'react-redux';
import Logo from '../Logo';
import { Link, useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

function Header() {
    
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Login',
            path: '/login',
            active: !isLoggedIn
        },
        {
            name: 'Signup',
            path: '/signup',
            active: !isLoggedIn
        },
        {
            name: 'All Posts',
            path: '/all-posts',
            active: isLoggedIn
        },
        {
            name: 'Add Post',
            path: '/add-post',
            active: isLoggedIn
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='80px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {
                            navItems.map((element) => (
                                element.active === true && (
                                    <li key={element.name}>
                                        <button 
                                            type='button'
                                            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                            onClick={() => navigate(element.path)}
                                        >
                                            {element.name}
                                        </button>
                                    </li>
                                )
                            ))
                        }
                        {isLoggedIn && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;