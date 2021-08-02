import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

import useStyles from './styles';


export default function CadastroForm1() {
    const classes = useStyles();
    const { register } = useForm();

    return (
        <div className='cadastro'>
            <TextField className='textarea' label="Nome de usuário" {...register('nome')} type='text'/>
            <TextField className='textarea' label="Email" {...register('email')} type='password'/>
            <TextField className='textarea' label="Senha" {...register('senha')} type='text'/>
            <TextField className='textarea' label="Repita a senha" {...register('senhaRepetida')} type='password'/>                   
        </div>
    );
}
