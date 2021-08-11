import React, { useState, useEffect } from 'react';
import CardMarket from '../../componentes/Card';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderProduto';

function Restaurantes() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [restaurantes, setRestaurantes] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
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

          // if (erro) {
          //   return setErro(dados);
          // }
          
          setRestaurantes(dados);

          if(dados.length === 0) {
            return history.push('/restaurantes');
          }
        } catch (error) {
          console.log({error})
          return setErro(error.message);
        }
        
      }
      carregarRestaurantes();
    }, [token, carregar]);

    return (
        <div className='content'>
            {carregando && <Loading/>}
            
            <Header />
                <div className='container-restaurantes'>
                  <h1>RESTAURANTES</h1>
                  {/* <div className='cards'>
                    {restaurantes.map(restaurante => <CardMarket key={restaurante.id} recarregar={() => setCarregar(true)}/>)}
                  </div>  */}               
                </div>
        </div>
    )
    
}

export default Restaurantes;