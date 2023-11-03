import React, { useEffect, useState } from 'react'
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './reduxTK/authSlice';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthLayout from './components/AuthLayout';
import SignupPage from './pages/SignupPage';
import AllPostsPage from './pages/AllPostsPage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
import PostPage from './pages/PostPage';


function App() {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoading(true);
    authService.getCurrentUser()
      .then((response) => {
        if(response){
          dispatch(login(response));
        }else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  },[])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayoutPage />}>
        <Route path='' element={<HomePage />} />

        <Route path='/login' element={(
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        )} />
        <Route path='/signup' element={(
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )} />
        <Route path='/all-posts' element={(
          <AuthLayout authentication={true}>
            <AllPostsPage />
          </AuthLayout>
        )} />
        <Route path='/add-post' element={(
          <AuthLayout authentication={true}>
            <AddPostPage />
          </AuthLayout>
        )} />
        <Route path='/edit-post/:postId' element={(
          <AuthLayout authentication={true}>
            <EditPostPage />
          </AuthLayout>
        )} />
        <Route path='/post/:postId' element={(
          <AuthLayout authentication={true}>
            <PostPage />
          </AuthLayout>
        )} />
      </Route>
    )
  )

 
  return (
    <>
      {
        !loading && (
          <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
            <div className='w-full block'>
              <RouterProvider router={router} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default App;


