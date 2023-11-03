import React, { useState } from 'react'
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from './Logo';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '../reduxTK/authSlice';
import Button from './Button';


function Signup() {

    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    async function onSubmitSignupHandler(data){
        setError('');
        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(storeLogin(userData));
                }
                navigate('/') 
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign up to create account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link 
                        to={`/login`}
                        className='font-medium transition-all duration-200 hover:underline'
                    >
                        Sign In
                    </Link>
                </p>

                {error && (
                    <p className='text-red-600 mt-8 text-center'>{error}</p>
                )}

                <form onSubmit={handleSubmit(onSubmitSignupHandler)}>
                    <div className='space-y-5'>
                        <Input 
                            label='FullName: '
                            placeholder='Enter your full name'
                            type='text'
                            {...register('name', {
                                required: true
                            })}
                        />

                        <Input 
                            label='Email: '
                            type='email'
                            placeholder='Enter your email'
                            {...register('email',{
                                required: true,
                                validate: {
                                    matchPattern: (value) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address')
                                }
                            })}
                        />

                        <Input 
                            label={`Password: `}
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true
                            })}
                        />

                        <Button 
                            btnText='Create Account'
                            type='submit'
                            className='w-full'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
