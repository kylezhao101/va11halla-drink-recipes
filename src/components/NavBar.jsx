import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../App.css';
import { auth } from '../util/firebase';

export default function NavBar() {
  const user = auth.currentUser;
  console.log(user)
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  }

  return (
    <nav className="flex justify-between items-center mb-4 font-body lg:pl-14 lg:pr-14 pt-4">
      <Link to='/' className='text-white text-lg'>
        B.T.C. Recipe Book
      </Link>

      <ul>
        {user ? (
          <div className='text-red-interactive text-lg'>
            {user.email}
          </div>
        ) : (
          <CustomLink to="/authPage" className="text-red-interactive text-lg mr-4">Login/Signup</CustomLink>
        )}
      </ul>

    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
