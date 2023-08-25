import TodoAPIService from "../services/TodoAPIService"
import { useParams } from "react-router-dom"
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";


import { Formik, Form, Field, ErrorMessage } from 'formik';


export default function TodoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const currentUser = authContext.currentUser;

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(() => {
        const getById = async () => {
            const data = await TodoAPIService.getToDoById(currentUser, id);
            setDescription(data.description)
            setTargetDate(data.targetDate)
        }
        getById();
    }, [currentUser, id])
    
    /**
     * 
     * @param {*} Submitted values are passed to this function from Formik
     */
    const handleSubmit = (submittedVal) => {
        console.log(submittedVal)
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}>
                    {
                        () => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" name="description" className="form-control" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" name="targetDate" className="form-control" />
                                </fieldset>
                                <div>
                                    <input className="btn btn-success" type="submit" value="Save" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}