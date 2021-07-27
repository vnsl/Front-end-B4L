import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import React from "react";
import Login from "./paginas/Login";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
            </Switch>
        </Router>
    )
}

export default Routes;