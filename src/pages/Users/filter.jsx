import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

const Filter = (props) => {

    const handleOnSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        let object = {};

        formData.forEach(function(value, key){
            object[key] = value;
        });
        
        props.apply(event, object);
    }

    const handleOnClickClear = (event) => {
        document.querySelector('form').reset();
        props.clear(event);
    }

    return (
        
        <Card >
            <Card.Header>Filter</Card.Header>
            <Card.Body>
                <Form onSubmit={handleOnSubmit}>
                    <Row md={12}>
                        <Col>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter user name" name="name"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="text" placeholder="Enter user e-mail" name="email"/>
                            </Form.Group>
                        </Col>
                    </Row> 
                
                    <Button variant="secondary" onClick={handleOnClickClear}>Clear</Button>
                    <Button variant="primary" type={'submit'}>Apply</Button>
                    
                </Form>
            </Card.Body>
        </Card>

    )

}

Filter.propTypes = {
    apply: PropTypes.func,
    clear: PropTypes.func
}

Filter.defaultProps = {
    apply: () => {},
    clear: () => {}
}

export default Filter;