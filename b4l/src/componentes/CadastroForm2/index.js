import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';

const categoria = [
    {
        value: 1,
        label: 'Italiano',
    },
    {
        value: 2,
        label: 'Vegetariano',
    },
]

export default function CadastroForm2() {
    const { register } = useForm();



    return (
        <div className='cadastro'>
            <TextField className='textarea' label="Nome do restaurante" {...register('nome_restaurante')} type='text'/>
            <TextField className='textarea' label="Categoria" {...register('categoria_id')} select type='number'>
                {categoria.map((opcao) => (
                    <MenuItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField className='textarea' label="Descrição" {...register('descricao')} type='text'/>                   
        </div>
    );
}
