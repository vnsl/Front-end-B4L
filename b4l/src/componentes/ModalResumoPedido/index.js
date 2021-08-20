import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CardCarrinho from '../../componentes/CardCarrinho';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';

import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalResumoPedido(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  const { token } = useAuth();

  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, ativo, permite_observacoes, imagem } = props.produtoInfo ?? '';
  
  const [ endereco, setEndereco ] = useState('');

  // tem que pegar o endereço persistido
  
  const handleCloseModalResumo = () => {
    props.setOpenModalResumo(false);
  };
  
  return (
    <div>
      <Modal
        open={props.openModalResumo}
        onClose={handleCloseModalResumo}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-resumo-pedido">
        <BotaoFecharModal style={{ cursor: "pointer"}} onClick={handleCloseModalResumo} />
          <div className="nome-restaurante">
            <ImagemCarrinho style={{ width: '48px'}} />
            <Typography variant="h4" color="textSecondary" component="p">
              {props.restaurante.nome}
            </Typography>
          </div>
          <div className="container-endereco">
            <Typography variant="body2" color="textPrimary" component="p">
              Adicionar Endereco
            </Typography>
          </div>
          <Typography variant="body1" color="textSecondary" component="p" style={{ display: 'flex', gap: 5 }} >
            <span>
              Tempo de Entrega:
            </span>
            {props.restaurante.tempo_entrega_minutos}
            min
          </Typography>
          <div className="carrinho-cheio">
            {props.carrinho.map(itemCarrinho => <CardCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} />)}
          </div>
          <div className="resumo-valores">
            <hr />
            <div className="text-container-bottom">
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Subtotal
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                R$ {props.custoTotalCarrinho}
              </Typography>
            </div>
            <div className="text-container-bottom">
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Taxa de entrega
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  R$ {props.restaurante.taxa_entrega}
              </Typography>
            </div>
            <div className="total-pedido text-container-bottom">
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Total
                </span>
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                R$ {props.custoTotalCarrinho + props.restaurante.taxa_entrega}
              </Typography>
            </div>
          </div>
          <div className="container-botao">
            <Button 
              className={classes.botaoConfirmarPedido} 
              type="button" 
              color="secondary" 
              // onClick={confirmarPedido}
            >
              Confirmar Pedido
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}