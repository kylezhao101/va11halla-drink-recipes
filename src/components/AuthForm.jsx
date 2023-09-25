import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../util/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../util/firebase';

auth.useDeviceLanguage();

const AuthForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isRessettingPassword, setIsResettingPassword] = useState(false);

    const toggleIsSigningUp = () => {
        setIsSigningUp(!isSigningUp);
        setIsResettingPassword(false);
    };

    const toggleIsRessettingPassword = () => {
        setIsResettingPassword(!isRessettingPassword);
        setMessage('');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        if (isSigningUp && password.length < 6) {
            setMessage('Password must be at least 6 characters long');
            return;
        }
    
        try {
            if (isSigningUp) {
                const authResult = await createUserWithEmailAndPassword(auth, email, password);
                const newId = authResult.user.uid;
                const userRef = doc(firestore, 'users', newId);
                
                const docSnapshot = await userRef.get();
                if (!docSnapshot.exists()) {
                    await setDoc(userRef, {
                        Favourites: []
                    });
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
    
            if (isRessettingPassword) {
                await sendPasswordResetEmail(auth, email);
                setMessage('Password reset email sent!');
            }
    
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            setMessage(errorCode);
        }
    };

    const callGoogleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // const user = result.user;
            const newId = auth.user.uid;
            const userRef = collection('users').doc(newId);

            userRef.get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        return;
                    }
                    else {
                        setDoc(doc(firestore, 'users', newId), {
                            Favourites: []
                        })
                    }
                })
            navigate('/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

    };

    return (
        <form className='font-body'>
            {isRessettingPassword ? (
                <>
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
                    <button type="submit" onClick={onSubmit} className='text-lg text-red-interactive block p-1 pl-3 pr-3 cursor-pointer select-none border-red-interactive border-2 rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center peer-checked:bg-red-interactive peer-checked:text-slate-950 peer-checked:font-bold duration-100'>
                        Send Email Reset
                    </button>
                    {message && <p className="text-white">{message}</p>}
                    <button type='submit' onClick={toggleIsRessettingPassword} className='text-red-interactive text-base mt-5'>
                        Back to sign in
                    </button>
                </>
            ) : (
                <>
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
                            className={`block p-1 pl-3 pr-3 cursor-pointer select-none border-2 border-red-interactive rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center ${isSigningUp ? 'text-red-interactive' : 'text-white'
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
                            className={`block p-1 pl-3 pr-3 cursor-pointer select-none border-2 border-red-interactive rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center ${isSigningUp ? 'text-white' : 'text-red-interactive'
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
                    <button type='submit' onClick={callGoogleSignIn} className='text-red-interactive text-lg mt-5'>
                        Sign in with Google
                    </button>
                    {message && <p className="text-red-600">{message}</p>}
                    <button type='submit' onClick={toggleIsRessettingPassword} className='block text-red-interactive text-base mt-5'>
                        Forgot Password?
                    </button>
                </>
            )}
        </form>
    );
};

export default AuthForm;