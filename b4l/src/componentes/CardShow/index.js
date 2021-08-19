import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModalDetalhePedido from '../../componentes/ModalDetalhePedido';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

export default function CustomCard({ produto, restaurante, handleOpenModalResumo, openModalDetalhe, setOpenModalDetalhe, handleClose}) {
  const classes = useStyles();
  const { id, nome, descricao, preco, imagem } = produto;
  const history = useHistory();

  const imagemCard = imagem ? imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg';
  
  const handleOpen = () => {
    setOpenModalDetalhe(true);
  };

  return (
    <Card key={id} className={`${classes.root}`} onClick={handleOpen} >
      <CardActionArea className={`${classes.cardActionArea}`}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2" >
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descricao}
          </Typography>
          <CardActions>
            <Button variant="contained" size="small">
              R$ {(preco).toFixed([2]) }
            </Button>
          </CardActions>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={imagemCard}
          title={nome}
        />
      </CardActionArea>
      <ModalDetalhePedido restaurante={restaurante} produto={produto} openModalDetalhe={openModalDetalhe} setOpenModalDetalhe={setOpenModalDetalhe} handleOpenModalResumo={handleOpenModalResumo} handleClose={handleClose} />
    </Card>
  );
}