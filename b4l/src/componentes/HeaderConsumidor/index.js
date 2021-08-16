import React, { useEffect, useState } from 'react';
import ModalUsuario from '../../componentes/ModalEditarUsuarioConsumidor';

import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';
import { ReactComponent as Barril } from '../../assets/logo-barril.svg';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
    const { deslogar, userPersistido } = useAuth();
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState();
    const history = useHistory();

    function logout() {
        deslogar();
        history.push('/loginconsumidor')
    }

    return (
        <div className='header'>
            <img className='imagem' src={banner ? banner : background} alt=''/>
            <div className='logo'>
                <ModalUsuario className='modal' logo={logo} usuario={userPersistido} recarregar={props.recarregar}/>
                <div className='header-text'>
                    <h1>{userPersistido.nome}</h1>
                    <div>
                        <Barril fill="white"/>
                        <p onClick={logout}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
