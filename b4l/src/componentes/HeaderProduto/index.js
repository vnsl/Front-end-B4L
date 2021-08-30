import React, { useEffect, useState } from 'react';
import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
import Button from '@material-ui/core/Button';

import './index.css';
import useStyles from './styles';

import useAuth from '../../hook/useAuth';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
    const { deslogar, userPersistido, categoriasPersistidas } = useAuth();
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState();
    const history = useHistory();
    const classes = useStyles();

    function atualizarBanner() {
        const filtro = categoriasPersistidas.filter((categoria) => categoria.id ===  userPersistido.restaurante.categoria_id);
        setBanner(filtro[0].img_categoria);
        setLogo(userPersistido.restaurante.imagem);
    }
    useEffect(() => {
        atualizarBanner();
    }, [userPersistido]);

    function logout() {
        deslogar();
        history.push('/');
    }
    

    return (
        <div className='header'>
            <img className='imagem' src={banner ? banner : background} alt=''/>
            <div className='logo'>
                <ModalEditarUsuario className='modal' logo={logo} usuario={userPersistido} recarregar={props.recarregar}/>
                <div className='header-text'>
                    <div>
                        <h1>{userPersistido.restaurante.nome}</h1>
                        <div className="botoes-header">
                            <Button 
                            className={classes.botaoConfirmarPedido} 
                            type="button" 
                            color="secondary" 
                            onClick={() => history.push('/produtos')}
                            >
                            Cardápio
                            </Button>
                            <Button 
                            className={classes.botaoConfirmarPedido} 
                            type="button" 
                            color="secondary" 
                            onClick={() => history.push('/home')}
                            >
                            Pedidos
                            </Button>
                        </div>
                        
                    </div>
                    <p onClick={logout}>Logout</p>
                </div>
            </div>
        </div>
    );
}
