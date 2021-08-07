import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import InputSenha from '../InputSenha';

export default function CadastroForm1({control}) {
   

    return (
        <form className='cadastro'>
            <Controller
                name='nome'
                control={control}
                render={({ field }) => <TextField
                    variant="outlined" 
                    className='textarea' 
                    label="Nome de usuário" 
                    type='text'
                    {...field}
                />}
            />
            <Controller
                name='email'
                control={control}
                render={({ field }) => <TextField 
                variant="outlined" 
                className='textarea' 
                label="Email" 
                type='text'
                {...field}
                />}
            />    
            <InputSenha name='senha' label='Senha' control={control}/>
            <InputSenha name='senhaRepetida' label='Repira a senha' control={control}/>              
        </form>
    );
}
