import React, { useState } from 'react'
import databaseService from '../appwrite/database'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import Button from '../components/Button';
import parse from "html-react-parser";

function PostPage() {

    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? (userData.$id === post.userId) : false;

    function deletePost(){
        databaseService.deletePost(post.$id).then((response) => {
            if(response){
                databaseService.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    }

    useEffect(() => {
        if(postId){
            databaseService.getPost(postId).then((postData) => {
                setPost(postData);
            })
        } else {
            navigate('/');
        }
    },[postId, navigate])

    return (
        <>
            {post && (
                <div className='py-8'>
                    <Container>
                        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                            <img 
                                src={databaseService.getFilePreview(post.featuredImage)} 
                                alt={post.title}
                                className='rounded-xl' 
                            />

                            {isAuthor && (
                                <div className='absolute right-6 top-6'>
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button 
                                            btnText={`Edit`}
                                            type='button'
                                            bgColor="bg-green-500" 
                                            className="mr-3"
                                        />
                                    </Link>

                                    <Button 
                                        btnText={`Delete`}
                                        type='button'
                                        bgColor='bg-red-500'
                                        onClick={deletePost}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='w-full mb-6'>
                            <h1 className='text-2xl font-bold'>{post.title}</h1>
                        </div>
                        <div className='browser-css'>
                            {parse(post.content)}
                        </div>
                    </Container>
                </div>
            )}
        </>
    )
}

export default PostPage;