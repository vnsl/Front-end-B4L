import React, { useState, useEffect } from 'react';
import ModalEnviarPedido from '../../componentes/ModalEnviarPedido';
import Button from '@material-ui/core/Button';
import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading';

import './index.css';
import useStyles from './styles';

import Header from '../../componentes/HeaderProduto';

function Produtos() {
    const { token, userPersistido } = useAuth();
    const [erro, setErro] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [listaPedidos, setListaPedidos] = useState([]);
    const [dadosPedido, setDadosPedido] = useState('');
    const [dadosPedidoAtualizado, setDadosPedidoAtualizado] = useState('');
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const [openModalPedidoFinal, setOpenModalPedidoFinal] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const history = useHistory();

    const classes = useStyles();

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
        custoFinalPedido
      });  
      
      setDadosPedidoAtualizado(dadosPedido);

      setOpenModalPedidoFinal(true);
    };

    useEffect(() => {
      setDadosPedidoAtualizado(dadosPedido);
    }, [dadosPedido]);

    async function enviarPedido(idPedido) {
      try {
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
          method: 'PUT',
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

        setCarregando(false);
        setPedidoEnviado(true);
        setOpenModalPedidoFinal(false);
        setCarregar(true);        
      } catch (error) {
        return setErro(error.message);
      }
    }

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header recarregar={() => setCarregar(true)}/>
            <div className='container-pedidos'>
              {listaPedidos.length > 0?(
                <div style={{width: '100%'}} >
                  <div className="container-botoes-entrega" style={{width: '100%'}} >
                    <div className="botoes-entrega" >
                      <Button 
                        className={classes.botaoNaoEntregues}
                        type="button" 
                      >
                        Não entregues
                      </Button>
                      <Button
                        className={classes.botaoEntregues} 
                        type="button" 
                      >
                        Entregues
                      </Button>
                    </div>
                  </div>                        
                  <table className='tabela' style={{textAlign: 'left'}} >
                    <tr className='row'>
                      <td>Pedido</td>
                      <td>Items</td>
                      <td>Endereço</td>
                      <td>Cliente</td>
                      <td>Total</td>
                    </tr>
                      {listaPedidos.map(pedido => {
                        if(!pedido.saiu_entrega) {
                          return (
                            <tr onClick={() => handleOpenModalPedido(pedido.id)} style={{cursor: 'pointer'}} >
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
                              <td style={{fontWeight: 'bold'}} >R$ {(pedido.custo_final).toFixed([2])}</td> 
                            </tr>
                          );                          
                        }  
                      }                                              
                      )}
                  </table>  
                </div>
              ) : (
                <div>
                  <div className="container-botoes-entrega" style={{width: '100%'}} >
                    <div className="botoes-entrega" >
                      <Button 
                        className={classes.botaoNaoEntregues}
                        type="button" 
                      >
                        Não entregues
                      </Button>
                      <Button
                        className={classes.botaoEntregues} 
                        type="button" 
                      >
                        Entregues
                      </Button>
                    </div>
                  </div>
                  <div className="standard-text">
                    <p>Não há pedidos para o seu restaurante.</p>
                  </div>
                </div>
              )
              }
            </div>
            {dadosPedidoAtualizado && <ModalEnviarPedido openModalPedidoFinal={openModalPedidoFinal} setOpenModalPedidoFinal={setOpenModalPedidoFinal} dadosPedido={dadosPedidoAtualizado} enviarPedido={enviarPedido} />}
        </div>
    )
    
}

export default Produtos;