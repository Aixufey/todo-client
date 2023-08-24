import './ToDoApp.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { LogoutComponent } from './LogoutComponent';
import { FooterComponent } from './FooterComponent';
import { HeaderComponent } from './HeaderComponent';
import { NotFoundComponent } from './NotFoundComponent';
import { WelcomeComponent } from './WelcomeComponent';
import { ListTodosComponent } from './ListTodosComponent';
import { LoginComponent } from './LoginComponent';
import AuthProvider, { useAuth } from '../security/AuthContext';


/**
 * Protecting the routes
 * @returns all children only if the user is authenticated otherwise redirect to login page
 */
function AuthenticatedRoute({ children }) {
    const authContext = useAuth();
    if (authContext.isAuthenticated)
        return children;
    return <Navigate to='/' />
}


export default function ToDoApp() {
    return (
        <div className="ToDoApp">
            <AuthProvider>

                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='*' element={<NotFoundComponent />} />
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />


                        <Route path='/welcome/:currentuser' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todo' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                    </Routes>
                    <FooterComponent />
                </BrowserRouter>

            </AuthProvider>
        </div>
    )
}



