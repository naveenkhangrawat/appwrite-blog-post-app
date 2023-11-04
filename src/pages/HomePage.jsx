import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import databaseService from '../appwrite/database';
import Container from '../components/Container';
import PostCard from '../components/PostCard';

function HomePage() {

    const [posts, setPosts] = useState([]);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        databaseService.getAllPosts().then((allpostsData) => {
            setPosts(allpostsData.documents);
        })
    },[])

    if(!isLoggedIn){
        return (
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
        )
    }else {
        const userPosts = posts.filter((post) => post.userId === userData.$id);
        if(userPosts.length === 0){
            return (
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
            )
        }else {
            return (
                <div className='w-full py-8'>
                    <Container>            
                        <div className='flex flex-wrap'>
                            {userPosts?.map((post) => (
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
            )        
        }
    } 
}

export default HomePage;