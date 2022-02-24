import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Api } from "../../services/api";
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from "../../contexts/alert";

const TrackingRecordForm = (props) => {
    
    const context = Alert();
    const { save, find } = Api('trackingrecord');
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state && location.state.id;

    const [ initialValues, setInitialValues] = useState({
        startDate: '',
        endDate: '',
        startLatitude: '',
        startLongitude: '',
        endLatitude: '',
        endLongitude: '',
        finished: true,
    });

    const validationSchema = Yup.object().shape({
        startDate: Yup.date()
            .required('Required'),
        endDate: Yup.date()
            .required('Required'),        
        startLatitude: Yup.number()
            .min(-90, 'Too Short!')
            .max(90, 'Too Long!')
            .required('Required'),
        startLongitude: Yup.number()
            .min(-180, 'Too Short!')
            .max(180, 'Too Long!')
            .required('Required'),
        endLatitude: Yup.number()
            .min(-90, 'Too Short!')
            .max(90, 'Too Long!')
            .required('Required'),
        endLongitude: Yup.number()
            .min(-180, 'Too Short!')
            .max(180, 'Too Long!')
            .required('Required'),
        finished: Yup.bool()
    });

    useEffect(() => {
        if (id) 
            retrieve();
    },[])

    const retrieve = async () => {
        let data = await find(id);
        data.startDate = data.startDate.replace(' ', 'T');
        data.endDate = data.endDate.replace(' ', 'T');
        setInitialValues(data);
    }

    return (
        <Card >
            <Card.Header>Form</Card.Header>
            <Card.Body>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true} 
                    onValidationError={errorValues => {
                       console.log(errorValues)
                     }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {

                        let data = {...values};
                        data.startDate = data.startDate.replace('T', ' ');
                        data.endDate = data.endDate.replace('T', ' ');

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

                            <Row md={12}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="startDate">
                                        <Form.Label>Start date</Form.Label>
                                        <Form.Control type="datetime-local" placeholder="" name="startDate" onChange={handleChange} value={values.startDate}/>
                                        {errors.startDate && touched.startDate ? (
                                            <div>{errors.startDate}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="endDate">
                                        <Form.Label>Start date</Form.Label>
                                        <Form.Control type="datetime-local" placeholder="" name="endDate" onChange={handleChange} value={values.endDate}/>
                                        {errors.endDate && touched.endDate ? (
                                            <div>{errors.endDate}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row md={12}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="startLatitude">
                                        <Form.Label>Start latitude</Form.Label>
                                        <Form.Control type="number" placeholder="" name="startLatitude" onChange={handleChange} value={values.startLatitude}/>
                                        {errors.startLatitude && touched.startLatitude ? (
                                            <div>{errors.startLatitude}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="startLongitude">
                                        <Form.Label>Start longitude</Form.Label>
                                        <Form.Control type="number" placeholder="" name="startLongitude" onChange={handleChange} value={values.startLongitude}/>
                                        {errors.startLongitude && touched.startLongitude ? (
                                            <div>{errors.startLongitude}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="endLatitude">
                                        <Form.Label>End latitude</Form.Label>
                                        <Form.Control type="number" placeholder="" name="endLatitude" onChange={handleChange} value={values.endLatitude}/>
                                        {errors.endLatitude && touched.endLatitude ? (
                                            <div>{errors.endLatitude}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="endLongitude">
                                        <Form.Label>End longitude</Form.Label>
                                        <Form.Control type="number" placeholder="" name="endLongitude" onChange={handleChange} value={values.endLongitude}/>
                                        {errors.endLongitude && touched.endLongitude ? (
                                            <div>{errors.endLongitude}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row md={6}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="finished">
                                        <Form.Check type="checkbox" label="Finished?" onChange={handleChange} name="finished" checked={values.finished} />
                                        {errors.finished && touched.finished ? (
                                            <div>{errors.finished}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type={'submit'} disabled={isSubmitting}>Submit</Button>
                            <Button variant="default" onClick={() => navigate(-1)} >Cancel</Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )

}

export default TrackingRecordForm;