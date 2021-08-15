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

// import { AuthProvider } from './context/AuthContext';
import useAuth from './hook/useAuth';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => localStorage.getItem('token') ? (
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
    const { token, consumidor } = useAuth();

    function RotasProtegidasProprietario(props) {
        // const { token } = useAuth();
    
        return (
            // <Route 
            //     render={() => (token ? props.children : <Redirect to='/' />)}
            // />
            token ? <Route path="/produtos" component={Produtos}/> : <Redirect to='/'/>
        );
    }
    
    function RotasProtegidasConsumidor(props) {
        
        return (
            // <Route 
            // render={() => (token ? props.children : <Redirect to='/loginconsumidor' />)}
            // />
            consumidor ? props.children : <Redirect to='/loginconsumidor' />
        );
        }

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                
                <Route path="/loginconsumidor" exact component={LoginConsumidor}/>  
                <Route path="/cadastroconsumidor" component={CadastroConsumidor}/>

                {/* {consumidor && <Route path="/restaurantes" component={Restaurantes}/>} */}
                {/* {token && <Route path="/produtos" component={Produtos}/>} */}

                <PrivateRoute exact path='/restaurantes' component={Restaurantes}/>

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