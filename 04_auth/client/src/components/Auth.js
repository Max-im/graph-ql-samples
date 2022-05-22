import React, {useState, useContext} from 'react'
import { useMutation } from '@apollo/client';
import { SIGNUP, LOGIN } from '../mutations/user';
import { hashHistory } from 'react-router';
import { UserUpdateContext} from './App';

export default function Header(props) {
  const setUser = useContext(UserUpdateContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUp, { error : signUpError }] = useMutation(SIGNUP);
  const [login, { error : loginError }] = useMutation(LOGIN);

  const isLogin = props.routeParams.action === 'login';

  // Example Need to return token insead
  const storeUser = ({data}) => {
    setUser(data.login);
    localStorage.setItem('token', JSON.stringify(data.signUp))
    hashHistory.push('/')
  }

  const onSignUp = () => {
    signUp({ variables: { email, password } })
    .then(storeUser);
  }
  
  const onLogin = () => {
    login({ variables: { email, password } })
    .then(storeUser);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(isLogin) onLogin();
    else onSignUp();  
  }

  return (
    <div>
      {signUpError && signUpError.message}
      {loginError && loginError.message}

      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button>{isLogin ? 'Login' : 'Signup' }</button>
      </form>
    </div>
  )
}
