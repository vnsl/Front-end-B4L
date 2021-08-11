import React, { useState, useEffect } from 'react';
import Card from '../../componentes/CardResta';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderConsumidor';

function Restaurantes() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [restaurantes, setRestaurantes] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const history = useHistory();

    // useEffect(() => {
    //   setCarregar(false);
    //   async function carregarRestaurantes() {
    //     try {

    //       setCarregando(true);
    //       setErro('');

    //       const resposta = await fetch('http://localhost:3001/restaurantes', {
    //         method: 'GET',
    //     });
        
    //       const dados = await resposta.json();
        
    //       setCarregando(false);
          
    //       if (!resposta.ok) {
    //         return setErro(dados);
    //       };

    //       // if (erro) {
    //       //   return setErro(dados);
    //       // }
          
    //       setRestaurantes(dados);

    //       if(dados.length === 0) {
    //         return history.push('/restaurantes');
    //       }
    //     } catch (error) {
    //       console.log({error})
    //       return setErro(error.message);
    //     }
        
    //   }
    //   carregarRestaurantes();
    // }, [token, carregar]);


    const teste = [
      {
        id: 1,
        nome: 'Pizzaria',
        descricao: 'Massa caseira e influência Italiana',
        imagem: '',
        categoria_id: 2
      },
      {
        id: 2,
        nome: 'Churrascaria',
        descricao: 'Picanha na Brasa',
        imagem: 'https://jfkgjulwgjskxvudqyua.supabase.co/storage/v1/object/public/cubos-food/1628619688276',
        categoria_id: 5
      },
      {
        id: 3,
        nome: 'Creperia',
        descricao: 'Doces e Salgadas',
        imagem: 'https://jfkgjulwgjskxvudqyua.supabase.co/storage/v1/object/public/cubos-food/1628606817122',
        categoria_id: 3
      },

    ]

    return (
        <div className='content'>
            {carregando && <Loading/>}
            <Header />
                <div className='container-restaurantes'>
                  <input className='pesquisa' type='text' placeholder='Buscar' onChange={(event) => { setBusca(event.target.value) }}/>
                  <div className='cards'>
                    {teste.filter((restaurante) => {
                      if (busca === '') {
                        return restaurante;
                      } else if (restaurante.nome.toLowerCase().includes(busca.toLowerCase())) {
                        return restaurante;
                      }
                    }).map(restaurante => <Card key={restaurante.id} restaurante={restaurante} recarregar={() => setCarregar(true)}/>)}
                  </div>         
                </div>
        </div>
    )
}

export default Restaurantes;