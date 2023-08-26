import React, {useContext} from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../App.css';
import { UserContext } from '../context/UserContext';
import { auth } from '../util/firebase';
import { signOut } from 'firebase/auth';

export default function NavBar() {
  const currentUser = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth)
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <nav className="flex justify-between mb-4 font-body lg:pl-14 lg:pr-14 pt-4">
      <Link to='/' className='text-white text-lg'>
        B.T.C. Recipe Book
      </Link>

      <ul>
        {currentUser ? (
          <div className='flex gap-5 text-lg'>
            <div className='text-red-interactive'>
              <p>{currentUser.email}</p>
            </div>
            <button onClick={handleLogout} className='text-red-interactive'>
              Logout
            </button>
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
