import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import HelloWorldAPIService from '../services/HelloWorldAPIService';


export function WelcomeComponent() {
    const { currentuser } = useParams();

    const [message, setMessage] = useState(null);


    const callHelloWorldRestAPI = async () => {
        const data = await HelloWorldAPIService.getHelloWorldPathVariable("rinseooooo");
        setMessage(data);
    }

    return (
        <div className="Welcome">
            <h1>Welcome {currentuser}</h1>

            <div>
                <input className='btn btn-success m-5' type="button" value="Call Hello World REST API" onClick={callHelloWorldRestAPI} />
            </div>
            <div className='text-info'>
                {message}
            </div>
        </div>
    );
}
