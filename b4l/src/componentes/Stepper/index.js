import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import Alert from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

import Step1 from '../CadastroForm1';
import Step2 from '../CadastroForm2';
import Step3 from '../CadastroForm3';

import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  stepsControl: {
    width: '50%',
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderRadius: 20,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['', '', ''];
}

function getStepContent(step, register, categorias, control) {

  switch (step) {
    case 0:
      return (
        <Step1 control={control}/>
      );
      case 1:
        return (
          <Step2 control={control} categorias={categorias}/>
      );
      case 2:
        return (
          <Step3 control={control}/>
      );
      default:
        return 'Cadastro efetuado com sucesso.';
      }
    }
    
    export default function StepperHorizontal() {
      const classes = useStyles();
      const [activeStep, setActiveStep] = useState(0);
      const steps = getSteps();
      
      const { register, handleSubmit, control } = useForm();
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
        }

        if(activeStep === 1) {
          if (!data.restaurante.nome) {
            setErro('Nome do restaurante é obrigatório');
            return;
          }
          
          if (!data.restaurante.categoria_id) {
            setErro('Selecione uma categoria');
            return;
          }
        }

        if(activeStep === 2) {
          if (!data.restaurante.taxaEntrega) {
            setErro('Insira um valor de taxa de entrega');
            return;
          }
          
          if (!data.restaurante.tempoEntregaEmMinutos) {
            setErro('Indique o tempo estimado de entrega em minutos');
            return;
          }

          if (!data.restaurante.valorMinimoPedido) {
            setErro('Indique o valor mínimo do pedido');
            return;
          }
        }
        
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
          
          history.push('/');
        } catch (error) {
          setErro(error.message)
        }
      };
      
      return (
        <div className={classes.root}>
          <div className='container'>
            <div className="title" >

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
          </div>
          <div>
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep, register, categorias, control)}</Typography>
              <div className="container-bottom" >
                {carregando && <Loading/>}
                {erro && <Alert severity="error">{erro}</Alert>}
                <div className="container-botoes">
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Anterior
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
                    color="secondary"
                    onClick={handleSubmit(handleNext)}
                    className={classes.button}
                    >Próximo</Button>
                  }
                </div>
                <Typography className="cadastrado" >Já tem uma conta? <Link to='/'>Login</Link></Typography>               
              </div>
            </div>

        </div>
    </div>
  );
}
