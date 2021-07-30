import React from 'react';
import CustomModal from '../../componentes/Modal';
import './styles.js';
import './index.css';

import Header from '../../componentes/HeaderProduto';

function Produtos() {
    return (
        <div className='content'>
            <Header></Header>
            <div className='container-produtos'>
                <p>Você não tem nenhum produto no seu cardápio.</p>
                <p>Gostaria de adicionar um novo produto.</p>
                <CustomModal/>
            </div>
        </div>
    )
    
}

export default Produtos;