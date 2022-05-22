import React, { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext, UserUpdateContext } from './App';

export default function Header() {
  const user = useContext(UserContext);
  const setUser = useContext(UserUpdateContext);
  
  const onLogout = () => {
    setUser(null);
  }

  return (
    <header className='container'>
        {user && <button type="button" onClick={onLogout}>Logout</button>}
        {!user && 
          <div>
            <Link to="/auth/signup">
                <button type="button">SignUp</button>
            </Link>
            <Link to="/auth/login">
                <button type="button">Login</button>
            </Link>
          </div>
        }
    </header>
  )
}
