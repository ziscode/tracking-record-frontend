import React, { useState, useEffect } from "react";
import { Row, Table, Card, Button, Collapse } from 'react-bootstrap';
import Pagination from "../../components/Pagination";
import { Api } from "../../services/api";
import moment from 'moment';
import TrackingRecordFilter from "./filter";
import { Link } from "react-router-dom";
import { Alert } from "../../contexts/alert";
import AlertModal from "../../components/Modal";

const TrackingRecordIndex = () => {

    const { entities, numItems, list, remove } = Api('trackingrecord');
    const context = Alert();
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentFilter, setCurrentFilter ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ selectedId, setSelectedId ] = useState(null);

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

    const authorizeDeletion = (id) => {        
        setSelectedId(id);
        setShowDeleteModal(true);
    }

    const deleteDecision = async (event) => {
        if (event.target.attributes.action.value == "confirm" && selectedId) {
            let result = await remove(selectedId);

            if (result.success === true) { 
                context.success('Record deleted successfully.');
                updateList(currentFilter);
            }
        }

        setShowDeleteModal(false);
        setSelectedId(null); 
    }

    return (
        <>
            <Link className="btn btn-success" to="/trackingrecord/form">New Record</Link>
            <Button onClick={() => setOpen(!open)} aria-controls="filter-collapse" aria-expanded={open}>Filter</Button>

            <Collapse in={open}>
                <div id="filter-collapse">
                <TrackingRecordFilter apply={applyFilter} clear={clearFilter}></TrackingRecordFilter>
                </div>
            </Collapse>

            <Card >
                <Card.Header>List</Card.Header>
                <Card.Body>               

                    <Table striped bordered hover responsive>
                        
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Device ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Finished</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            entities && 
                            entities.map((entity, i) => 
                                <tr key={i}>
                                    <td>{entity.id}</td>
                                    <td>{entity.deviceId}</td>
                                    <td>{moment(entity.startDate).format("YYYY-MM-DD HH:mm")}</td>
                                    <td>{moment(entity.endDate).format("YYYY-MM-DD HH:mm")}</td>
                                    <td>{entity.finished == true ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link className="btn btn-primary" state={{id:entity.id}} to={`/trackingrecord/form/${entity.id}`}>Edit</Link>
                                        <Button onClick={() => authorizeDeletion(entity.id)} variant={'danger'}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>

                    <Pagination numItems={numItems} active={currentPage} onClick={handleOnClikPaginator}></Pagination>

                </Card.Body>
            </Card>

            <AlertModal showModal={showDeleteModal} title="Delete record!" message="Do you want to delete this record?" handleClose={deleteDecision}></AlertModal>
        </>
    )

}

export default TrackingRecordIndex;