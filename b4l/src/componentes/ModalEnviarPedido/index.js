import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CardPedidoFinalizado from '../../componentes/CardPedidoFinalizado';
import Button from '@material-ui/core/Button';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';
import sucesso from '../../assets/sucess-icon.png';

import useAuth from '../../hook/useAuth';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalEnviarPedido({ dadosPedido, openModalPedidoFinal, setOpenModalPedidoFinal, enviarPedido }) {
  const classes = useStyles();
    
  const handleCloseModalResumo = () => {
    setOpenModalPedidoFinal(false);
  };

  return (
    <div>
      <Modal
        open={openModalPedidoFinal}
        onClose={handleCloseModalResumo}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-resumo-pedido">
            <BotaoFecharModal fill="red" className="botao-fechar-resumo" onClick={handleCloseModalResumo} />
            <div className="nome-restaurante">
              <Typography variant="h4" color="textSecondary" component="h4">
                {dadosPedido.idPedido}
              </Typography>
            </div>
            <div className="conteudo-cartao" >
              <div className="container-endereco">
                  <div>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        Endereço Entrega:
                      </span>
                      {dadosPedido.infoPedido[0].endereco}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        CEP:
                      </span>
                      {dadosPedido.infoPedido[0].cep}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" >
                      <span style={{ fontWeight: 'bold', color: 'red', marginRight: 10 }} >
                        Complemento:
                      </span>
                      {dadosPedido.infoPedido[0].complemento}
                    </Typography>                    
                  </div>
              </div>  
              <div style={{height: '100%'}} >
                <div className="pedido-fechado">
                  {dadosPedido.infoPedido.map(itemPedido => <CardPedidoFinalizado key={itemPedido.id} itemPedido={itemPedido} />)}
                </div>
                <div>
                  <div className="resumo-valores">
                    <hr />
                    <div className="total-pedido text-container-bottom">
                      <Typography variant="body2" color="textSecondary" component="p">
                        Total
                      </Typography>
                      <Typography variant="h5" color="textSecondary" component="p">
                        <span>
                          R$ {(dadosPedido.custoFinalPedido[0].custo_final).toFixed([2])}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div className="container-botao">
                    <Button 
                      className={classes.botaoEnviarPedido} 
                      type="button" 
                      color="secondary" 
                      disabled={dadosPedido.custoFinalPedido[0].saiu_entrega}
                      onClick={() => enviarPedido(dadosPedido.idPedido)}
                      style={{background: dadosPedido.custoFinalPedido[0].saiu_entrega ? '#BABABA' : ''}}
                    >
                      Enviar Pedido
                    </Button>
                  </div>
                </div>                    
              </div>         
            </div>
        </div>
      </Modal>
    </div>
  );
}