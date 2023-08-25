import TodoAPIService from "../services/TodoAPIService"
import { useParams } from "react-router-dom"
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";



export default function TodoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const currentUser = authContext.currentUser;

    const [description, setDescription] = useState('')

    useEffect(() => {
        const getById = async () => {
            const data = await TodoAPIService.getToDoById(currentUser, id);
            setDescription(data.description)
        }
        getById();
    }, [currentUser, id])


    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                Description: {description}
            </div>
        </div>
    )
}