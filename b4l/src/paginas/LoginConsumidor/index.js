import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../componentes/Loading';
import InputSenha from '../../componentes/InputSenha';
import { ReactComponent as BarrilLogo } from '../../assets/logo-barril.svg';

import './index.css';

import useStyles from './styles';

import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hook/useAuth';

function LoginConsumidor() {
    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { logar, setConsumidor } = useAuth();

    async function onSubmit(data) {
        setCarregando(true);
        setErro('');

        try {
          const resposta = await fetch('http://localhost:3001/login', {
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
          
          logar(dados.token, dados.consumidor);
          setConsumidor(true);

          history.push('/restaurantes');

        } catch (error) {
          setErro(error.message)
        }
    };

  return (
    <div className={classes.card}>
        <form 
          className={classes.root} 
          noValidate 
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
            <div className={classes.containerLogin} >
                <div className="title">
                  <Typography variant="h3" className={classes.title} >Login</Typography>
                  <BarrilLogo style={{ marginRight: '20px'}} />
                </div>
                {carregando && <Loading/>}
                <div className={classes.login}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => <TextField 
                      variant="outlined" 
                      className='textarea' 
                      label="E-mail" 
                      type='text'
                      {...field}
                    />}
                  />
                  <InputSenha label='Senha' name='senha' control={control}/>
                  
                  <Button className={classes.botao} variant='contained' type='submit'>Entrar</Button>
                  {erro && <Alert severity="error">{erro}</Alert>}
                  <Typography className="bottom-text" >Ainda não tem uma conta? <Link to='/cadastroconsumidor'>Cadastre-se</Link></Typography>
                </div>
            </div>
        </form>
    </div>
  );
}

export default LoginConsumidor;