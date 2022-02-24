import React, { useState, useEffect } from "react";
import { Row, Table, Card, Button, Collapse } from 'react-bootstrap';
import Pagination from "../../components/Pagination";
import { Api } from "../../services/api";
import Filter from "./filter";
import { Link } from "react-router-dom";
import { Alert } from "../../contexts/alert";
import AlertModal from "../../components/Modal";
import axios from 'axios';
import { ResponseHandler } from '../../helpers/responseHandler';
import { Contants } from "../../helpers/constants";

const Users = () => {

    const { entities, numItems, list } = Api('users');
    const context = Alert();
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentFilter, setCurrentFilter ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedId, setSelectedId ] = useState(null);
    const { errorHandler } = ResponseHandler();

    useEffect(() => {
        updateList();
    }, [])

    const handleOnClikPaginator = (event, page) => {
        updateList(currentFilter, page );        
    }

    const applyFilter = (event, filter) => {
        setCurrentFilter(filter);
        updateList(filter);
    }

    const clearFilter = (event) => {
        setCurrentFilter({});
        updateList();
    }

    const updateList = (filter = {}, page = 1) => {
        if (currentPage !== page)
            setCurrentPage(page);

        let params = { ...filter, ...{'page':page}};

        list(params);
    }

    const authorizeChangeStatus = (id) => {        
        setSelectedId(id);
        setShowModal(true);
    }

    const changeStatusDecision = async (event) => {
        if (event.target.attributes.action.value == "confirm" && selectedId) {
            let result = await changeStatus(selectedId);

            if (result.success === true) { 
                context.success('Status changed successfully.');                
            } else {
                context.warning('Status not changed!');
            }
            
            updateList(currentFilter);
        }

        setShowModal(false);
        setSelectedId(null); 
    }

    const changeStatus = async (id) => {
        return axios
            .post(`${Contants.API_URL}api/users/updatestatus/${id}`)
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));
    }

    return (
        <>
            <Link className="btn btn-success" to="/users/form">New Record</Link>
            <Button onClick={() => setOpen(!open)} aria-controls="filter-collapse" aria-expanded={open}>Filter</Button>

            <Collapse in={open}>
                <div id="filter-collapse">
                <Filter apply={applyFilter} clear={clearFilter}></Filter>
                </div>
            </Collapse>

            <Card >
                <Card.Header>List</Card.Header>
                <Card.Body>               

                    <Table striped bordered hover responsive>
                        
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Enabled</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            entities && 
                            entities.map((entity, i) => 
                                <tr key={i}>
                                    <td>{entity.id}</td>
                                    <td>{entity.name}</td>
                                    <td>{entity.email}</td>
                                    <td>{entity.enabled == true ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link className="btn btn-primary" state={{id:entity.id}} to={`/users/form/${entity.id}`}>Edit</Link>
                                        <Button onClick={() => authorizeChangeStatus(entity.id)} variant={entity.enabled == true ? 'danger' : 'success'}>{entity.enabled == true ? 'Disable' : 'Enable'}</Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>

                    <Pagination numItems={numItems} active={currentPage} onClick={handleOnClikPaginator}></Pagination>

                </Card.Body>
            </Card>

            <AlertModal showModal={showModal} title="Change user status!" message="Do you want to change user status?" handleClose={changeStatusDecision}></AlertModal>
        </>
    )

}

export default Users;