import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

const TrackingRecordFilter = (props) => {

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
                    <Row md={6}>
                        <Col>
                            <Form.Group className="mb-3" controlId="deviceId">
                                <Form.Label>Device ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter device id" name="deviceId"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="startDate">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control type="date" placeholder="Enter start date" name="startDate"/>
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

TrackingRecordFilter.propTypes = {
    apply: PropTypes.func,
    clear: PropTypes.func
}

TrackingRecordFilter.defaultProps = {
    apply: () => {},
    clear: () => {}
}

export default TrackingRecordFilter;