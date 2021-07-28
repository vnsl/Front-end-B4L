import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import React from "react";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";

import { AuthProvider } from './context/AuthContext';
import useAuth from './hook/useAuth';

function RotasProtegidas(props) {
    const { token } = useAuth();

    return (
        <Route 
            render={() => (token ? props.children : <Redirect to='/' />)}
        />
    );
}

function Routes() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/cadastro" component={Cadastro}/>

                    <RotasProtegidas>
                        <Route path="/perfil" exact component={Login}/>
                    </RotasProtegidas>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Routes;