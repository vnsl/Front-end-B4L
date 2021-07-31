import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Loading from '../Loading';
import Alert from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepsControl: {
    width: '30%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['', '', ''];
}

function getStepContent(step, register, categorias) {
  switch (step) {
    case 0:
      return (
        <div className='cadastro'>
            <TextField key='nome' className='textarea' label="Nome de usuário" {...register('nome')} type='text'/>
            <TextField key='email' className='textarea' label="Email" {...register('email')} type='text'/>
            <TextField key='senha' className='textarea' label="Senha" {...register('senha')} type='password'/>
            <TextField key='senhaRepetida' className='textarea' label="Repita a senha" {...register('senhaRepetida')} type='password'/>                   
        </div>
      );
    case 1:
      return (
        <div className='cadastro'>
            <TextField key='restaurante.nome'className='textarea' label="Nome do restaurante" {...register('restaurante.nome')} type='text'/>
            <TextField key='restaurante.idCategoria' className='textarea' label="Categoria" {...register('restaurante.idCategoria')} select type='number'>
                {categorias.map((opcao) => (
                    <MenuItem key={opcao.id} value={opcao.id}>
                        {opcao.nome}
                    </MenuItem>
                ))}
            </TextField>
            <TextField key='restaurante.descricao' className='textarea' label="Descrição" {...register('restaurante.descricao')} type='text'/>                   
        </div>
      );
    case 2:
      return (
        <div className='cadastro'>
            <TextField key='restaurante.taxaEntrega' className='textarea' label="Taxa de entrega" {...register('restaurante.taxaEntrega')} type='number'/>
            <TextField key='restaurante.tempoEntregaEmMinutos' className='textarea' label="Tempo estimado de entrega" {...register('restaurante.tempoEntregaEmMinutos')} type='number'/>
            <TextField key='restaurante.valorMinimoPedido' className='textarea' label="Valor mínimo do pedido" {...register('restaurante.valorMinimoPedido')} type='number'/>                   
        </div>
      );
    default:
      return 'Cadastro efetuado com sucesso.';
}
}

export default function StepperHorizontal() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  const { categorias } = useAuth();

  const handleNext = (data) => {
    setErro('');
    
    if(activeStep === 0) {
      if (!data.nome) {
        setErro('Nome obrigatório');
        return;
      }
  
      if (!data.email) {
        setErro('Email obrigatório');
        return;
      }
      
      if (!data.senha) {
        setErro('Senha obrigatória');
        return;
      }
      
      if (data.senha !== data.senhaRepetida) {
        setErro('Senhas não conferem.');
        return;
      }
    } else 

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setErro('');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
  
    try {

      if(!data.restaurante.nome){
        setErro('Precisa preencher algo!');
        setCarregando(false);
      }

      const resposta = await fetch('http://localhost:3000/usuarios', {
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

      if (resposta.ok) {
        handleNext();
      }
      history.push('/');
    } catch (error) {
      setErro(error.message)
    }
  };

  return (
    <div className={classes.root}>
      <div className='container'>
        <h1>Cadastro</h1>
        <Stepper className={classes.stepsControl} activeStep={activeStep}>
      
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step className={classes.stepsControl} key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </div>
      <div>
        
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, register, categorias)}</Typography>
            <div>
              {carregando && <Loading/>}
              {erro && <Alert severity="error">{erro}</Alert>}
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Voltar
              </Button>
              {activeStep === steps.length - 1 ? 
                <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                className={classes.button}
                >Criar conta</Button> : 
                <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleNext)}
                className={classes.button}
                >Próximo</Button>
              }
            </div>
          </div>

      </div>
    </div>
  );
}
