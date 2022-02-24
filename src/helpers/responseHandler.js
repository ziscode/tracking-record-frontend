import React, { useEffect, useState } from 'react';
import { Alert } from '../contexts/alert';

export const ResponseHandler = () => {
    
    const alert = Alert();
    const [ sessionExpired, setSessionExpired ] = useState(false);

    const errorHandler = (error) => {

        try {
            if (error.response) {  
                let response = error.response;
            
                if (response.status == 500) {
                    alert.error(response.statusText);
                } else if (response.status == 401) {
                    alert.warning('User session expired.');
                    setSessionExpired(true);
                } else if (response.status == 403) {
                    alert.warning('Access denied!');
                } else if (response.status == 400) {
                    return response.data.errors;
                }
            
            } else if (error.request) {
                console.log(error.request);
            } else {
                alert.error(error.message);
            }    
        } catch (e) {
            console.log(e);
        }
        
    }

    return {
        errorHandler,
        sessionExpired
    }
}

    
