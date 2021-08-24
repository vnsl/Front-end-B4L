import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import CadastroFormConsumidor from '../../componentes/CadastroFormConsumidor';
import Loading from '../../componentes/Loading';
import ImagemApp from "../../assets/imagem-app.svg";
import ImagemBarril from "../../assets/logo-consumidor.svg";

import './index.css';
import useStyles from './styles';

function CadastroConsumidor() {
    const classes = useStyles();
    const [carregando, setCarregando] = useState(false);
    const [ erro, setErro ] = useState('');
    const { handleSubmit, control } = useForm();
    const history = useHistory();   

    async function onSubmit(data) {
      setErro('');

      if (!data.nome) {
        setErro('Nome é obrigatório');
        return;
      }
      
      if (!data.email) {
        setErro('Email é obrigatório');
        return;
      }
  
      if (!data.telefone || data.telefone.includes(' ')) {
        setErro('Telefone é obrigatório');
        return;
      }

      if (data.telefone.length <= 13) {
        setErro('Telefone deve conter o DDD, seguido de 9 dígitos');
        return;
      }
      
      if (!data.senha) {
        setErro('Senha é obrigatória');
        return;
      }
      
      if (data.senha !== data.senhaRepetida) {
        setErro('Senhas não conferem.');
        return;
      }

      setCarregando(true);
      
      try {
        
        const resposta = await fetch('http://localhost:3001/consumidores', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json'
          }
        })
        
        const dados = await resposta.json();
        
        setCarregando(false);
        
        if (!resposta.ok) {
          setErro(dados);
          return;
        }
        
        history.push('/loginconsumidor');
      } catch (error) {
        setErro(error.message)
      }
    };

    return (
      <div className="main-screen">
        <div className="div-img">
          <div className="container-img-barril">
            <img className="img-barril" src={ImagemBarril} alt="" />
          </div>
          <img className="img-app" src={ImagemApp} alt="" />
        </div>
        <div className="caixa-consumidor">
          <div className="content-consumidor">
            <div className="title">
              <h1>Cadastro</h1>
            </div>
            <div className="container-form">
              <CadastroFormConsumidor control={control} />
            </div>
            {carregando && <Loading/>}
            {erro && <Alert severity="error">{erro}</Alert>}
            <div className="container-botoes">
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                className={classes.button}
              >
                Criar conta
              </Button> 
            </div>
            <Typography className="bottom-text" >Já tem uma conta? <Link to='/loginconsumidor'>Login</Link></Typography>
          </div>
        </div>
      </div>
      
    )
}

export default CadastroConsumidor;