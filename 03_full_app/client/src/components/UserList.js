import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../queries/user';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
  
  useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])
  
    return (
    <div>
      {error && error.message}

      {users.map(({ id, username, age }) => (
        <div key={id}>
          {username}
          {' - '}
          {age}
        </div>
      ))}
    </div>
  );
}
