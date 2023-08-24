import { Link } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export function HeaderComponent() {

    // const authContext = useContext(AuthContext);
    // console.log(authContext.number)
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;
    

    const handleLogout = () => {
        authContext.handleLogout();
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <a className='navbar-brand ms-2 fs-2 fw-bold text-black' href="https://start.spring.io/">Spring</a>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {isAuthenticated &&
                                        <Link className='nav-link' to='/welcome/user'>Home</Link>
                                    }
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated &&
                                        <Link className='nav-link' to='/todo'>Todo</Link>
                                    }
                                </li>
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                {!isAuthenticated && 
                                    <Link className='nav-link' to='/login'>Login</Link>
                                }
                            </li>
                            <li className='nav-item'>
                                {isAuthenticated &&
                                    <Link className='nav-link' to='/logout' onClick={handleLogout}>Logout</Link>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
