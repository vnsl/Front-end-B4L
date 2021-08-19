import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
// import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
import CardMarket from '../../componentes/CardShow';
import useAuth from '../../hook/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderCardapio';
import ModalDetalhePedido from '../../componentes/ModalDetalhePedido';

function Produtos() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [informacao, setInformacao] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [open, setOpen] = useState(false);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      async function carregarRestaurante() {
        try {
          setCarregando(true);
          setErro('');
  
          const resposta = await fetch(`http://localhost:3001${location.pathname}`, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        
          const dados = await resposta.json();
          // console.log(dados);
          setCarregando(false);
          
          if (!resposta.ok) {
            return setErro(dados);
          };
  
          // if (erro) {
          //   return setErro(dados);
          // }
        
          setInformacao(dados);
          setCardapio(dados.cardapio);
  
          if(dados.length === 0) {
            return history.push('/resturantes');
          }
        } catch (error) {
          return setErro(error.message);
        }
        
      }
      carregarRestaurante();
    }, []);

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header restaurante={informacao} />
                <div className='container-produtos'>
                    {cardapio.length > 0?(
                      <div>
                                            
                        <div className='cards'>
                          {cardapio.map(produto => <CardMarket key={produto.id} setOpen={setOpen} setCarrinhoVisivel={setCarrinhoVisivel} produto={produto} />)}
                        </div>
                      </div>
                      ) :(
                      <div>
                        
                        <div className="standard-text">
                          <p>Você não tem nenhum produto no seu cardápio.</p>
                          <p>Gostaria de adicionar um novo produto.</p>
                          <h1>Não existem produtos ativos!</h1>
                        </div>
                      </div>
                      )
                    }
                </div>
                <ModalDetalhePedido open={open} setOpen={setOpen} carrinhoVisivel={carrinhoVisivel} setCarrinhoVisivel={setCarrinhoVisivel} />     
        
        </div>
    )
    
}

export default Produtos;