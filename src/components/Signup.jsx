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
    <form className='bg-white'>
      <div>
        <label htmlFor="email-address">Email address</label>
        <input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          label="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </div>

      <button type="submit" onClick={onSubmit}>
        Sign up
      </button>
    </form>
  );
};

export default Signup;