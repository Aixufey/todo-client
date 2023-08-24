import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export function LoginComponent() {
    const navigate = useNavigate();
    const authContext = useAuth();

    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('');

    const [authenticated, setAuthenticated] = useState(false);
    const [loginAttempted, setLoginAttempted] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        setLoginAttempted(true);
        if (authContext.handleLogin(username, password)) {
            setAuthenticated(true);
            navigate(`/welcome/${username}`);
        } else {
            setAuthenticated(false);
        }
    };

    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={handlePasswordChange} />
                </div>
                <div>
                    <input type="button" value="Login" onClick={handleSubmit} />
                </div>
                {loginAttempted && !authenticated &&
                    <div className="ErrorMessage">Incorrect username or password.</div>}
            </div>
        </div>
    );
}
