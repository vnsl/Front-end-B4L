import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';

import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalDetalhePedido(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
 
  const { token } = useAuth();

  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, ativo, permite_observacoes, imagem } = props.produtoInfo ?? '';
  
  // *** tem que pegar um pedido_id persistido

  const [ qtdProduto, setQtdProduto ] = useState(1);
  const [ valorTotalProduto, setValorTotalProduto ] = useState(preco);
  const [carrinho, setCarrinho] = useState([]);

  

  function handleQuantidade(valor) {
    const novaQtd = qtdProduto + valor;
    
    if(novaQtd < 1) return;
    
    setQtdProduto(novaQtd);
    setValorTotalProduto(qtdProduto*preco);
  }

  function adicionarProdutoAoCarrinho() {
    const detalhePedido = {
      // pedido_id: pedido_id, 
      produto_id: id,
      quantidade_produto: qtdProduto,
      // valor_total_produto: valor_total_produto
    }

    setCarregando(true);
    setErro('');
    // setCarrinho(detalhePedido);
    props.setCarrinhoVisivel(true);
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-detalhe-pedido">
          <div className="header-card">
            <img src={imagem} alt="" />
          </div>
          <div className="imagem-produto">
            
          </div>
          {!props.carrinhoVisivel && <div className="text-content">
            <Typography variant="h4" color="textSecondary" component="p">
              {/* {nome} */}
              Nome do produto
            </Typography>
            <div className="info">
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Pedido Mínimo
                </span>
                {/* {pedido_minimo} */}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Tempo de Entrega
                </span>
                {/* {tempo_entrega} */}
              </Typography>
            </div>
            <div className="detalhes">
              <Typography variant="body2" color="textSecondary" component="p" style={{ maxWidth: '270px' }}>
                {/* {descricaoa} */}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus dolores rerum maiores voluptatem?
              </Typography>
              <div className="preco-total">
              <Typography variant="h5" color="textSecondary" component="p" style={{ maxWidth: '270px' }}>
                {/* {valorTotalProduto} */}
                R$ 99.99
              </Typography>
              </div>

            </div>
            <div className="botoes">
              <div className="quantidade">
                <Button 
                  className={classes.botaoQuantidade} 
                  type="button" 
                  onClick={() => handleQuantidade(-1)}
                >
                  -
                </Button>
                {qtdProduto}
                <Button 
                  className={classes.botaoQuantidade} 
                  type="button" 
                  onClick={() => handleQuantidade(1)}
                >
                  +
                </Button>
              </div>
              <Button 
                className={classes.botaoCarrinho} 
                type="button" 
                color="secondary" 
                onClick={adicionarProdutoAoCarrinho}>
                  Adicionar ao Carrinho
              </Button>
            </div>
          </div>}   
          {props.carrinhoVisivel && <div className="img-carrinho">
            <ImagemCarrinho />
            <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  Produto adicionado ao pedido!
                </span>
              </Typography>
          </div>}
          <Typography className="bottom-link" onClick={props.handleOpenModalResumo} >Ir para a revisão do pedido</Typography>
        </div>
      </Modal>
    </div>
  );
}