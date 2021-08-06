import React from 'react';
import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';

export default function Header() {
    const { deslogar } = useAuth();

    return (
        <div className='header'>
                <img className='imagem' src={background} alt="" />
                <div className='logo'>
                    <div>
                        <ModalEditarUsuario className='modal'/>
                    </div>
                    <div className='header-text'>
                        <h1>Pizza Pizzaria & Delivery</h1>
                        <p onClick={deslogar}>Logout</p>
                    </div>
                </div>
            </div>
    );
}
