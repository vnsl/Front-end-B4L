import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Loading from '../Loading';
import InputSenha from '../InputSenha/';
import InputText from '../InputText';
import InputDinheiro from '../InputDinheiro';
import UploadImage from '../UploadImage';

import './index.css';
import novo from '../../assets/logo-pizarria.png';

import useAuth from '../../hook/useAuth';

export default function ModalEditarUsuario(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const [ erro, setErro ] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, categoriasPersistidas, userPersistido, setUserPersistido } = useAuth();
  
  const recarregar = props.recarregar;
  const { restaurante } = props.usuario.restaurante;
  const { id, nome, email } = props.usuario;

  const handleOpen = () => {
    setErro('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

          /* setUserPersistido({
            id: userPersistido.id,
            nome: data.nome,
            email: data.email,
            restaurante: {
              id: userPersistido.restaurante.id,
              usuario_id: userPersistido.id,
              nome: data.restaurante.nome,
              descricao: data.restaurante.descricao,
              categoria_id: data.restaurante.idCategoria,
              taxa_entrega: data.restaurante.taxaEntrega,
              tempo_entrega_minutos: data.restaurante.tempoEntregaEmMinutos,
              valor_minimo_pedido: data.restaurante.valor_minimo_pedido
            }

          }); */
          
          if (!resposta.ok) {
            setErro(dados);
            return;
          }
          
          // recarregar();
          handleClose();
          console.log(userPersistido);


        } catch (error) {
          setErro(error.message)
        }

  }

  const body = (
    <div className={classes.paper}>
        <div className={classes.content}>
          <div className={classes.fields}>
            <h2>Editar usuário</h2>
            <div className={classes.dadosUsuario}>
              <InputText name='nome' label='Usuário' control={control}/>
              <InputText name='email' label='Email' control={control}/>
              <InputText name='restaurante.nome' label='Nome do restaurante' control={control}/>
                      
              {/* <TextField variant="outlined" 
                key='restaurante.idCategoria' 
                className='textarea' 
                label="Categoria" 
                {...register('restaurante.idCategoria')} 
                select type='number'
                defaultValue={userPersistido.restaurante.categoria_id}
              >
                  {categoriasPersistidas.map((opcao) => (
                    <MenuItem key={opcao.id} value={opcao.id}>
                    {opcao.nome}
                    </MenuItem>
                    ))}
              </TextField> */}
              {/* <TextField 
                variant="outlined" 
                multiline rows={2} 
                helperText="Máx: 50 caracteres" 
                key='restaurante.descricao' 
                className='textarea' 
                label="Descrição" 
                {...register('restaurante.descricao')} 
                type='text'
                defaultValue={userPersistido.restaurante.descricao}
              /> */}
              <InputDinheiro name='restaurante.taxaEntrega' label='Taxa de entrega' control={control}/>
              <InputText name='restaurante.tempoEntregaEmMinutos' label="Tempo estimado de entrega" control={control}/>
              <InputDinheiro name='restaurante.valorMinimoPedido' label='Valor mínimo do pedido' control={control}/>
              
              
            </div>
            <InputSenha name='senha' label='Senha Atual' control={control}/>
            <InputSenha name='novaSenha' label='Nova Senha' control={control}/>
            <InputSenha name='Repita a nova senha' label='Repita a nova senha' control={control}/>
            
            {carregando && <Loading/>}
            {erro && <Alert severity="error">{erro}</Alert>}
          </div>
          <UploadImage baseImage={baseImage} setBaseImage={setBaseImage} />
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