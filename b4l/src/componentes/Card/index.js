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
  const [imgProduto, setImgProduto] = useState('');
  const [carregando, setCarregando] = useState(false);

  const imagemCard = imagem ? imagem : imgProduto;

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
    produto.produto.imagem = imgProduto;
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
    <Card key={id} className={classes.root, 'cabelo'}>
      <div className={'eita'}>
        {erro && <Alert severity="error">{erro}</Alert>}
        <AlertDialog handleExcluir={handleExcluir} open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        {/* <Button onClick={handleExcluir}>Excluir produto do catalogo</Button> */}
        <CustomModal className='modal' acao='Editar produto' produtoInfo={produto.produto} recarregar={produto.recarregar} ativo={produto.ativo} imgProduto={imgProduto} setImgProduto={setImgProduto} />
      </div>
      {carregando && <Loading/>}
      <CardActionArea className={classes.cardActionArea, 'adc-blur'}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descricao}
          </Typography>
          <CardActions>
            {/* <Button variant="contained" size="small">
              R$ {(preco / 100).toFixed([2]) }
            </Button> */}
            <Button variant="contained" size="small">
              R$ {(preco).toFixed([2]) }
            </Button>
          </CardActions>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={imagem}
          title={nome}
        />
      </CardActionArea>
    </Card>
  );
}

/* "data:image/jpeg;base64,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" */