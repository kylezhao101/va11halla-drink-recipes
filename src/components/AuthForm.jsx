import React, { useState } from 'react';
import '../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../util/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);

    const toggleIsSigningUp = () => {
        setIsSigningUp(!isSigningUp);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isSigningUp && password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            return;
        }
        if (isSigningUp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode);
                })
        }
    };

    const callGoogleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

    };

    return (
        <form className='font-body'>
            <div className='flex gap-2 text-lg text-red-interactive mb-5'>
            <input
                    type='radio'
                    id='signin'
                    name='authType'
                    checked={!isSigningUp}
                    onChange={toggleIsSigningUp}
                    className='peer hidden'
                />
                <label
                    htmlFor='signin'
                    className={`block p-1 pl-3 pr-3 cursor-pointer select-none border-2 border-red-interactive rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center ${
                        isSigningUp ? 'text-red-interactive' : 'text-white'
                    }`}
                >
                    Sign In
                </label>
                <input
                    type='radio'
                    id='signup'
                    name='authType'
                    checked={isSigningUp}
                    onChange={toggleIsSigningUp}
                    className='peer hidden'
                />
                <label
                    htmlFor='signup'
                    className={`block p-1 pl-3 pr-3 cursor-pointer select-none border-2 border-red-interactive rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center ${
                        isSigningUp ? 'text-white' : 'text-red-interactive'
                    }`}
                >
                    Sign Up
                </label>
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="email-address" className='text-lg text-red-interactive'>Email</label>
                <input
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className='text-lg font-body border-b-2 border-red-interactive bg-transparent text-white outline-none'
                />
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="password" className='text-lg text-red-interactive'>Password</label>
                <input
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className='text-lg font-body border-b-2 border-red-interactive bg-transparent text-white outline-none'
                />
                {password.length > 0 && password.length < 6 && (
                    <p className="text-white">Password must be at least 6 characters long</p>
                )}
            </div>

            <button type="submit" onClick={onSubmit} className='text-lg text-red-interactive block p-1 pl-3 pr-3 cursor-pointer select-none border-red-interactive border-2 rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center peer-checked:bg-red-interactive peer-checked:text-slate-950 peer-checked:font-bold duration-100'>
                {isSigningUp ? 'Sign Up' : 'Sign In'}
            </button>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <button type='submit' onClick={callGoogleSignIn} className='text-red-interactive text-lg mt-5'>
                Sign in with Google
            </button>
        </form>
    );
};

export default AuthForm;