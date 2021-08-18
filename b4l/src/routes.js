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
import Cardapio from "./paginas/Cardapio";

// import { AuthProvider } from './context/AuthContext';
import useAuth from './hook/useAuth';

function PrivateRoute1({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => localStorage.getItem('TOKEN') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            )
            }
        />
    )
};
function PrivateRoute2({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => localStorage.getItem('TOKEN') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/loginconsumidor',
                        state: { from: props.location }
                    }}
                />
            )
            }
        />
    )
};

    
function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                
                <Route path="/loginconsumidor" exact component={LoginConsumidor}/>  
                <Route path="/cadastroconsumidor" component={CadastroConsumidor}/>

                {/* {consumidor && <Route path="/restaurantes" component={Restaurantes}/>} */}
                {/* {token && <Route path="/produtos" component={Produtos}/>} */}
                <PrivateRoute1 exact path='/produtos' component={Produtos}/>
                <PrivateRoute2 exact path='/restaurantes' component={Restaurantes}/>
                <PrivateRoute2 exact path='/cardapio/:id' component={Cardapio}/>


                {/* <Switch>
                    <RotasProtegidasConsumidor>
                        <Route path="/restaurantes" component={Restaurantes}/>  
                    </RotasProtegidasConsumidor>
                </Switch> */}
                
                {/* <Switch>
                    <RotasProtegidasProprietario>
                        <Route path="/produtos" component={Produtos}/>
                    </RotasProtegidasProprietario>
                </Switch> */}
                
            </Switch>
        </Router>
    )
}

export default Routes;