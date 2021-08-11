import React, { useEffect, useState } from 'react';
import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';

import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';
import { ReactComponent as Barril } from '../../assets/logo-barril.svg';

export default function Header(props) {
    const { deslogar, userPersistido } = useAuth();
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState();

    return (
        <div className='header'>
            <img className='imagem' src={banner ? banner : background} alt=''/>
            <div className='logo'>
                {/* <ModalEditarUsuario className='modal' logo={logo} usuario={userPersistido} recarregar={props.recarregar}/> */}
                <div className='header-text'>
                    {/* <h1>{userPersistido.nome}</h1> */}
                    <h1>José</h1>
                    <div>
                        <Barril fill="white"/>
                        <p onClick={deslogar}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
