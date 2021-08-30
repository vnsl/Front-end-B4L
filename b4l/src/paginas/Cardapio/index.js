import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
import Button from '@material-ui/core/Button';
import CardMarket from '../../componentes/CardShow';
import useAuth from '../../hook/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../componentes/Loading';
import { ReactComponent as NoProducts } from '../../assets/resta-noitems.svg';
import { ReactComponent as IconeDinheiro } from '../../assets/icone-dinheiro.svg';
import { ReactComponent as IconeTempo } from '../../assets/icone-tempo.svg';
import { Typography } from '@material-ui/core';

import './index.css';
import useStyles from './styles';

import Header from '../../componentes/HeaderCardapio';
import ModalDetalhePedido from '../../componentes/ModalDetalhePedido';
import ModalResumoPedido from '../../componentes/ModalResumoPedido';

function persistirCarrinho(carrinho, custoTotalCarrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("custoTotalCarrinho", custoTotalCarrinho);
}

function Produtos() {
    const classes = useStyles();
    const { token, userPersistido } = useAuth();
    const [erro, setErro] = useState('');
    const [informacao, setInformacao] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [acao, setAcao] = useState('');
    const [openModalDetalhe, setOpenModalDetalhe] = useState(false);
    const [openModalResumo, setOpenModalResumo] = useState(false);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    const [verMais, setVerMais] = useState(false);

    const carrinhoPersistido = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : [];
    const custoTotalCarrinhoPersistido = localStorage.getItem("custoTotalCarrinho") ? Number(localStorage.getItem("custoTotalCarrinho")) : 0;

    const [carrinho, setCarrinho] = useState(carrinhoPersistido);
    const [custoTotalCarrinho, setCustoTotalCarrinho] = useState(custoTotalCarrinhoPersistido);
    const [custoFinalCarrinho, setCustoFinalCarrinho] = useState(0);

    const [ qtdProduto, setQtdProduto ] = useState(1);
    const [pedidoConcluido, setPedidoConcluido] = useState(false);

    const [dadosProduto, setDadosProduto] = useState({});
    const history = useHistory();
    const location = useLocation();

    const handleOpenModalResumo = () => {
      setOpenModalDetalhe(false);
      setOpenModalResumo(true);
    }
    
    useEffect(() => {
      persistirCarrinho(carrinho, custoTotalCarrinho);
    }, [carrinho, custoTotalCarrinho]);

    function adicionarProdutoAoCarrinho(produtoAtualizado) {

      console.log(produtoAtualizado);

      if (produtoAtualizado.quantidade === 0) {
        setErro("Informe a quantidade desejada antes de prosseguir.");
        return;
      }

      setErro('');

      const novosProdutos = [...carrinho]
      const produtoNoCarrinho = novosProdutos.find(
        ({ produto_id }) => produto_id === produtoAtualizado.id,
      );

      if (produtoNoCarrinho) {

        if (produtoNoCarrinho.restaurante_id !== produtoAtualizado.restaurante_id) {
          setErro("O pedido deve ser feito para apenas um restaurante.");
          return;
        }

        produtoNoCarrinho.quantidade_produto = produtoAtualizado.quantidade;
        produtoNoCarrinho.custo_total_produto = produtoAtualizado.valor_total;
        setCarrinho(novosProdutos);
        
        const novoCustoTotalCarrinho = novosProdutos.reduce(
          (acc, valorAtual) => acc + Number(valorAtual.custo_total_produto), 0);       
        
        setCustoTotalCarrinho(novoCustoTotalCarrinho);
        setErro('');
        setCarrinhoVisivel(true);
        return;
      }

      novosProdutos.push({
        restaurante_id: produtoAtualizado.restaurante_id,
        produto_id: produtoAtualizado.id,
        nome: produtoAtualizado.nome,
        imagem: produtoAtualizado.imagem,
        quantidade_produto: produtoAtualizado.quantidade,
        preco: produtoAtualizado.preco,
        custo_total_produto: produtoAtualizado.valor_total 
      });
      setCarrinho(novosProdutos);
      const novoCustoTotalCarrinho = novosProdutos.reduce(
        (acc, valorAtual) => acc + valorAtual.custo_total_produto, 0); 

      setCustoTotalCarrinho(novoCustoTotalCarrinho); 
      
      setErro('');
      setCarrinhoVisivel(true);
    }

    function excluirProduto (idProduto) {

      const novosProdutos = [...carrinho]
      const produtoNoCarrinho = novosProdutos.findIndex(
        ({ produto_id }) => produto_id === idProduto,
      );

      novosProdutos.splice(produtoNoCarrinho, 1)
      
      setCarrinho(novosProdutos);
        
      const novoCustoTotalCarrinho = novosProdutos.reduce(
        (acc, valorAtual) => acc + Number(valorAtual.custo_total_produto), 0);       
        
      setCustoTotalCarrinho(novoCustoTotalCarrinho);
      setErro('');
      return;
    }

    async function finalizarPedido(id, custoCarrinho, custoFinalCarrinho) {
      try {
        setCarregando(true);

        if (!userPersistido.endereco.endereco) {
          setErro("Não é possível prosseguir sem um endereço cadastrado.");
          return;
        }

        if (custoCarrinho === 0) {
          setErro("Não é possível prosseguir sem produtos.");
          return;
        }        
        
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`http://localhost:3001/pedido/${id}`, {
          method: 'POST',
          body: JSON.stringify({custoFinalCarrinho}),
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

        const listaDeProdutos = [...carrinho];

        const listaEditada = listaDeProdutos.map(produto => {
        return {
            pedido_id: dados.id,
            produto_id: produto.produto_id,
            quantidade_produto: produto.quantidade_produto,
            valor_total_produto: produto.custo_total_produto
          }
        });
        
        const pedidoFinalizado = {
          listaEditada        
        }

        const respostaPedido = await fetch('http://localhost:3001/finalizar_pedido', {
          method: 'POST',
          body: JSON.stringify(pedidoFinalizado),
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const dadosPedido = await respostaPedido.json();

        setCarregando(false);
        setCarrinho([]);
        setCustoTotalCarrinho(0);
        setPedidoConcluido(true);        
      } catch (error) {
        return setErro(error.message);
      }
    }

    useEffect(() => {
      async function carregarRestaurante() {
        try {
          setCarregando(true);
          setErro('');
  
          const resposta = await fetch(`http://localhost:3001${location.pathname}`, {
            method: 'GET',
            body: JSON.stringify(),
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
  
          // if (erro) {
          //   return setErro(dados);
          // }
        
          setInformacao(dados);
          setCardapio(dados.cardapio);
  
          if(dados.length === 0) {
            return history.push('/restaurantes');
          }
        } catch (error) {
          return setErro(error.message);
        }
        
      }
      carregarRestaurante();
    }, []);

    const estiloDescricao = {
      'textAlign': 'left',
      'width': '450px',
      'display': 'inline-block',
      'whiteSpace': 'nowrap',
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      'direction': 'ltr'
    }

    function mudarRestaurante() {
      if(carrinho.length > 0) {
        console.log("tem item");
        setCarrinho([]);
      } else {
        history.push('/restaurantes');
      }
    }

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header restaurante={informacao} />
                <div className='container-produtos'>
                  <div className="container-botoes-topo">
                    <Button 
                      className={classes.botaoRestaurantes} 
                      type="button" 
                      color="secondary" 
                      onClick={mudarRestaurante}>
                        Restaurantes
                    </Button>
                    {carrinho.length > 0 && 
                      <Button 
                        className={classes.botaoRevisarCarrinho} 
                        type="button" 
                        color="secondary" 
                        onClick={handleOpenModalResumo}>
                          Revisar Pedido
                      </Button>
                    }
                  </div>                  
                  <div className='informacoes'>
                    <div className="container-tempo-e-dinheiro" >
                      <div className="dinheiro">
                        <IconeDinheiro />
                        <Typography variant="body2" color="textSecondary" component="p" style={{ maxWidth: 525}} >
                          <span style={{ marginRight: 5}} >
                            Pedido Mínimo: 
                          </span>
                          R$ {informacao.valor_minimo_pedido ? (informacao.valor_minimo_pedido).toFixed([2]) : 0}
                        </Typography>
                      </div>
                      <div className="tempo">
                        <IconeTempo />
                        <Typography variant="body2" color="textSecondary" component="p" style={{ maxWidth: 525}} >
                          <span style={{ marginRight: 5}} >
                            Tempo de Entrega: 
                          </span>
                          {informacao.tempo_entrega_minutos}
                          min
                        </Typography>
                      </div>
                    </div>
                    {informacao.descricao && <div className="texto-descricao">
                      <Typography variant="body2" color="textSecondary" component="p" style={!verMais ? estiloDescricao : {maxWidth: 450, textAlign: 'left'}} >
                        {informacao.descricao}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p" style={{fontWeight: 'bold', color: 'var(--cor-vermelho)'}} onClick={() => setVerMais(!verMais)} >
                        {!verMais ? "ver mais" : "ver menos"}
                      </Typography>
                    </div>}                    
                  </div>
                  {cardapio.length > 0?(
                    <div>               
                      <div className='cards'>
                        {cardapio.map(produto => <CardMarket key={produto.id} setAcao={setAcao} produto={produto} handleOpenModalResumo={handleOpenModalResumo} restaurante={informacao} setOpenModalDetalhe={setOpenModalDetalhe} setDadosProduto={setDadosProduto} setCarrinhoVisivel={setCarrinhoVisivel} />)}
                      </div>
                    </div>
                    ) :(
                      <div className="sem-produtos">
                        <NoProducts/>
                        <h1>Desculpe, estamos sem produtos ativos</h1>
                      </div>
                    )
                  }
                </div>
                <ModalDetalhePedido acao={acao} restaurante={informacao} produto={dadosProduto} openModalDetalhe={openModalDetalhe} setOpenModalDetalhe={setOpenModalDetalhe} qtdProduto={qtdProduto} setQtdProduto={setQtdProduto} handleOpenModalResumo={handleOpenModalResumo} carrinho={carrinho} setCarrinho={setCarrinho} carrinhoVisivel={carrinhoVisivel} setCarrinhoVisivel={setCarrinhoVisivel} adicionarProdutoAoCarrinho={adicionarProdutoAoCarrinho} erro={erro} />
                <ModalResumoPedido setAcao={setAcao} carrinho={carrinho} custoTotalCarrinho={custoTotalCarrinho} custoFinalCarrinho={custoFinalCarrinho} setCustoFinalCarrinho={setCustoFinalCarrinho} restaurante={informacao} openModalResumo={openModalResumo} setOpenModalResumo={setOpenModalResumo} setOpenModalDetalhe={setOpenModalDetalhe} setDadosProduto={setDadosProduto} setCarrinhoVisivel={setCarrinhoVisivel} pedidoConcluido={pedidoConcluido} setPedidoConcluido={setPedidoConcluido} excluirProduto={excluirProduto} finalizarPedido={finalizarPedido} erro={erro} setErro={setErro} />
        </div>
    )
    
}

export default Produtos;