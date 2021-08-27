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
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const history = useHistory();

    useEffect(() => {
      setCarregar(false);
      async function carregarProdutos() {
        try {
          setCarregando(true);
          setErro('');

          const resposta = await fetch('http://localhost:3000/pedidos', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        
          const dados = await resposta.json();
        
          setCarregando(false);
          
          if (!resposta.ok) {
            return setErro(dados);
          };

          if (erro) {
            return setErro(dados);
          }

          setPedidos(dados);

        } catch (error) {
          return setErro(error.message);
        }
        
      }
      carregarProdutos();
    }, [token, carregar]);

    // const pedidosUnicos = pedidos.filter((item, i) => pedidos.indexOf(item) === i);

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header recarregar={() => setCarregar(true)}/>
                <div className='container-produtos'>
                    {pedidos.length > 0?(
                      <div>
                        <div className="container-modal" >
                          <button className='modal'>Não entregues</button>
                          <button className='modal'>Entregues</button>
                        </div>                        
                          <table className='tabela'>
                            <tr className='row'>
                              <td>Pedido</td>
                              <td>Items</td>
                              <td>Endereço</td>
                              <td>Cliente</td>
                              <td>Total</td>
                            </tr>
                          {pedidos.map(pedido => 
                            <tr>
                              <td>{pedido.id}</td>
                              <td>{pedido.itens}</td>
                              <td>{pedido.endereco}, {pedido.cep}, {pedido.complemento}</td>
                              <td>{pedido.nome}</td>
                              <td>{pedido.valor_total_produto}</td>
                            </tr>  
                          )}
                          </table>  
                      </div>
                      ) : (
                      <div>
                        <button className='modal'>Não entregues</button>
                        <button className='modal'>Entregues</button>
                        <div className="standard-text">
                          <p>Não há pedidos para o seu restaurante.</p>
                        </div>
                      </div>
                      )
                    }
                </div>

        </div>
    )
    
}

export default Produtos;