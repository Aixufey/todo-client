import { useEffect, useState } from "react";
import TodoAPIService from "../services/TodoAPIService";






export function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([]);
    const getAllTodosByUser = async () => {
        const data = await TodoAPIService.getAllTodosByUser('test');
        console.log(data)
        setTodos(data);
    }

    // static dummy data
    // const todos = [
    //     { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    //     { id: 2, description: "Lean Fullstack", done: false, targetDate: targetDate },
    //     { id: 3, description: "Lean DevOps", done: false, targetDate: targetDate },
    // ];

    useEffect(() => {
        getAllTodosByUser();
    },[])

    const handleDeleteTodo = async (id) => {
        console.log(id);
    }

    return (
        <div className="container">
            <h1>Things to do!</h1>
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
                        {todos.map(
                            (item, key) => (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.done.toString()}</td>
                                    <td>{item.targetDate}</td>
                                    <td><button className="btn btn-warning" onClick={() => handleDeleteTodo(item.id)}>Delete</button></td>
                                </tr>
                            )
                        )}
                        {/* {todos.map(
                            (item, key) => (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.done.toString()}</td>
                                    <td>{item.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
