import React, { useEffect, useState } from 'react';
import ModalLogo from '../../componentes/ModalLogoRestaurante';

import './index.css';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
    const { deslogar } = useAuth();
    const [banner, setBanner] = useState('');
    const history = useHistory();
    const [allCategorias, setAllCategorias] = useState([]);

    let imagemBanner = [];

    /* async function listarCategorias() {
        const resposta = await fetch('http://localhost:3000/categorias', {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            }
        });

        const categorias = await resposta.json();
        console.log(categorias);
        setAllCategorias(categorias);
        const filtro = categorias.filter((categoria) => categoria.id === props.restaurante.categoria_id);
        imagemBanner = filtro[0].img_categoria;
        };    

    useEffect(() => {
        listarCategorias();
    }, []); */

    
    function logout() {
        deslogar();
        history.push('/');
    }

    console.log(props.restaurante);
    // const imgBanner = banner ? banner : background
    const logo = props.restaurante.imagem ? props.restaurante.imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg'
    
    return (
        <div className='header'>
            <img className='imagem' src={background} alt=''/>
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
