import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert as BootstrapAlert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { ResponseHandler } from '../../helpers/responseHandler';
import { Link } from "react-router-dom";

const RequestResetPassword = (props) => {

    const [ initialValues, setInitialValues ] = useState({email: ''});
    const [ show, setShow ] = useState(false);
    const { errorHandler } = ResponseHandler();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Required')
    });

    const doRequest = async (value) => {
        return axios
            .post(`${axios.defaults.baseURL}reset-password`, value)
            .then(function (response) {
                return response.data;

            }.bind(this))
            .catch(errorHandler.bind(this));
    }

    return (
        <Card >
            <Card.Header>Forgot Password</Card.Header>
            <Card.Body>
                {
                    show &&

                    <BootstrapAlert variant={'success'}>
                        <p>A message with instructions for password recovery has been sent to your email.</p>
                    </BootstrapAlert>
                }

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {

                        let result = await doRequest(values);

                        if (result.errors) {
                            actions.setErrors(result.errors);
                        }

                        if (result.success === true) {
                            setShow(true);
                        }

                        actions.setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, handleSubmit, handleChange }) => (

                        <Form onSubmit={handleSubmit}>

                            {
                                errors.validationError &&

                                <BootstrapAlert variant={'danger'}>
                                    {errors.validationError}
                                </BootstrapAlert>
                            }


                            <Row md={12}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="text" placeholder="" name="email" onChange={handleChange} value={values.email} />
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            
                            <Button variant="primary" type={'submit'} disabled={isSubmitting}>Request</Button>
                            <Link to="/login">Back to Login</Link>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )

}

export default RequestResetPassword;