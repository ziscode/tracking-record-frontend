import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert as BootstrapAlert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { ResponseHandler } from '../../helpers/responseHandler';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const ResetPassword = (props) => {

    const { key } = useParams();
    const [initialValues, setInitialValues] = useState({ plainPassword: '', repeatedPassword: '' });
    const [show, setShow] = useState(false);
    const { errorHandler } = ResponseHandler();

    const validationSchema = Yup.object().shape({
        plainPassword: Yup.string()
            .min(8)
            .required('Required'),
        repeatedPassword: Yup.string()
            .min(8)
            .required('Required')
            .oneOf([Yup.ref('plainPassword'), null], 'Passwords must match')
    });

    const doRequest = async (value) => {
        return axios
            .post(`${axios.defaults.baseURL}reset-password/reset/${key}`, value)
            .then(function (response) {
                return response.data;

            }.bind(this))
            .catch(errorHandler.bind(this));
    }

    return (
        <Card >
            <Card.Header>Login</Card.Header>
            <Card.Body>
                {
                    show &&

                    <BootstrapAlert variant={'success'}>
                        <p>Password changed successfully! Return to the Login page.</p>
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
                                    <Form.Group className="mb-3" controlId="plainPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="" name="plainPassword" onChange={handleChange} value={values.plainPassword} />
                                        {errors.plainPassword && touched.plainPassword ? (
                                            <div>{errors.plainPassword}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Row md={12}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="repeatedPassword">
                                        <Form.Label>Retype password</Form.Label>
                                        <Form.Control type="password" placeholder="" name="repeatedPassword" onChange={handleChange} value={values.repeatedPassword} />
                                        {errors.repeatedPassword && touched.repeatedPassword ? (
                                            <div>{errors.repeatedPassword}</div>
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

export default ResetPassword;