import { createContext, useState} from 'react'
import Header from "./Header";

export const UserContext = createContext({});
export const UserUpdateContext = createContext({});

function App({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        <Header />
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
