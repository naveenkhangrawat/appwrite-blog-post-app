import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import databaseService from '../appwrite/database';
import Container from '../components/Container';
import PostCard from '../components/PostCard';

function HomePage() {

    const [posts, setPosts] = useState([]);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        databaseService.getAllPosts().then((allpostsData) => {
            setPosts(allpostsData.documents);
        })
    },[])

    return (
        <>
            {!isLoggedIn ? (
                <div className='w-full py-8 mt-4 mb-4 text-center min-h-[47.5vh]'>
                    <Container>
                        <div className='flex flex-wrap'>
                            <div className='p-2 w-full'>
                                <h1 className='text-2xl font-bold hover:text-gray-500'>
                                    Log In to read your posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (posts.length === 0) ? (
                <div className='w-full py-8 mt-4 mb-4 text-center min-h-[47.5vh]'>
                    <Container>
                        <div className='flex flex-wrap'>
                            <div className='p-2 w-full'>
                                <h1 className='text-2xl font-bold hover:text-gray-500'>
                                    Create a post
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <div className='w-full py-8'>
                    <Container>            
                        <div className='flex flex-wrap'>
                            {posts?.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard 
                                        title={post?.title}
                                        $id={post?.$id}
                                        featuredImage={post?.featuredImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )}
        </>
    )
    }

export default HomePage;