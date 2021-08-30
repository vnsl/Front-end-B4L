import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import novo from '../../assets/logo.png';

import useAuth from '../../hook/useAuth';

export default function ModalEditarUsuario(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ erro, setErro ] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, categoriasPersistidas, userPersistido, setUserPersistido } = useAuth();
  
  const { nome, email } = userPersistido;
  const restaurante = userPersistido.restaurante;
  const { id: id_restaurante, nome: nome_restaurante, categoria_id, descricao, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido, imagem } = restaurante;

  const imagemPerfil = baseImage ? baseImage : (imagem ? imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg');

  const defaultValues = {
    nome: '',
    email: '',
    restaurante: {
      nome: '',
      categoria_id: '',
      descricao: '',
      taxa_entrega: '',
      tempo_entrega_minutos: '',
      valor_minimo_pedido: '',
      senha: '',
      nova_senha: '',
      nova_senha_repetida: ''
    }
  };

  const { control, handleSubmit, setValue } = useForm({defaultValues});

  useEffect(() => {
    setValue('nome', nome)
    setValue('email', email)
    setValue('restaurante.nome', nome_restaurante)
    setValue('restaurante.categoria_id', categoria_id)
    setValue('restaurante.descricao', descricao)
    setValue('restaurante.taxa_entrega', taxa_entrega)
    setValue('restaurante.tempo_entrega_minutos', tempo_entrega_minutos)
    setValue('restaurante.valor_minimo_pedido', valor_minimo_pedido)
  }, [nome, setValue, email, descricao, nome_restaurante, categoria_id, taxa_entrega, valor_minimo_pedido, tempo_entrega_minutos])

  const handleOpen = () => {
    setValue('senha', '');
    setValue('nova_senha', '');
    setValue('nova_senha_repetida', '');
    setErro('');
    setOpen(true);
  };

  const handleClose = () => {
    setValue('nome', nome);
    setValue('email', email);
    setValue('restaurante.nome', nome_restaurante);
    setValue('restaurante.categoria_id', categoria_id);
    setValue('restaurante.descricao', descricao);
    setValue('restaurante.taxa_entrega', taxa_entrega);
    setValue('restaurante.tempo_entrega_minutos', tempo_entrega_minutos);
    setValue('restaurante.valor_minimo_pedido', valor_minimo_pedido);
    setOpen(false);
  };

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    if(!data.senha){
      setErro('Para alteração do usuário digite a senha para confirmação.');
      setCarregando(false);
      return;
    }

    if(!data.nome || !data.email || !data.restaurante.nome || !data.restaurante.categoria_id || !data.restaurante.taxa_entrega || !data.restaurante.tempo_entrega_minutos || !data.restaurante.valor_minimo_pedido) {
      setErro('Preencha todos os campos obrigatórios.');
      setCarregando(false);
      return;
    }

    if(data.nova_senha !== data.nova_senha_repetida){
      setCarregando(false);
      return setErro('Nova senha e sua repetição não conferem.');
    }
    
    let imagemPerfil = "";

    if(baseImage) {
      const envio = {
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
        imagemPerfil = dados;
        
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
      senha: data.senha ?? '',
      nova_senha: data.nova_senha ?? '',
      restaurante: {
        id: id_restaurante ?? userPersistido.restaurante.id,
        usuario_id: userPersistido.id,
        nome: data.restaurante.nome ?? nome_restaurante,
        descricao: data.restaurante.descricao ?? descricao,
        categoria_id: data.restaurante.categoria_id ?? categoria_id,
        taxa_entrega: data.restaurante.taxa_entrega ?? taxa_entrega,
        tempo_entrega_minutos: data.restaurante.tempo_entrega_minutos ?? tempo_entrega_minutos,
        valor_minimo_pedido: data.restaurante.valor_minimo_pedido ?? valor_minimo_pedido,
        imagem: imagemPerfil,
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
          <div className={classes.leftContent}>
            <div className={classes.fields}>
              <h2>Editar usuário</h2>
              <div className={classes.dadosUsuario}>
                <InputText name='nome' label='Usuário' control={control} defaultValue={nome}/>
                <InputText name='email' label='Email' control={control} defaultValue={email}/>
                <InputText name='restaurante.nome' label='Nome do restaurante' control={control} defaultValue={nome_restaurante}/>
                <Controller
                  name='restaurante.categoria_id'
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
                      style={{marginBottom: '40px'}}
                      multiline 
                      rows={3} 
                      helperText="Máx: 50 caracteres"  
                      className='textarea'
                      defaultValue={descricao} 
                      label="Descrição"  
                      type='text'   
                      {...field}       
                  /> }
                />
                <InputDinheiro name='restaurante.taxa_entrega' label='Taxa de entrega' control={control} defaultValue={taxa_entrega}/>
                <InputText name='restaurante.tempo_entrega_minutos' label="Tempo estimado de entrega" control={control} defaultValue={tempo_entrega_minutos}/>
                <InputDinheiro name='restaurante.valor_minimo_pedido' label='Valor mínimo do pedido' control={control} defaultValue={valor_minimo_pedido}/>
                <InputSenha name='senha' label='Senha atual' control={control} />
                <InputSenha name='nova_senha' label='Nova senha' control={control} />
                <InputSenha name='nova_senha_repetida' label='Repita a nova senha' control={control} />
              </div>
              
              {carregando && <Loading/>}
              {erro && <Alert severity="error">{erro}</Alert>}
            </div>
          </div>
          <div className={classes.rightContent}>  
            <div className={classes.containerImg} >
              <img className={classes.imgUpload} src={imagemPerfil} alt="" />
              <UploadImage setBaseImage={setBaseImage} />
            </div>
            <div className={classes.botoes}>
                  <Button 
                    className={classes.botaoCancelar} 
                    type="button" 
                    color="secondary" 
                    onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button 
                    className={classes.botaoAlterar} 
                    variant="contained" 
                    type="button" 
                    color="secondary" 
                    onClick={handleSubmit(onSubmit)}>
                    Salvar alterações
                  </Button>                
            </div>
          </div>                        
        </div>        
    </div>
  );

  return (
    <div>
      <img 
        className='logo' 
        // src={props.logo ?? novo} 
        src={imagemPerfil} 
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