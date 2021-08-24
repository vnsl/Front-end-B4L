import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import InputSenha from '../InputSenha';
import InputText from '../InputText';

export default function CadastroForm1({control}) {
    return (
        <form className='cadastro'>
            <InputText name='nome' label='Nome de usuário' control={control}/>
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
