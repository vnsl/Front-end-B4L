import React, { useEffect, useState } from 'react';
import ModalLogo from '../../componentes/ModalLogoRestaurante';

import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
    const { deslogar } = useAuth();
    const history = useHistory();

    function logout() {
        deslogar();
        history.push('/loginconsumidor');
    }

    const banner = props.restaurante.img_categoria ? props.restaurante.img_categoria : background;
    const logo = props.restaurante.imagem ? props.restaurante.imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg';
    
    return (
        <div className='header'>
            <img className='imagem' src={banner} alt=''/>
            <div className='logo'>
                <img 
                    className='logo' 
                    // src={props.logo ?? novo} 
                    src={logo} 
                    alt="" 
                />
                <div className='header-text'>
                    <h1>{props.restaurante.nome}</h1>
                    <p onClick={logout}>Logout</p>
                </div>
            </div>
        </div>
    );
}
