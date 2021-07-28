import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../componentes/Loading';

import './index.css';

import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hook/useAuth';

function Login() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { logar } = useAuth();

    async function onSubmit(data) {
        setCarregando(true);
        setErro('');
    
        try {
          const resposta = await fetch('http://localhost:3000/login', {
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
    
          logar(dados.token, dados.usuario);
    
          history.push('/perfil');
        } catch (error) {
          setErro(error.message)
        }
    };

  return (
    <div className="card">
        <form 
        className={classes.root} 
        noValidate 
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        >
            <div className="container-login">
                <Typography variant="h3">Login</Typography>
                {carregando && <Loading/>}
                <div className="login">
                    <TextField className='textarea' label="E-mail" {...register('email')} type='text'/>
                    <TextField className='textarea' label="Senha" {...register('senha')} type='password'/>
                    <Button style={{
                        backgroundColor: "var(--cor-laranja)"
                    }} variant='contained' type='submit'>Entrar</Button>
                    {erro && <Alert severity="error">{erro}</Alert>}
                    <Typography>Ainda não tem uma conta? <Link to='/cadastro'>Cadastre-se</Link></Typography>
                </div>
            </div>
      </form>
    </div>
    
  );
}

export default Login;