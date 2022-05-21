import React from 'react';
import UserList from './UserList';
import UserCreate from './UserCreate';

const App = () => {
    return (
        <div>
            <UserCreate />
            <UserList />
        </div>
    );
};

export default App;