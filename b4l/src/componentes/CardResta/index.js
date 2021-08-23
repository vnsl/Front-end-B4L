import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../componentes/Loading';
import useAuth from '../../hook/useAuth';
import CustomModal from '../../componentes/Modal';
import AlertDialog from '../../componentes/ModalConfirmarExclusao';
import useStyles from './styles';
import './index.css';
import { useHistory } from 'react-router-dom';

export default function CustomCard({ restaurante }) {
  const classes = useStyles();
  const { id, nome, descricao, imagem, categoria_id} = restaurante;
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  const imagemCard = imagem ? imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg';


  function cardapio() {    
    history.push(`/cardapio/${id}`)
  }

  return (
    <Card key={id} onClick={cardapio} className={`${classes.root} ${'cabelo'}`}>
      {carregando && <Loading/>}
      <CardActionArea className={`${classes.cardActionArea}`}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h5" >
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ width: '300px', height: '100px', overflowY: 'auto', textAlign: 'left'}} >
            {descricao}
          </Typography>
          <CardActions>
            <Button variant="contained" size="small">
              R$VALOR
            </Button>
          </CardActions>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={imagemCard}
          title={nome}
        />
      </CardActionArea>
    </Card>
  );
}