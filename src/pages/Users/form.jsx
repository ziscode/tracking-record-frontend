import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Alert as BootstrapAlert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Api } from "../../services/api";
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from "../../contexts/alert";
import axios from 'axios';
import { ResponseHandler } from '../../helpers/responseHandler';
import { Contants } from "../../helpers/constants";

const UsersForm = (props) => {
    
    const context = Alert();
    const { find } = Api('users');
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state && location.state.id;
    const { errorHandler } = ResponseHandler();

    const [ initialValues, setInitialValues] = useState({
        id: null,
        name: '',
        email: '',
        plainPassword: ''
    });

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable().positive().integer(),
        name: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        plainPassword: Yup.string()
            .min(8)
            .when("id", {
                is: null,
                then: Yup.string().required("Must enter password")
              })
    });

    useEffect(() => {
        if (id) 
            retrieve();
    },[])

    const retrieve = async () => {
        let data = await find(id);
        data['plainPassword'] = '';
        setInitialValues(data);
    }

    const save = async (data = {}) => {

        return axios
            .post(`${Contants.API_URL}api/register`, JSON.stringify(data))
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    return (
        <Card >
            <Card.Header>Form</Card.Header>
            <Card.Body>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true} 
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {

                        let data = {...values};

                        if (data.plainPassword === "")
                            data.plainPassword = null;

                        let result = await save(data);
                        
                        if (result.errors) {
                            actions.setErrors(result.errors);
                        } else {
                            context.success((id ? 'Record updated successfully.' : 'Record created successfully.'))
                            navigate(-1);
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
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="" name="name" onChange={handleChange} value={values.name}/>
                                        {errors.name && touched.name ? (
                                            <div>{errors.name}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="email" placeholder="" name="email" onChange={handleChange} value={values.email}/>
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="plainPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="" name="plainPassword" onChange={handleChange} value={values.password}/>
                                        {errors.plainPassword && touched.plainPassword ? (
                                            <div>{errors.plainPassword}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type={'submit'} disabled={isSubmitting}>Submit</Button>
                            <Button variant="secondary" onClick={() => navigate(-1)} >Cancel</Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )

}

export default UsersForm;