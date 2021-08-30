import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';
import sucesso from '../../assets/sucess-icon.png';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';
import InputText from '../InputText';
import InputTextCEP from '../InputTextCEP';
import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalEndereco({ openModalResumo, setEndereco }) {
  const classes = useStyles();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const { token, userPersistido, setUserPersistido } = useAuth();
  const { handleSubmit, control } = useForm();
  const [ adicionado, setAdicionado ] = useState(false);
  
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function cadastrarEndereco(data) {
  
    const enderecoEnvio = {
      cep: data.cep,
      endereco: data.endereco,
      complemento: data.complemento,
    }
    
    setCarregando(true);
    setErro('');

    if(!data.endereco || !data.cep) {
      setCarregando(false);
      setErro('Endereço e CEP são obrigatórios.');
      return;
    }
    
    try {
      const resposta = await fetch('http://localhost:3001/endereco', {
        method: 'PUT',
        body: JSON.stringify(enderecoEnvio),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const dados = await resposta.json();
      
      setCarregando(false);
      
      if (!resposta.ok) {
        return setErro(dados);
      }
      
      setEndereco(enderecoEnvio);

      const updateUser = {
        id: userPersistido.id,
        email: userPersistido.email,
        nome: userPersistido.nome,
        telefone: userPersistido.telefone,
        endereco: {
          endereco: enderecoEnvio.endereco,
          cep: enderecoEnvio.cep,
          complemento: enderecoEnvio.complemento
        }
      }

      setUserPersistido(updateUser);
      setAdicionado(true);
      
    } catch (error) {
      setErro(error.message)
    }

  }

  return (
    <div className='modal-endereco'>
      <p onClick={handleOpen}> {openModalResumo && "Adicionar Endereço"}</p>
      <Modal
        className='try'
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="card-endereco">
        <BotaoFecharModal style={{ cursor: "pointer"}} onClick={handleClose} />
          <div className="nome-restaurante">
            <ImagemCarrinho style={{ width: '48px'}} />
            <Typography variant="h4" color="textSecondary" component="p">
              Adicionar Endereço
            </Typography>
          </div>
          { !adicionado && <form
            onSubmit={handleSubmit(cadastrarEndereco)}
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <InputTextCEP name='cep' label='CEP' control={control} />
            <InputText name='endereco' label='Endereço' control={control}/>
            <InputText name='complemento' label='Complemento' control={control}/>
            {carregando && <Loading/>}
            {erro && <Alert severity="error">{erro}</Alert>}
            <div className="container-botao">
              <Button 
                className={classes.botaoConfirmarPedido} 
                type="submit" 
                color="secondary" 
              >
                Adicionar Endereço
              </Button>
            </div>
          </form>}
          { adicionado && <div>
            <img src={sucesso} alt="" />
            <h2>Endereço adicionado com sucesso!</h2>
            <Button 
                className={classes.botaoConfirmarPedido} 
                type="button" 
                color="secondary"
                onClick={handleClose}
              >
              Voltar para o carrinho
              </Button>
          </div>}
        </div>
      </Modal>
    </div>
  );
}