import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {

    return (
        <span>
        <h1>Page not found! (404)</h1><br/>
        <Link to="/">Return</Link>
        </span>
    )

}

export default Error404;