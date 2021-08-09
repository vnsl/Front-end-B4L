import React from 'react';
import './index.css';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Controller } from 'react-hook-form';

export default function CadastroForm2({control, categorias}) {
   
    return (
        <div className='cadastro'>
            <Controller
                name='restaurante.nome'
                control={control}
                render={({ field }) => <TextField 
                    variant='outlined'
                    className='textarea' 
                    label="Nome do restaurante" 
                    type='text'
                    {...field}
                />}
            />
            <Controller
                name='restaurante.categoria_id'
                control={control}
                render={({ field }) => <TextField 
                    variant="outlined" 
                    className='textarea' 
                    label="Categoria" 
                    select 
                    type='number'
                    {...field}>
                        {categorias.map((opcao) => (
                            <MenuItem key={opcao.id} value={opcao.id}>
                            {opcao.nome}
                            </MenuItem>
                        ))}
                    
                    </TextField>}
            />
            <Controller
                name='restaurante.descricao'
                control={control}
                render={({ field }) => <TextField 
                    variant="outlined" 
                    multiline 
                    rows={3} 
                    helperText="Máx: 50 caracteres"  
                    className='textarea' 
                    label="Descrição"  
                    type='text'   
                    {...field}       
                /> }
            />           
        </div>
    );
}
