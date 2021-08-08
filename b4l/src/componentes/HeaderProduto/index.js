import React, { useEffect, useState } from 'react';
import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';

import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';

export default function Header(props) {
    const { deslogar, userPersistido, categoriasPersistidas } = useAuth();
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState('');

    function atualizarBanner() {
        const filtro = categoriasPersistidas.filter((categoria) => categoria.id ===  userPersistido.restaurante.categoria_id);
        setBanner(filtro[0].img_categoria);
        setLogo(userPersistido.restaurante.imagem);
    }
    useEffect(() => {
        atualizarBanner();
    }, []);

    return (
        <div className='header'>
            <img className='imagem' src={banner ? banner : background} alt=''/>
            <div className='logo'>
                {/* <img className='logo' src={logo ? logo : novo} alt=''/> */}
                <ModalEditarUsuario className='modal' usuario={userPersistido} recarregar={props.recarregar}/>
                <div className='header-text'>
                    <h1>{userPersistido.restaurante.nome}</h1>
                    <p onClick={deslogar}>Logout</p>
                </div>
            </div>
        </div>
    );
}
