import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CardCarrinho from '../../componentes/CardCarrinho';
import ModalEndereco from '../../componentes/ModalEndereco';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';
import { ReactComponent as NoItems } from '../../assets/carrinho-vazio.svg';
import sucesso from '../../assets/sucess-icon.png';

import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalDetalharPedido(props) {
  const classes = useStyles();
  
  const { token, userPersistido } = useAuth();
  
  const [ endereco, setEndereco ] = useState();
  const [ enderecoEffect, setEnderecoEffect ] = useState(endereco);

  const handleCloseModalResumo = () => {
    // alterar os sets para os estados relacionados a esse modal e deixar o setErro.
    props.setOpenModalResumo(false);
    props.setPedidoConcluido(false);
    props.setErro('');
  };

  useEffect( () => {
    setEnderecoEffect(endereco);
  }, [setEndereco, endereco])

  const enderecoFinal = userPersistido.endereco ?? enderecoEffect;

  return (
    <div>
      <Modal
        open={props.openModalResumo}
        // open virá de um estado na tela de resumo de pedidos
        onClose={handleCloseModalResumo}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-resumo-pedido">
          <BotaoFecharModal fill="red" className="botao-fechar-resumo" onClick={handleCloseModalResumo} />
          <div className="nome-restaurante">
            <ImagemCarrinho style={{ width: '48px'}} />
            <Typography variant="h4" color="textSecondary" component="h4">
              {/* colocar o número do pedido que vem da tela principal, se possível um objeto para pegar todos os dados */}
            </Typography>
          </div>
            <div className="conteudo-cartao" >
              <div className="container-endereco">
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
                  </div>
              </div>  
              {/* substituir por um map parecido */}
                  <div style={{height: '100%'}} >
                    <div className="carrinho-cheio">
                      {props.carrinho.map(itemCarrinho => <CardCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} setAcao={props.setAcao} excluirProduto={props.excluirProduto} setOpenModalDetalhe={props.setOpenModalDetalhe} setCarrinhoVisivel={props.setCarrinhoVisivel} setDadosProduto={props.setDadosProduto} />)}
                    </div>
                    <div style={{marginTop: 'auto'}}>
                      <div className="resumo-valores">
                        <hr />
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
                          onClick={() => props.finalizarPedido(props.restaurante.id, props.custoTotalCarrinho, enderecoFinal)}
                        >
                          Enviar Pedido
                        </Button>
                      </div>
                    </div>
                    
                  </div>         
              {props.erro && <Alert severity="error">{props.erro}</Alert>}
            </div>
        </div>
      </Modal>
    </div>
  );
}