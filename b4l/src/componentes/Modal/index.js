import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Loading from '../Loading';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

import useAuth from '../../hook/useAuth';

export default function CustomModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const history = useHistory();
  const { token } = useAuth();

  const { id, nome, preco, descricao } = props.produtoInfo ?? '';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(data) {
    setCarregando(true);
        setErro('');
        
        try {
          if (props.acao === 'Novo produto') {
            const resposta = await fetch('http://localhost:3000/produtos', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            
            const dados = await resposta.json();
            
            setCarregando(false);
            
            if (!resposta.ok) {
              setErro(dados);
              return;
            }
          } else {
            const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            
            const dados = await resposta.json();
            
            setCarregando(false);
            
            if (!resposta.ok) {
              setErro(dados);
              return;
            }
          }
          
          handleClose();
          props.recarregar();
          
        } catch (error) {
          setErro(error.message)
        }
  }

  const body = (
    <div className={classes.paper}>
        <div className={classes.main}>
          <div className={classes.fields}>
              <h2 id="custom-modal-title">{props.acao}</h2>
              <TextField key='produto.nome' className='textarea' label="Nome" type='text' {...register('nome')} defaultValue={nome}/>
              <TextField key='produto.descricao' className='textarea' label="Descrição" type='text' {...register('descricao')} value={descricao}/>
              <TextField key='preco' className='textarea' label="Valor" type='number' {...register('preco')} value={preco}/>
              {carregando && <Loading/>}
              {erro && <Alert severity="error">{erro}</Alert>}
          </div>
          <div className={classes.imgUpload}>
          </div>
        </div>
        <div className={classes.containerSwitches}>

        </div>
        <div className={classes.containerBotoes}>
            <div className={classes.botoes}>
                <Button type="button" color="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                {props.acao === 'Novo produto' ? 
                  <Button variant="contained" type="button" color="secondary" onClick={handleSubmit(onSubmit)}>
                  Adicionar produto ao cardápio
                  </Button> :
                  <Button variant="contained" type="button" color="secondary" onClick={handleSubmit(onSubmit)}>
                  Salvar alterações
                  </Button>
                }
                
            </div>
        </div>
    </div>
  );

  return (
    <div>
      {props.acao === 'Novo produto' ? 
        <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
        Adicionar produto ao cardápio
        </Button> :
        <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
        Editar produto
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}