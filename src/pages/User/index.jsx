import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Alert as BootstrapAlert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from "../../contexts/alert";
import axios from 'axios';
import { ResponseHandler } from '../../helpers/responseHandler';
import { Contants } from "../../helpers/constants";

const User = (props) => {

  const context = Alert();
  const navigate = useNavigate();
  const { errorHandler } = ResponseHandler();

  const [initialValues, setInitialValues] = useState({
    id: null,
    name: '',
    email: '',
    plainPassword: '',
  });

  const validationSchema = Yup.object().shape({
    id: Yup.number().nullable().positive().integer(),
    name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    plainPassword: Yup.string()
      .min(8),
    repeatedPassword: Yup.string()
      .min(8)
      .oneOf([Yup.ref('plainPassword'), null, ''], 'Passwords must match')
  });

  useEffect(() => {
    if (initialValues.id === null)
      retrieve();
  })

  const retrieve = async () => {

    let data = await axios
      .post(`${axios.defaults.baseURL}api/retrieve/profile`)
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      }.bind(this))
      .catch(errorHandler.bind(this));

    data['plainPassword'] = '';
    data['repeatedPassword'] = '';
    setInitialValues(data);
  }

  const save = async (data = {}) => {

    return axios
      .post(`${Contants.API_URL}api/update/profile`, JSON.stringify(data))
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

            let data = { ...values };

            if (data.plainPassword === "")
              data.plainPassword = null;

            if (data.repeatedPassword === "")
              data.repeatedPassword = null;

            let result = await save(data);

            if (result.errors) {
              actions.setErrors(result.errors);
            } else {
              context.success('Profile updated successfully.')
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
                    <Form.Control type="text" placeholder="" name="name" onChange={handleChange} value={values.name} />
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="" name="email" onChange={handleChange} value={values.email} />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </Form.Group>
                </Col>

              </Row>

              <Row md={12}>
                <Col>
                  <Form.Group className="mb-3" controlId="plainPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="" name="plainPassword" onChange={handleChange} value={values.password} />
                    {errors.plainPassword && touched.plainPassword ? (
                      <div>{errors.plainPassword}</div>
                    ) : null}
                  </Form.Group>
                </Col>
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

              <Button variant="primary" type={'submit'} disabled={isSubmitting}>Submit</Button>
              <Link to="/" className="btn btn-secondary">Cancel</Link>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )

}

export default User;