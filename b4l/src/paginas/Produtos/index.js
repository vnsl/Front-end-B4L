import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
// import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
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
            return setErro(dados);
          };

          // if (erro) {
          //   return setErro(dados);
          // }
          
          setProdutos(dados);
          if(dados.length === 0) {
            return history.push('/produtos');
            
          }
        } catch (error) {
          console.log({error})
          return setErro(error.message);
        }
        
      }
      carregarProdutos();
    }, [token, carregar]);

    return (
        <div className='content'>
            {carregando && <Loading/>}
            
            <Header/>
                <div className='container-produtos'>
                  <CustomModal className='modal' acao='Novo produto' recarregar={() => setCarregar(true)}/>
                    {produtos.length > 0?(
                      <div className='cards'>
                        {/* {produtos?.map(produto => <p>{produto.preco}</p>)} */}
                        {produtos.map(produto => <CardMarket key={produto.id} produto={produto} recarregar={() => {setCarregar(true); console.log({carregar})}}/>)}
                      </div>
                      ) :(
                      <div>
                        <p>Você não tem nenhum produto no seu cardápio.</p>
                        <p>Gostaria de adicionar um novo produto.</p>
                      </div>)
                    }

                </div>

        </div>
    )
    
}

export default Produtos;