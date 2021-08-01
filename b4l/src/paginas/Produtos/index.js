import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
import CardMarket from '../../componentes/Card';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderProduto';

function Produtos() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const history = useHistory();

    useEffect(() => {
      setCarregar(false);
  
      async function carregarProdutos() {
        try {
          setCarregando(true);
          setErro('');
  
          const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        
          const dados = await resposta.json();
        
          setCarregando(false);
          
          if (!resposta.ok) {
            setErro(dados);
            return;
          };
  
          if (erro) {
            setErro(dados);
            return;
          }
          
          setProdutos(dados);
          if(dados.length === 0) {
            history.push('/produtos2')
          }
        } catch (error) {
          setErro(error.message);
        }
      }
  
      carregarProdutos();
    }, [token, carregar]);

    return (
        <div className='content'>
            {carregando && <Loading/>}
            <Header></Header>
                <div className='container-produtos'>
                  <div style={produtos.length !== 0 ? {display:'none'} : {display:'contents'}}>
                    <p>Você não tem nenhum produto no seu cardápio.</p>
                    <p>Gostaria de adicionar um novo produto.</p>
                  </div>
                    <CustomModal className='modal' acao='Novo produto' recarregar={() => setCarregar(true)}/>
                    <div className='cards'>
                        {produtos.map(produto => <CardMarket produto={produto} recarregar={() => setCarregar(true)}/>)}
                    </div>
                </div>

        </div>
    )
    
}

export default Produtos;