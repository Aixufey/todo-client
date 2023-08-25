
// 1. Create Context
import { createContext, useState, useContext } from 'react';
export const AuthContext = createContext();


// 2. Share the context as Hook 
export const useAuth = () => useContext(AuthContext);


export default function AuthProvider({ children }) {
    // 3. Put some state in the context    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Provide the current logged in user
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = (username, password) => {
        if (username === 'user' && password === 'test') {
            setIsAuthenticated(true);
            setCurrentUser(username);
            return true;
        } else {
            setIsAuthenticated(false);
            setCurrentUser(null);
            return false;
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false);
    }


    // Provide the values as object
    const provideAsObject = {
        isAuthenticated,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={{ provideAsObject, isAuthenticated, handleLogin, handleLogout, currentUser } }>
            {children}
        </AuthContext.Provider>
    )
}
