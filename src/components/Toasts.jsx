import React, { useState, useEffect } from "react";
import { ToastContainer, Toast } from "react-bootstrap";

const Toasts = (props) => {
    const [show, setShow] = useState(true);
    const { toastList } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    const deleteToast = id => { 
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <ToastContainer position="top-end" className="p-2" style={{zIndex:9999}}>
        {
            list.map((item, id) =>
                <Toast key={item.id} onClose={() => { deleteToast(item.id); }} style={{backgroundColor:item.backgroundColor, color:item.color}} show={true} delay={3000} autohide>
                    <Toast.Header style={{backgroundColor:item.backgroundColor, color:item.color}} closeVariant={item.color === '#ffffff' ? 'white' : undefined}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" style={{color:item.color}} />
                        <strong className="me-auto">{item.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{item.description}</Toast.Body>
                </Toast>)
        }
        </ToastContainer>
    )

}

export default Toasts;