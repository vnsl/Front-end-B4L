import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
// import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
import CardMarket from '../../componentes/CardShow';
import useAuth from '../../hook/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../componentes/Loading';
import { ReactComponent as NoProducts } from '../../assets/resta-noitems.svg';

import './index.css';

import Header from '../../componentes/HeaderCardapio';

function Produtos() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [informacao, setInformacao] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(false);
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
                  <button 
                    className='botao-retorno' 
                    onClick={() => {
                      history.push('/restaurantes');
                    }}
                  >
                    Restaurantes
                  </button>
                  <div className='informacoes'>
                    <p>Pedido Mínimo: R$ {informacao.valor_minimo_pedido},00</p>
                    <p>Tempo de Entrega: {informacao.tempo_entrega_minutos} min</p>
                    <p> Descrição: {informacao.descricao}</p>
                  </div>
                  {cardapio.length > 0?(
                    <div>               
                      <div className='cards'>
                        {cardapio.map(produto => <CardMarket key={produto.id} produto={produto} />)}
                      </div>
                    </div>
                    ) :(
                      <div className="sem-produtos">
                        <NoProducts/>
                        <h1>Desculpe, estamos sem produtos ativos</h1>
                      </div>
                    )
                  }
                </div>
        
        </div>
    )
    
}

export default Produtos;