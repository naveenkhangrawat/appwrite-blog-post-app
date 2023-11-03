import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database';
import Container from '../components/Container';
import PostCard from '../components/PostCard';


function AllPostsPage() {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        databaseService.getAllPosts()
            .then((allpostsData) => {
                setPosts(allpostsData.documents);
            })
    },[])

    return (
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
    )
}

export default AllPostsPage;