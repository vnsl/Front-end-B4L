import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
import CardMarket from '../../componentes/Card';
import useAuth from '../../hook/useAuth';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderProduto';

function Produtos() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
  
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
          console.log(dados);
        
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
            {produtos.length === 0 ? 
                <div className='container-produtos'>
                    <p>Você não tem nenhum produto no seu cardápio.</p>
                    <p>Gostaria de adicionar um novo produto.</p>
                    <CustomModal className='modal' />
                </div> :
                <div className='container-produtos'>
                    <h1 className='botao-direita' >Existe produto</h1>
                    <CustomModal className='botao-direita'/>
                    <div className='cards'>
                        {produtos.map( produto => <CardMarket produto={produto}/>)}
                    </div>
                </div>
            
            }
        </div>
    )
    
}

export default Produtos;