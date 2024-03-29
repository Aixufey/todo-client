import { useEffect, useState } from "react";
import TodoAPIService from "../services/TodoAPIService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";




export function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");

    const authContext = useAuth();
    const currentuser = authContext.currentUser;
    
    const navigate = useNavigate();


    // static dummy data
    // const todos = [
    //     { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    //     { id: 2, description: "Lean Fullstack", done: false, targetDate: targetDate },
    //     { id: 3, description: "Lean DevOps", done: false, targetDate: targetDate },
    // ];



    useEffect(() => {
        const handleGetAllTodos = async () => {
            const data = await TodoAPIService.getAllTodosByUser(currentuser);
            setTodos(data);
        }
        handleGetAllTodos();
    }, [message, currentuser]);


    const handleDeleteTodo = async (id) => {
        console.log(id)
        await TodoAPIService.deleteTodo(currentuser, id)
            .then(
                () => {
                    setMessage('Deleted todo with id '.concat(id));
                }
            ).catch(err => console.log(err));

    }

    /**
     * Redirect to endpoint /todo/id -> <Route path='/todo/:id' element={<TodoComponent />} />
     * Using hook useNavigate.
     * @param {*} id 
     */
    const handleUpdateTodo = async (id) => {
        console.log(id);
        navigate(`/todo/${id}`);
    } 

    /**
     * PUT & POST are being handled in the same endpoint /todo/:id
     * Redirect to endpoint /todo/-1 -> <Route path='/todo/:id' element={<TodoComponent />} />
     * Then conditionally render the form in TodoComponent.jsx
     */
    const handleAddTodo = () => { 
        navigate('/todo/-1');
    }

    return (
        <div className="container">
            <h1>Things to do!</h1>
            {message &&
                <div className="alert alert-warning">{message}</div>
            }
            <div>
                Todo details
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                (item, key) => (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>{item.description}</td>
                                        <td>{item.done.toString()}</td>
                                        <td>{item.targetDate}</td>
                                        <td><button className="btn btn-warning" onClick={() => handleDeleteTodo(item.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => handleUpdateTodo(item.id)}>Update</button></td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={handleAddTodo}>Add New Todo</div>
        </div>
    );
}
