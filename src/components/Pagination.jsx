import React, { useState, useEffect } from 'react';
import { Pagination as BtPagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const [ active, setActive ] = useState(1);
    const [ numPages, setNumPages ] = useState(0);
    const maxPageItems = 10;
    
    const handleOnClick = (event) => {
        let value = parseInt(event.currentTarget.attributes.page.value);
        setActive(value);
        props.onClick(event, value);
    }

    const createItems = () => {
        let np = props.numItems > 0 ? Math.ceil(props.numItems / props.limitPerPage) : 0;
        
        if (np !== numPages)
            setNumPages(np);

        if (props.active !== active)
            setActive(props.active);
        
        if (active == 0)
            return;

        let items = [];
        let min = active%maxPageItems == 0 ? (active - active%maxPageItems -maxPageItems ) + 1 : (active - active%maxPageItems)+1;
        let max = (min + maxPageItems) -1 > numPages ? numPages : (min + maxPageItems) -1;

        if (active > maxPageItems) {
            items.push(<BtPagination.First page={1} key={1} onClick={handleOnClick}/>);
        }

        if (active > 1) {
            items.push(<BtPagination.Prev page={active-1} key={min-1} onClick={handleOnClick} />);            
        }

        if (active > maxPageItems) {
            items.push(<BtPagination.Ellipsis page={min-maxPageItems} key={min-2} onClick={handleOnClick} />);
        }

        for (let number = min; number <= max; number++) {
            items.push(
                <BtPagination.Item key={number} page={number} active={number === active} onClick={handleOnClick}>
                    {number}
                </BtPagination.Item>
            )
        }

        if (max < numPages) {
            items.push(<BtPagination.Ellipsis page={max+1} key={max+2} onClick={handleOnClick} />); 
        }

        if (active < numPages) {            
            items.push(<BtPagination.Next page={active+1} key={max+1} onClick={handleOnClick}/>);
        }

        if (max < numPages) {
            items.push(<BtPagination.Last page={numPages} key={numPages} onClick={handleOnClick}/>);
        }

        return items;
    }
    

    return (
        <BtPagination>

            { createItems() }
            
        </BtPagination>
    )
}

Pagination.propTypes = {
    numItems: PropTypes.number,
    limitPerPage: PropTypes.number,
    active: PropTypes.number,
    onClick: PropTypes.func
};
Pagination.defaultProps = {
    numItems: 0,
    limitPerPage: 10,
    active: 0,
    onClick: (event, page) => {}
};

export default Pagination;