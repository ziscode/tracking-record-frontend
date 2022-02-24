import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert as BootstrapAlert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";

const Login = () => {   
    
    const { Login } = useAuth();
    
    const [ initialValues, setInitialValues] = useState({
        _username: '',
        _password: '',
        _remember_me: true
    });

    const validationSchema = Yup.object().shape({
        _username: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        _password: Yup.string()
            .required('Required'),
        _remember_me: Yup.bool()
    });

    return (
        <Card >
            <Card.Header>Login</Card.Header>
            <Card.Body>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true} 
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {

                        let data = {...values};
                        let result = await Login(data);
                        
                        if (result.errors) {
                            actions.setErrors(result.errors);
                        }

                        if (result.message) {
                            actions.setErrors({validationError:result.message});
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
                                    <Form.Group className="mb-3" controlId="_username">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="text" placeholder="" name="_username" onChange={handleChange} value={values._username}/>
                                        {errors._username && touched._username ? (
                                            <div>{errors._username}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                
                                <Col>
                                    <Form.Group className="mb-3" controlId="_password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="" name="_password" onChange={handleChange} value={values._password}/>
                                        {errors._password && touched._password ? (
                                            <div>{errors._password}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row md={6}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="_remember_me">
                                        <Form.Check type="checkbox" label="Remember me" onChange={handleChange} name="_remember_me" checked={values._remember_me} />
                                        {errors._remember_me && touched._remember_me ? (
                                            <div>{errors._remember_me}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type={'submit'} disabled={isSubmitting}>Submit</Button>
                            <Link to='/requestresetpassword'>Forgot password?</Link>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )

}

export default Login;