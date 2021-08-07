import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Loading from '../Loading';
import InputSenha from '../InputSenha/index';
import UploadImage from '../UploadImage';

import './index.css';
import novo from '../../assets/logo-pizarria.png';

import useAuth from '../../hook/useAuth';

export default function ModalEditarUsuario(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, categorias, setCategorias, userPersistido } = useAuth();
  
  
  const recarregar = props.recarregar;

  const handleOpen = () => {
    console.log(categorias);
    if (props.acao === 'Editar Perfil') {
      setErro('');
    }
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

    async function listarCategorias() {
        setCarregando(true);
        
        const resposta = await fetch('http://localhost:3000/categorias', {
          method: 'GET',
          body: JSON.stringify(),
          headers: {
            'Content-type': 'application/json',
          }
        });
        const categorias = await resposta.json();
        
        setCategorias(categorias);
        setCarregando(false);
      };
    
      useEffect(() => {
        listarCategorias();
      }, []);

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

        try {
          
          const resposta = await fetch(`http://localhost:3000/usuarios/${userPersistido.id}`, {
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
          
          recarregar();
          handleClose();

        } catch (error) {
          setErro(error.message)
        }

  }

  const body = (
    <div className={classes.paper}>
        <h2 className={classes.title} >{props.acao}</h2>
        <div className={classes.content}>
          <div className={classes.fields}>
            <div className={classes.dadosUsuario}>
              <TextField 
                variant="outlined" 
                key='nome' 
                className='textarea' 
                label="Nome de usuário" 
                {...register('nome')} 
                type='text' 
                defaultValue={userPersistido.nome} 
              />
              <TextField 
                variant="outlined" 
                key='email' 
                className='textarea' 
                label="Email" 
                {...register('email')} 
                type='text' 
                defaultValue={userPersistido.email} 
              />
            </div>
            <div className="dados-restaurante" >
              <TextField 
                variant="outlined" 
                key='restaurante.nome'
                className='textarea' 
                label="Nome do restaurante" 
                {...register('restaurante.nome')} 
                type='text' 
                defaultValue={userPersistido.restaurante.nome} 
            />
              <TextField variant="outlined" 
                key='restaurante.idCategoria' 
                className='textarea' 
                label="Categoria" 
                {...register('restaurante.idCategoria')} 
                select type='number'
                defaultValue={userPersistido.restaurante.categoria_id}
              >
                  {categorias.map((opcao) => (
                    <MenuItem key={opcao.id} value={opcao.id}>
                    {opcao.nome}
                    </MenuItem>
                    ))}
              </TextField>
              <TextField 
                variant="outlined" 
                multiline rows={2} 
                helperText="Máx: 50 caracteres" 
                key='restaurante.descricao' 
                className='textarea' 
                label="Descrição" 
                {...register('restaurante.descricao')} 
                type='text'
                defaultValue={userPersistido.restaurante.descricao}
              />
              <TextField 
                variant="outlined" 
                key='restaurante.taxaEntrega' 
                className='textarea' 
                label="Taxa de entrega" 
                {...register('restaurante.taxaEntrega')} 
                type='number' 
                InputProps={{
                  startAdornment: 
                    <InputAdornment position="start">
                      R$
                    </InputAdornment>,
                }} 
                defaultValue={userPersistido.restaurante.taxa_entrega}
              />
              <TextField 
                variant="outlined" 
                key='restaurante.tempoEntregaEmMinutos' 
                className='textarea' 
                label="Tempo estimado de entrega" 
                {...register('restaurante.tempoEntregaEmMinutos')} 
                type='number'
                defaultValue={userPersistido.restaurante.tempo_entrega_minutos}
              />
              <TextField 
                variant="outlined" 
                key='restaurante.valorMinimoPedido' 
                className='textarea' 
                label="Valor mínimo do pedido" 
                {...register('restaurante.valorMinimoPedido')} 
                type='number' 
                InputProps={{
                  startAdornment: 
                    <InputAdornment position="start">
                      R$
                    </InputAdornment>,
                }} 
                defaultValue={userPersistido.restaurante.valor_minimo_pedido}
              /> 
            </div>
            <InputSenha 
              register={() => register('senha')} 
              label='Senha Atual'
            />
            <InputSenha 
              register={() => register('novaSenha')} 
              label='Nova Senha'
            />
            <InputSenha 
              register={() => register('senhaRepetida')} 
              label='Repita a nova senha'
            />
            {carregando && <Loading/>}
            {erro && <Alert severity="error">{erro}</Alert>}
          </div>
          <UploadImage />
        </div>
        <div className={classes.containerBotoes}>
            <div className={classes.botoes}>
                <Button 
                    type="button" 
                    color="secondary" 
                    onClick={handleClose}>
                      Cancelar
                </Button>
                <Button 
                  variant="contained" 
                  type="button" 
                  color="secondary" 
                  onClick={handleSubmit(onSubmit)}>
                    Salvar alterações
                </Button>                
            </div>
        </div>
    </div>
  );

  return (
    <div>
      <img 
        className='logo' 
        src={novo} 
        alt="" 
        onClick={handleOpen}
      />
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