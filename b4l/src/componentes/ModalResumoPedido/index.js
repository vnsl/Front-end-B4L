import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CardCarrinho from '../../componentes/CardCarrinho';
import ModalEndereco from '../../componentes/ModalEndereco';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';
import { ReactComponent as NoItems } from '../../assets/carrinho-vazio.svg';
import sucesso from '../../assets/sucess-icon.png';

import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalResumoPedido(props) {
  const classes = useStyles();
  
  const { userPersistido, endereco, setEndereco } = useAuth();
  
  const [ enderecoEffect, setEnderecoEffect ] = useState(endereco);

  const handleCloseModalResumo = () => {
    props.setOpenModalResumo(false);
    props.setPedidoConcluido(false);
    props.setErro('');
  };

  useEffect( () => {
    setEnderecoEffect(endereco);
  }, [setEndereco, endereco])

  props.setCustoFinalCarrinho(props.custoTotalCarrinho + props.restaurante.taxa_entrega);
  
  // const enderecoFinal = userPersistido.endereco ?? enderecoEffect;

  return (
    <div>
      <Modal
        open={props.openModalResumo}
        onClose={handleCloseModalResumo}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-resumo-pedido">
          <BotaoFecharModal fill="red" className="botao-fechar-resumo" onClick={handleCloseModalResumo} />
          <div className="nome-restaurante">
            <ImagemCarrinho style={{ width: '48px'}} />
            <Typography variant="h4" color="textSecondary" component="h4">
              {props.restaurante.nome}
            </Typography>
          </div>
          {!props.pedidoConcluido && 
            <div className="conteudo-cartao" >
              <div className="container-endereco">
                {userPersistido.endereco.endereco || enderecoEffect ? 
                  <div>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        Endereço Entrega:
                      </span>
                      {userPersistido.endereco.endereco ? userPersistido.endereco.endereco : enderecoEffect.endereco}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        CEP:
                      </span>
                      {userPersistido.endereco.cep ? userPersistido.endereco.cep : enderecoEffect.cep}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        Complemento:
                      </span>
                      {userPersistido.endereco.complemento ? userPersistido.endereco.complemento : (enderecoEffect.complemento ? enderecoEffect.complemento : "N/A")}
                    </Typography>                    
                  </div> :
                <ModalEndereco openModalResumo={props.openModalResumo} setEndereco={setEndereco} />}
              </div>              
              {props.carrinho.length > 0 ?
                (
                  <div style={{height: '100%'}} >
                    <Typography variant="body1" color="textSecondary" component="p" style={{ display: 'flex', gap: 5, marginBottom: 10 }} >
                      <span>
                        Tempo de Entrega:
                      </span>
                      {props.restaurante.tempo_entrega_minutos}
                      min
                    </Typography>
                    <div className="carrinho-cheio">
                    {props.carrinho.map(itemCarrinho => <CardCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} setAcao={props.setAcao} excluirProduto={props.excluirProduto} setOpenModalDetalhe={props.setOpenModalDetalhe} setCarrinhoVisivel={props.setCarrinhoVisivel} setDadosProduto={props.setDadosProduto} />)}
                    </div>
                    <div style={{marginTop: 'auto'}}>
                      <Typography className="adicionar-itens" onClick={handleCloseModalResumo} >Adicionar mais itens ao pedido</Typography>
                      <div className="resumo-valores">
                        <hr />
                        <div className="text-container-bottom">
                          <Typography variant="body2" color="textSecondary" component="p">
                            Subtotal
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <span>
                              R$ { (props.custoTotalCarrinho).toFixed([2]) }
                            </span>
                          </Typography>
                        </div>
                        <div className="text-container-bottom">
                          <Typography variant="body2" color="textSecondary" component="p">
                            Taxa de entrega
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <span>
                              R$ { props.restaurante.taxa_entrega && (props.restaurante.taxa_entrega).toFixed([2]) }
                            </span>
                          </Typography>
                        </div>
                        <div className="total-pedido text-container-bottom">
                          <Typography variant="body2" color="textSecondary" component="p">
                            Total
                          </Typography>
                          <Typography variant="h5" color="textSecondary" component="p">
                            <span>
                              R$ {props.custoTotalCarrinho && (props.custoTotalCarrinho + props.restaurante.taxa_entrega).toFixed([2]) }
                            </span>
                          </Typography>
                        </div>
                      </div>
                      <div className="container-botao">
                        <Button 
                          className={classes.botaoConfirmarPedido} 
                          type="button" 
                          color="secondary" 
                          onClick={() => props.finalizarPedido(props.restaurante.id, props.custoTotalCarrinho, (props.custoTotalCarrinho + props.restaurante.taxa_entrega))}
                        >
                          Confirmar Pedido
                        </Button>
                      </div>
                    </div>
                    
                  </div>
                ) :
                (
                  <div className="carrinho-vazio" >
                    <NoItems/>
                  </div>
                )           
              }                
              {props.erro && <Alert severity="error">{props.erro}</Alert>}
            </div>
          }
          {props.pedidoConcluido && 
            <div className="container-sucesso" >
              <div className="container-imagem" >
                <img src={sucesso} alt="" />
                <Typography variant="body1" color="textSecondary" component="p" style={{ textAlign: 'center', fontWeight: 'bold' }} >
                  Pedido Confirmado!
                  <br />
                  Agora é só aguardar o seu pedido.
                </Typography>
              </div>        
              <div className="container-botao">
                <Button 
                  className={classes.botaoConfirmarPedido} 
                  type="button" 
                  color="secondary" 
                  onClick={handleCloseModalResumo}
                >
                  Voltar ao cardápio
                </Button>
              </div>
            </div>
            
          }
          {}
        </div>
      </Modal>
    </div>
  );
}