import axios from 'axios';




const HelloWorldAPIService = (

    () => {
        const helloWorldApiClient = axios.create(
            {
                baseURL: 'http://localhost:8080'
            }
        )
        const helloWorldApiEndpoints = {
            helloWorld: '/hello-world',
            helloWorldbean: '/hello-world-bean',
            helloWorldPathVariable: '/hello-world/path-variable/{name}'
        }

        async function getHelloWorldBean() {
            await helloWorldApiClient.get(helloWorldApiEndpoints.helloWorldbean)
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
        }

        const getHelloWorld = async () => {
            try {
                const response = await helloWorldApiClient.get(helloWorldApiEndpoints.helloWorld);
                console.log(response.data)
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const getHelloWorldPathVariable = async (username) => {
            try {
                const response = await helloWorldApiClient.get(helloWorldApiEndpoints.helloWorldPathVariable.replace("{name}", username));
                return response.data.message;
            } catch (error) {
                console.log(error);
            }
        }

        return {
            getHelloWorld,
            getHelloWorldBean,
            getHelloWorldPathVariable
        }

    }

)();

export default HelloWorldAPIService;