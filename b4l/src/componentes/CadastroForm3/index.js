import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Controller } from 'react-hook-form';
import InputDinheiro from '../InputDinheiro';

export default function CadastroForm3({control}) {

    return (
        <div className='cadastro'>
            {/* <Controller
                name='restaurante.taxaEntrega'
                control={control}
                render={({ field }) => <TextField 
                    variant='outlined'
                    className='textarea' 
                    label="Taxa de entrega" 
                    type='text'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    {...field}
                />}
            /> */}
            <InputDinheiro name='restaurante.taxa_entrega' label='Taxa de entrega' control={control}/>
            <Controller
                name='restaurante.tempo_entrega_minutos'
                control={control}
                render={({ field }) => <TextField 
                variant="outlined" 
                className='textarea' 
                label="Tempo de entrega"  
                type='number'
                InputProps={{
                    endAdornment: <InputAdornment position="start">Minutos</InputAdornment>,
                }}
                {...field}>
            </TextField>}
            />
            <InputDinheiro name='restaurante.valor_minimo_pedido' label='Valor mínimo do pedido' control={control}/>     
        </div>
    );
}
