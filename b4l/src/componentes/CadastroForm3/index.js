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
            <TextField className='textarea' label="Taxa de entrega" {...register('taxa_entrega')} type='text'/>
            <TextField className='textarea' label="Tempo estimado de entrega" {...register('tempo_entrega_minutos')} type='text'/>
            <TextField className='textarea' label="Valor mínimo do pedido" {...register('valor_minimo_pedido')} type='text'/>                   
        </div>
    );
}
