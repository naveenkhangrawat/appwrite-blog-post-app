import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import RTE from './RTE';
import databaseService from '../appwrite/database';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import SelectBtn from './SelectBtn';

function PostForm({post}) {

    const navigate = useNavigate();

    const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
            slug: post?.$id || ''
        }
    });

    const userData = useSelector((state) => state.auth.userData);


    async function onPostFormSubmit(data){
        try {
            if(post){
                const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
                if(file){
                    databaseService.deleteFile(post.featuredImage)
                }
                const updatedPost = await databaseService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                if(updatedPost){
                    navigate(`/post/${updatedPost.$id}`)
                }
            }else{
                const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
                if(file){
                    const newPost = await databaseService.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id
                    })
                    if(newPost){
                        navigate(`/post/${newPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.log('onPostFormSubmit error', error);
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-');
        }else {
            return '';
        }
    },[]);

    // alternate method

    // const title = watch('title');
    // useEffect(() => {
    //     setValue('slug', slugTransform(title));
    // },[title])

    useEffect(() => {
        const subscription = watch((data, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(data.title), {shouldValidate: true});
            }
        })
        
        return () => {
            subscription.unsubscribe();
        }
    },[watch, slugTransform, setValue])
    

    return (
        <form onSubmit={handleSubmit(onPostFormSubmit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                    label={`Title: `}
                    type='text'
                    placeholder='Title'
                    className='mb-4'
                    {...register('title', {
                        required: true
                    })}
                />

                <Input 
                    label={`Slug: `}
                    type='text'
                    placeholder='Slug'
                    className='mb-4'
                    {...register('slug', {
                        required: true
                    })}
                    onInput = {(event) => {
                        setValue('slug', slugTransform(event.target.value), {shouldValidate: true});
                    }}
                />

                <RTE 
                    name={`content`}
                    control={control}
                    label={`Content: `}
                    defaultValue={getValues('content')}
                />
            </div>

            <div className='w-1/3 px-2'>
                <Input 
                    label={`Featured Image: `}
                    type='file'
                    className='mb-4'
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    {...register('image', {
                        required: !post
                    })}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img 
                            src={databaseService.getFilePreview(post.featuredImage)} 
                            alt={post.title}
                            className='rounded-lg'  
                        />
                    </div>
                )}

                <SelectBtn 
                    label={`Status: `}            
                    options={['active', 'inactive']}
                    className='mb-4'
                    {...register('status', {
                        required: true
                    })}
                />

                <Button 
                    btnText={post ? 'Update' : 'Submit'}
                    type='submit'
                    className='w-full'
                    bgColor={post && 'bg-green-500'}
                />
            </div>
        </form>
    )
}

export default PostForm;