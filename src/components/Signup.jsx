import React, { useState } from 'react';
import '../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../util/firebase';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user);
        auth.signOut();
        alert('confimation email sent')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <form className='font-body'>
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
      </div>

      <button type="submit" onClick={onSubmit} className='text-lg text-red-interactive block p-1 pl-3 pr-3 cursor-pointer select-none border-red-interactive border-2 rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center peer-checked:bg-red-interactive peer-checked:text-slate-950 peer-checked:font-bold duration-100'>
        Sign up
      </button>
    </form>
  );
};

export default Signup;