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
  const { token, userPersistido, setUserPersistido } = useAuth();
  
  const { nome, email, telefone, imagem } = userPersistido;
  
  const imagemPerfil = baseImage ? baseImage : (imagem ? imagem : 'data:image/png;base64,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');

  const defaultValues = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    nova_senha: '',
    nova_senha_repetida: ''
  };

  const { control, handleSubmit, setValue } = useForm({defaultValues});

  useEffect(() => {
    setValue('nome', nome)
    setValue('email', email)
    setValue('telefone', telefone)
  }, [nome, setValue, email, telefone])

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
    setValue('telefone', telefone);
    setOpen(false);
  };

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    if(!data.senha){
      setErro('Para altera????o do usu??rio digite a senha para confirma????o.');
      setCarregando(false);
      return;
    }

    if(!data.nome || !data.email || !data.telefone) {
      setErro('Preencha todos os campos obrigat??rios.');
      setCarregando(false);
      return;
    }

    if(data.nova_senha !== data.nova_senha_repetida) {
      setCarregando(false);
      return setErro('Nova senha e sua repeti????o n??o conferem.');
    }
    
    let imagemPerfil = "";

    if(baseImage) {
      const envio = {
        imagem: baseImage
      }
    
      try {
        const resposta = await fetch('http://localhost:3001/upload', {
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
      telefone: data.telefone ?? userPersistido.telefone,
      senha: data.senha ?? '',
      nova_senha: data.nova_senha ?? ''
    };

        try {
          const resposta = await fetch(`http://localhost:3001/consumidores/${userPersistido.id}`, {
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
              <h2>Editar usu??rio</h2>
              <div className={classes.dadosUsuario}>
                <InputText name='nome' label='Usu??rio' control={control} defaultValue={nome}/>
                <InputText name='email' label='Email' control={control} defaultValue={email}/>
                <InputText name='telefone' label='Telefone' control={control} defaultValue={telefone}/>
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
                    Salvar altera????es
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