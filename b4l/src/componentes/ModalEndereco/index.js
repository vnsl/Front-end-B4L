import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading';
import useStyles from './styles';
import { ReactComponent as ImagemCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as BotaoFecharModal } from '../../assets/botao-close-modal.svg';
import { ReactComponent as Sucesso } from '../../assets/sucess-icon.svg';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';
import InputText from '../InputText';
import { Typography } from '@material-ui/core';

import './index.css';

export default function ModalEndereco({ openModalResumo }) {
  const classes = useStyles();
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const { token, userPersistido } = useAuth();
  const { handleSubmit, control } = useForm();
  const [ endereco, setEndereco ] = useState('');
  const [ adicionado, setAdicionado ] = useState(false);
  
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function cadastrarEndereco(data) {
    console.log(data);
    setAdicionado(true);
  }

  function voltando() {
    setAdicionado(false);
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
          >
            <InputText name='cep' label='CEP' control={control}/>
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
            <Sucesso/>
            <h2>Endereço adicionado com sucesso!</h2>
            <Button 
                className={classes.botaoConfirmarPedido} 
                type="button" 
                color="secondary"
                onClick={voltando}
              >
              Voltar para o carrinho
              </Button>
          </div>}
        </div>
      </Modal>
    </div>
  );
}