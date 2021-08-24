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

export default function CustomCard(produto) {
  const classes = useStyles();
  const { id, nome, descricao, preco, imagem, ativo } = produto.produto;
  const { token } = useAuth();
  const [erro, setErro] = useState('');
  const [open, setOpen] = React.useState(false);
  const [carregando, setCarregando] = useState(false);

  const imagemCard = imagem ? imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro('');
    }, 3000);
    return () => {
      clearTimeout(timeout);
    }
  }, [erro])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleExcluir() { 
    setErro('');
    if (!ativo){
      try {
        const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const dados = await resposta.json();
  
        if (!resposta.ok) {
          setErro(dados);
          return;
        }
        produto.recarregar();
      } catch (error) {
        return setErro(error.message)
      }
    } else {
      setErro('Produto ativo. Não foi possível efetuar a exclusão.');
      handleClose();
      return;
    } 
    handleClose();
  };
  
  return (
    <Card key={id} className={`${classes.root} ${'cabelo'}`}>
      <div className={'eita'}>
        {erro && <Alert severity="error">{erro}</Alert>}
        <AlertDialog handleExcluir={handleExcluir} open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        <CustomModal className='modal' acao='Editar produto' produtoInfo={produto.produto} recarregar={produto.recarregar} ativo={produto.ativo} />
      </div>
      {carregando && <Loading/>}
      <CardActionArea className={`${classes.cardActionArea} ${'adc-blur'}`}>
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
    </Card>
  );
}