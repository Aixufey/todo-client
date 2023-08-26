import TodoAPIService from "../services/TodoAPIService"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";


import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from "moment/moment";


export default function TodoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();
    const currentUser = authContext.currentUser;

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')



    useEffect(() => {
        if (id !== '-1') {
            const getById = async () => {
                const data = await TodoAPIService.getToDoById(currentUser, id);
                setDescription(data.description)
                setTargetDate(data.targetDate)
            }
            getById();
        }
    }, [currentUser, id])

    /**
     * 
     * @param {*} Submitted values are passed to this function from Formik
     */
    const handleSubmit = async (submittedVal) => {
        // const { description, targetDate } = submittedVal; // submittedVal is returned as an object
        console.log(submittedVal)
        const jsonBody = {
            id: id,
            username: currentUser,
            description: submittedVal.description,
            targetDate: submittedVal.targetDate,
            done: false
        }

        if (id === '-1') {
            const data = await TodoAPIService.createTodo(currentUser, jsonBody);
            if (data) {
                navigate('/todo')
            }
        } else {
            const data = await TodoAPIService.updateTodo(currentUser, id, jsonBody);
            if (data) {
                navigate('/todo')
            }
        }
    }


    const handleValidate = (submittedVal) => {
        const selectedDate = moment(submittedVal.targetDate)
        const currentDate = moment();
        const isPast = selectedDate.isBefore(currentDate, 'day');
        console.log(isPast)
        let errors = {
            // description: 'Invalid description',
            // targetDate: 'Invalid target date'
        }
        if (submittedVal.description.length < 5) {
            errors.description = 'Description should be at least 5 characters long'
        }

        if (submittedVal.targetDate === '' || submittedVal.targetDate === null || isPast) {
            errors.targetDate = 'Enter a valid target date'
        }

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                    validate={handleValidate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >

                    {
                        () => (
                            <Form>

                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

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