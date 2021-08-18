import React, { useState, useEffect } from 'react';
import Card from '../../componentes/CardResta';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderConsumidor';
import ModalDetalhePedido from '../../componentes/ModalDetalhePedido';

function RestaurantesCopia() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [restaurantes, setRestaurantes] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const [open, setOpen] = useState(false);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
      setCarregar(false);
      async function carregarRestaurantes() {
        try {

          setCarregando(true);
          setErro('');

          const resposta = await fetch('http://localhost:3001/restaurantes', {
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

          setRestaurantes(dados);

          if(dados.length === 0) {
            return history.push('/restaurantes');
          }
        } catch (error) {
          return setErro(error.message);
        }
        
      }
      carregarRestaurantes();
    }, [token, carregar]);
    
    const restaurantesFiltrados = restaurantes.filter((restaurante) => {
      if (busca === '') {
        return restaurante;
      } else if (restaurante.nome.toLowerCase().includes(busca.toLowerCase())) {
        return restaurante;
      }
    });

    return (
        <div className='content'>
            {carregando && <Loading/>}
            <Header />
            <div className='container-restaurantes'>
              <input className='pesquisa' type='text' placeholder='Buscar' onChange={(event) => { setBusca(event.target.value) }}/>
              {restaurantesFiltrados.length === 0 && 
              <div className="standard-text-consumidor">
                <p>Não há restaurantes cadastrados.</p>
              </div>}
              <div className='cards'>
                {restaurantesFiltrados.map(restaurante => <Card key={restaurante.id} setOpen={setOpen} setCarrinhoVisivel={setCarrinhoVisivel} restaurante={restaurante} recarregar={() => setCarregar(true)}/>)}
              </div>
              <ModalDetalhePedido open={open} setOpen={setOpen} carrinhoVisivel={carrinhoVisivel} setCarrinhoVisivel={setCarrinhoVisivel} />         
            </div>    
        </div>
    )
}

export default RestaurantesCopia;