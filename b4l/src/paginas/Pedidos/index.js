import React, { useState, useEffect } from 'react';
import ModalEnviarPedido from '../../componentes/ModalEnviarPedido';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';

import Header from '../../componentes/HeaderProduto';

function Produtos() {
    const { token, userPersistido } = useAuth();
    const [erro, setErro] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [listaPedidos, setListaPedidos] = useState([]);
    const [dadosPedido, setDadosPedido] = useState('');
    const [dadosPedidoAtualizado, setDadosPedidoAtualizado] = useState('');
    const [openModalPedidoFinal, setOpenModalPedidoFinal] = useState(false);
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
          setListaPedidos(dados.pedidos);

        } catch (error) {
          return setErro(error.message);
        }
        
      }
      carregarProdutos();
    }, [token, carregar]);

    /* useEffect(() => {
      setListaPedidos(pedidos.pedidos);
    }, [pedidos]) */
  
    function handleOpenModalPedido (idPedido) {
      const infoPedido = pedidos.arrayPedidos.filter(item => {
        if(item.id === idPedido){
          return item;
        }
      });
      
      const custoFinalPedido = pedidos.pedidos.filter(item => {
        if(item.id === idPedido){
          return item;
        }
      });    

      setDadosPedido({
        idPedido,
        infoPedido,
        'custoFinalPedido': custoFinalPedido[0].custo_final
      });  
      
      setDadosPedidoAtualizado(dadosPedido);

      setOpenModalPedidoFinal(true);
    };

    useEffect(() => {
      setDadosPedidoAtualizado(dadosPedido);
    }, [dadosPedido]);

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header recarregar={() => setCarregar(true)}/>
            <div className='container-produtos'>
              {listaPedidos.length > 0?(
              <div>
                <div className="container-modal" >
                  <button className='modal'>Não entregues</button>
                  <button className='modal'>Entregues</button>
                </div>                        
                <table className='tabela' style={{textAlign: 'left'}} >
                  <tr className='row'>
                    <td>Pedido</td>
                    <td width="280px">Items</td>
                    <td>Endereço</td>
                    <td>Cliente</td>
                    <td>Total</td>
                    </tr>
                      {listaPedidos.map(pedido => 
                        <tr onClick={() => handleOpenModalPedido(pedido.id)} >
                          <td>{pedido.id}</td>
                          <td style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', height: '100%'}} >
                            {pedidos.arrayPedidos.map(item => {
                              if(item.id === pedido.id) {
                                return (
                                  <div>
                                    {item.nome_produto} 
                                  </div>);
                              }
                            })}
                          </td>
                          <td>{pedidos.arrayPedidos[pedidos.arrayPedidos.findIndex(item => item.id === pedido.id)].endereco}</td>
                          <td>{pedidos.arrayPedidos[pedidos.arrayPedidos.findIndex(item => item.id === pedido.id)].nome_cliente}</td>
                          <td>{pedido.custo_final}</td>
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
            <ModalEnviarPedido openModalPedidoFinal={openModalPedidoFinal} setOpenModalPedidoFinal={setOpenModalPedidoFinal} dadosPedido={dadosPedidoAtualizado} />
        </div>
    )
    
}

export default Produtos;