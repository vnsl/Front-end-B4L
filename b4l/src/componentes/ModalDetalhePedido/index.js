import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';

import useAuth from '../../hook/useAuth';

import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalDetalhePedido(props) {
  const classes = useStyles();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
 
  const { token } = useAuth();

  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, imagem } = props.produto ?? '';
  
  const [ qtdProduto, setQtdProduto ] = useState(1);
  const [ valorTotalProduto, setValorTotalProduto ] = useState(preco);
  const [produtoAtualizado, setProdutoAtualizado] = useState({});
  
  // const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  

  useEffect(() => {
    setValorTotalProduto(qtdProduto*preco);  
  }, [qtdProduto, preco])

  useEffect(() => {
    setProdutoAtualizado({
      id: id,
      nome,
      imagem,
      quantidade: qtdProduto,
      valor_total: valorTotalProduto 
    })
  }, [id, qtdProduto, valorTotalProduto]);

  function handleQuantidade(unidade) {
    const novaQtd = qtdProduto + unidade;
    
    if(novaQtd < 1) return;
    
    setQtdProduto(novaQtd);
  }

  const handleClose = () => {
    props.setCarrinhoVisivel(false);
    props.setOpenModalDetalhe(false);

  }
  
  return (
    <div>
      <Modal
        open={props.openModalDetalhe}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-detalhe-pedido" >
          <div className="header-card">
            <img src={imagem} alt="" />
            <BotaoFecharModal className="botao-fechar" onClick={handleClose} />
          </div>
          <div className="imagem-restaurante" >
            <img src={props.restaurante.imagem} alt="" />
          </div>
          {!props.carrinhoVisivel && <div className="text-content">
            <Typography variant="h4" color="textSecondary" component="p">
              {nome}
            </Typography>
            <div className="info">
              <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", gap: "5px" }}>
                <span>
                  Pedido Mínimo: 
                </span>
                R$
                <div>
                  {props.restaurante.valor_minimo_pedido}
                </div>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", gap: "5px" }}>
                <span>
                  Tempo de Entrega
                </span>
                {props.restaurante.tempo_entrega_minutos}
              </Typography>
            </div>
            <div className="detalhes">
              <Typography variant="body2" color="textSecondary" component="p" style={{ maxWidth: '270px' }}>
                {descricao}
              </Typography>
              <div className="preco-total">
                <Typography variant="h5" color="textSecondary" component="p" style={{ display: "flex", gap: "5px", fontWeight: "bold" }}>
                  R$
                  <div>
                    {valorTotalProduto}
                  </div>
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
                onClick={() => props.adicionarProdutoAoCarrinho(produtoAtualizado)}>
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