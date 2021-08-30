import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BotaoExcluirProduto } from '../../assets/icone-lixeira.svg';

import useStyles from './styles';

export default function CardCarrinho({ itemCarrinho, excluirProduto, setOpenModalDetalhe, setCarrinhoVisivel, setDadosProduto, setAcao }) {
  const classes = useStyles();
  const history = useHistory();

  // const imagemCard = imagem ? imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg';
  
  const unidade = itemCarrinho.quantidade_produto > 1 ? "unidades" : "unidade";

  const handleOpenEditarProduto = () => {
    setAcao("editar");
    setCarrinhoVisivel(false);
    setOpenModalDetalhe(true);
    setDadosProduto(itemCarrinho);
  };

  return (
    <Card key={itemCarrinho.produto_id} className={`${classes.cardCarrinho}`}>
      <CardActionArea className={`${classes.cardActionArea}`} onClick={handleOpenEditarProduto} >
        <CardMedia
          className={classes.media}
          image={itemCarrinho.imagem}
          title={itemCarrinho.nome}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h5" style={{ fontSize: '20px'}} >
            {itemCarrinho.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ display: 'flex', gap: 5 }} >
            {itemCarrinho.quantidade_produto} 
            <div>
              {unidade}
            </div>
          </Typography>
          <div className={classes.containerCustoTotalProduto}>
            <Typography className={classes.custoTotalProduto} variant="body2" color="textPrimary" component="p" style={{ cursor: 'default' }} >
              R$ {itemCarrinho.custo_total_produto && (itemCarrinho.custo_total_produto).toFixed([2]) }
            </Typography>
          </div>  
        </CardContent>
      </CardActionArea>
        <BotaoExcluirProduto fill="red" className={classes.botaoExcluir} onClick={() => excluirProduto(itemCarrinho.produto_id)} />
    </Card>
  );
}