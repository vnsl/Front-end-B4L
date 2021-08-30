import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

export default function CardPedidoFinalizado({ itemPedido }) {
  const classes = useStyles();
  
  const unidade = itemPedido.qtd_produto > 1 ? "unidades" : "unidade";

  return (
    <Card key={itemPedido.produto_id} className={`${classes.cardCarrinho}`}>
      <CardActionArea className={`${classes.cardActionArea}`} >
        <CardMedia
          className={classes.media}
          image={itemPedido.imagem_produto}
          title={itemPedido.nome_produto}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h5" style={{ fontSize: '20px'}} >
            {itemPedido.nome_produto}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ display: 'flex', gap: 5 }} >
            {itemPedido.qtd_produto} 
            <div>
              {unidade}
            </div>
          </Typography>
          <div className={classes.containerCustoTotalProduto}>
            <Typography className={classes.custoTotalProduto} variant="body2" color="textPrimary" component="p" style={{ cursor: 'default' }} >
              R$ {itemPedido.valor_total && (itemPedido.valor_total).toFixed([2]) }
            </Typography>
          </div>  
        </CardContent>
      </CardActionArea>
    </Card>
  );
}