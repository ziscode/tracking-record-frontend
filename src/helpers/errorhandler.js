//import { alertService } from '@/_services';
import { useAuth } from '../contexts/auth';

export function errorHandler(error) {
    try {
        if (error.response) {  
            let response = error.response;
        
            if (response.status == 500) {
                //alertService.error(response.statusText);
            } else if (response.status == 401) {
                //authenticationService.logout();
            } else if (response.status == 403) {
                //alertService.warn(response.data.message);
            } else if (response.status == 400) {
                return response.data.errors;
            }

        
        } else if (error.request) {
            console.log(error.request);
        } else {
            //alertService.error(error.message);            
        }    
    } catch (e) {
        console.log(e);
    }
}