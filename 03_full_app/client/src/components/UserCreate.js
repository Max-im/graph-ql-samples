import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../mutations/user';
import { GET_ALL_USERS } from '../queries/user';

export default function UserCreate() {
  const [newUser, { loading, error }] = useMutation(CREATE_USER);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const createUser = (e) => {
    e.preventDefault();
    
    newUser({ 
      variables: { input: { username, age: Number(age) } },
      refetchQueries: [{ query: GET_ALL_USERS }] 
    })
    
    setUsername('');
    setAge(0);
  };

  return (
    <div>
      {loading && "Loading"}
      {error && error.message}
      <form onSubmit={createUser}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
        <button>Create User</button>
      </form>
    </div>
  );
}
