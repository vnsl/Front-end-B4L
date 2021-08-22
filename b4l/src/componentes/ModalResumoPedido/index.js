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
import { ReactComponent as IconeSucesso } from '../../assets/icone-sucesso.svg';

import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalResumoPedido(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  const { token, userPersistido } = useAuth();
  
  const [ endereco, setEndereco ] = useState();
  const [ enderecoEffect, setEnderecoEffect ] = useState(endereco);


  // tem que pegar o endereço persistido

  // incluir um useEffect para atualizar um estado que vai enviar os dados para o back

  const handleCloseModalResumo = () => {
    props.setOpenModalResumo(false);
    props.setPedidoConcluido(false);
  };

  useEffect( () => {
    setEnderecoEffect(endereco);
  }, [setEndereco, endereco])

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
                {enderecoEffect ? 
                  <div>
                    <p>Endereço de Entrega: 
                      <p>{enderecoEffect.endereco}</p>
                      <p>{enderecoEffect.cep}</p>
                      <p>{enderecoEffect.complemento}</p>
                    </p> 
                  </div> :
                <ModalEndereco openModalResumo={props.openModalResumo} setEndereco={setEndereco} />}
              </div>
              <Typography variant="body1" color="textSecondary" component="p" style={{ display: 'flex', gap: 5 }} >
                <span>
                  Tempo de Entrega:
                </span>
                {props.restaurante.tempo_entrega_minutos}
                min
              </Typography>
              <div className="carrinho-cheio">
                {props.carrinho.map(itemCarrinho => <CardCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} excluirProduto={props.excluirProduto} />)}
              </div>
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
                      R$ { (props.custoTotalCarrinho + props.restaurante.taxa_entrega).toFixed([2]) }
                    </span>
                  </Typography>
                </div>
              </div>
              <div className="container-botao">
                <Button 
                  className={classes.botaoConfirmarPedido} 
                  type="button" 
                  color="secondary" 
                  onClick={() => props.finalizarPedido(props.restaurante.id)}
                >
                  Confirmar Pedido
                </Button>
              </div>
            </div>
          }
          {props.pedidoConcluido && 
            <IconeSucesso />
          }
          {}
        </div>
      </Modal>
    </div>
  );
}