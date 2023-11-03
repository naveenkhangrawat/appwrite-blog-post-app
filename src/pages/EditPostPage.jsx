import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database';
import PostForm from '../components/PostForm';
import Container from '../components/Container';
import { useNavigate, useParams } from 'react-router-dom';


function EditPostPage() {

    const [post, setPost] = useState(null);

    // const {pathname} = useLocation();
    // const postId = pathname.split('/').filter((element) => element.length > 0)[1]

    const {postId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(postId){
            databaseService.getPost(postId).then((postData) => {
                setPost(postData);
            })
        } else{
            navigate('/'); 
        }
    },[postId])


    return (
        <>
            {post && (
                <div className='py-8'>
                    <Container>
                        <PostForm post={post} />
                    </Container>
                </div>
            )}
        </>
    )
}

export default EditPostPage;