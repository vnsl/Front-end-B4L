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
  const [imagem, setImagem] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, categoriasPersistidas, userPersistido, setUserPersistido } = useAuth();
  
  const { id, nome, email } = userPersistido;
  const restaurante = userPersistido.restaurante;
  const { id: idRestaurante, nome: nomeRestaurante, categoria_id, descricao: descricaoRestaurante, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido } = restaurante;

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

    if(baseImage) {
      const envio = {
        id: idRestaurante,
        nome: nomeRestaurante,
        pasta: 'restaurante',
        imagem: baseImage
      }
      try {
        const resposta = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: JSON.stringify(envio),
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        const dados = await resposta.json();
        setImagem(dados);
        
        if (!resposta.ok) {
          return setErro(dados);
        }
  
      } catch (error) {
        setErro(error.message)
      }
    }

    const usuario = {
      id: userPersistido.id,
      nome: data.nome ?? userPersistido.nome,
      email: data.email ?? userPersistido.email,
      restaurante: {
        id: idRestaurante ?? userPersistido.restaurante.id,
        usuario_id: userPersistido.id,
        nome: data.restaurante.nome ?? nomeRestaurante,
        descricao: data.restaurante.descricao ?? descricaoRestaurante,
        idCategoria: data.restaurante.idCategoria ?? categoria_id,
        taxaEntrega: data.restaurante.taxaEntrega ?? taxa_entrega,
        tempoEntregaEmMinutos: data.restaurante.tempo_entrega_minutos ?? tempo_entrega_minutos,
        valorMinimoPedido: data.restaurante.valorMinimoPedido ?? valor_minimo_pedido,
        imagem: imagem ?? ''
      }

    };

        try {
          const resposta = await fetch(`http://localhost:3000/usuarios/${userPersistido.id}`, {
              method: 'PUT',
              body: JSON.stringify(usuario),
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
          
          setUserPersistido(usuario);
          props.recarregar();
          handleClose();

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
              <InputText name='nome' label='Usuário' control={control} defaultValue={nome}/>
              <InputText name='email' label='Email' control={control} defaultValue={email}/>
              <InputText name='restaurante.nome' label='Nome do restaurante' control={control} defaultValue={nomeRestaurante}/>
              <Controller
                name='restaurante.idCategoria'
                control={control}
                render={({ field }) => <TextField 
                    variant="outlined" 
                    className='textarea' 
                    label="Categoria"
                    defaultValue={categoria_id} 
                    select 
                    type='number'
                    {...field}>
                        {categoriasPersistidas.map((opcao) => (
                            <MenuItem key={opcao.id} value={opcao.id}>
                            {opcao.nome}
                            </MenuItem>
                        ))}
                    
                    </TextField>}
              />        
              <Controller
                name='restaurante.descricao'
                control={control}
                render={({ field }) => <TextField 
                    variant="outlined" 
                    multiline 
                    rows={3} 
                    helperText="Máx: 50 caracteres"  
                    className='textarea'
                    defaultValue={descricaoRestaurante} 
                    label="Descrição"  
                    type='text'   
                    {...field}       
                /> }
              />
              <InputDinheiro name='restaurante.taxaEntrega' label='Taxa de entrega' control={control} defaultValue={taxa_entrega}/>
              <InputText name='restaurante.tempo_entrega_minutos' label="Tempo estimado de entrega" control={control} defaultValue={tempo_entrega_minutos}/>
              <InputDinheiro name='restaurante.valorMinimoPedido' label='Valor mínimo do pedido' control={control} defaultValue={valor_minimo_pedido}/>
              <InputSenha name='senhaAtual' label='Senha atual' control={control} />
              <InputSenha name='novaSenha' label='Nova senha' control={control} />
              <InputSenha name='novaSenhaRepetida' label='Repita a nova senha' control={control} />
            </div>
            
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