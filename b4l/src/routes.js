import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import React from "react";

import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Produtos from "./paginas/Produtos";

import LoginConsumidor from "./paginas/LoginConsumidor";
import CadastroConsumidor from "./paginas/CadastroConsumidor";
import Restaurantes from "./paginas/Restaurantes";

import { AuthProvider } from './context/AuthContext';
import useAuth from './hook/useAuth';


function RotasProtegidasProprietario(props) {
    const { token, userPersistido } = useAuth();

    return (
        <Route 
            render={() => (token ? props.children : <Redirect to='/' />)}
        />
    );
}

function RotasProtegidasConsumidor(props) {
    const { token } = useAuth();

    return (
        <Route 
            render={() => (token ? props.children : <Redirect to='/loginconsumidor' />)}
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
                    
                    <Route path="/loginconsumidor" exact component={LoginConsumidor}/>  
                    <Route path="/cadastroconsumidor" component={CadastroConsumidor}/>

                    <RotasProtegidasProprietario>
                        <Route path="/restaurantes" exact component={Restaurantes}/>  
                        <Route path="/produtos" exact component={Produtos}/>
                    </RotasProtegidasProprietario>
                    <RotasProtegidasConsumidor>
                    </RotasProtegidasConsumidor>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Routes;