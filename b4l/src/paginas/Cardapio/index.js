import React, { useState, useEffect } from 'react';
import CustomModal from '../../componentes/Modal';
// import ModalEditarUsuario from '../../componentes/ModalEditarUsuario';
import CardMarket from '../../componentes/CardShow';
import useAuth from '../../hook/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../componentes/Loading';
import { ReactComponent as NoProducts } from '../../assets/resta-noitems.svg';
import { ReactComponent as IconeSucesso } from '../../assets/sucess-icon.svg';

import Teste from '../../componentes/ModalEndereco';

import './index.css';

import Header from '../../componentes/HeaderCardapio';
import ModalDetalhePedido from '../../componentes/ModalDetalhePedido';
import ModalResumoPedido from '../../componentes/ModalResumoPedido';

function persistirCarrinho(carrinho, custoTotalCarrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("custoTotalCarrinho", custoTotalCarrinho);
}

function Produtos() {
    const { token } = useAuth();
    const [erro, setErro] = useState('');
    const [informacao, setInformacao] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [openModalDetalhe, setOpenModalDetalhe] = useState(false);
    const [openModalResumo, setOpenModalResumo] = useState(false);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    
    const carrinhoPersistido = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : [];
    const custoTotalCarrinhoPersistido = localStorage.getItem("custoTotalCarrinho") ? Number(localStorage.getItem("custoTotalCarrinho")) : 0;

    const [carrinho, setCarrinho] = useState(carrinhoPersistido);
    const [ qtdProduto, setQtdProduto ] = useState(0);
    const [custoTotalCarrinho, setCustoTotalCarrinho] = useState(custoTotalCarrinhoPersistido);
    const [pedido, setPedido] = useState({});
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
        produtoNoCarrinho.quantidade_produto = produtoAtualizado.quantidade;
        produtoNoCarrinho.custo_total_produto = produtoAtualizado.valor_total;
        setCarrinho(novosProdutos);
        
        const novoCustoTotalCarrinho = novosProdutos.reduce(
          (acc, valorAtual) => acc + Number(valorAtual.custo_total_produto), 0);       
        
        setCustoTotalCarrinho(novoCustoTotalCarrinho);
        setErro('');
        setCarrinhoVisivel(true);
        setQtdProduto(0);
        return;
      }

      novosProdutos.push({
        produto_id: produtoAtualizado.id,
        nome: produtoAtualizado.nome,
        imagem: produtoAtualizado.imagem,
        quantidade_produto: produtoAtualizado.quantidade,
        custo_total_produto: produtoAtualizado.valor_total 
      });
      setCarrinho(novosProdutos);
      const novoCustoTotalCarrinho = novosProdutos.reduce(
        (acc, valorAtual) => acc + valorAtual.custo_total_produto, 0); 

      setCustoTotalCarrinho(novoCustoTotalCarrinho); 
      
      setErro('');
      setCarrinhoVisivel(true);
      setQtdProduto(0);
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

    async function finalizarPedido(id) {
      try {
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`http://localhost:3001/pedido/${id}`, {
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
      
        setPedido(dados);
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

    return (
        <div className='content-produtos'>
            {carregando && <Loading/>}
            
            <Header restaurante={informacao} />
                <div className='container-produtos'>
                  <button 
                    className='botao-retorno' 
                    onClick={() => {
                      history.push('/restaurantes');
                    }}
                  >
                    Restaurantes
                  </button>
                  <Teste/>
                  <div className='informacoes'>
                    <p>Pedido Mínimo: R$ {informacao.valor_minimo_pedido},00</p>
                    <p>Tempo de Entrega: {informacao.tempo_entrega_minutos} min</p>
                    <p> Descrição: {informacao.descricao}</p>
                  </div>
                  {cardapio.length > 0?(
                    <div>               
                      <div className='cards'>
                        {cardapio.map(produto => <CardMarket key={produto.id} produto={produto} handleOpenModalResumo={handleOpenModalResumo} restaurante={informacao} setOpenModalDetalhe={setOpenModalDetalhe} setDadosProduto={setDadosProduto} setCarrinhoVisivel={setCarrinhoVisivel} />)}
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
                <ModalDetalhePedido restaurante={informacao} produto={dadosProduto} openModalDetalhe={openModalDetalhe} qtdProduto={qtdProduto} setQtdProduto={setQtdProduto} setOpenModalDetalhe={setOpenModalDetalhe} handleOpenModalResumo={handleOpenModalResumo} carrinho={carrinho} setCarrinho={setCarrinho} carrinhoVisivel={carrinhoVisivel} setCarrinhoVisivel={setCarrinhoVisivel} adicionarProdutoAoCarrinho={adicionarProdutoAoCarrinho} erro={erro} />
                <ModalResumoPedido carrinho={carrinho} custoTotalCarrinho={custoTotalCarrinho} restaurante={informacao} openModalResumo={openModalResumo} setOpenModalResumo={setOpenModalResumo} pedidoConcluido={pedidoConcluido} setPedidoConcluido={setPedidoConcluido} excluirProduto={excluirProduto} finalizarPedido={finalizarPedido} />
        </div>
    )
    
}

export default Produtos;