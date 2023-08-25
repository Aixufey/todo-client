import axios from 'axios';








const TodoAPIService = (
    () => {
        const todoApiClient = axios.create(
            {
                baseURL: 'http://localhost:8080'
            }
        );
        const todoApiEndpoints = {
            allTodosByUsername: '/users/{username}/todos',
            deleteTodo: '/users/{username}/todos/{id}',
            getById: '/users/{username}/todos/{id}',
        };

        const getAllTodosByUser = async (username) => {
            try {
                const response = await todoApiClient.get(todoApiEndpoints.allTodosByUsername.replace("{username}", username));
                console.log(response.data)
                return response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const getToDoById = async (username, id) => {
            try {
                const response = await todoApiClient.get(todoApiEndpoints.getById.replace("{username}", username).replace("{id}", id));
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const deleteTodo = async (username, id) => {
            try {
                const response = await todoApiClient.delete(todoApiEndpoints.deleteTodo.replace("{username}", username).replace("{id}", id));
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        };


        return {
            getAllTodosByUser,
            deleteTodo,
            getToDoById,
        }
    }

)();
export default TodoAPIService;