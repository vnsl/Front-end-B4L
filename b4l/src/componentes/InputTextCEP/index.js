import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

export default function InputTextCEP({name, label, control, defaultValue}) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <TextField
                variant="outlined" 
                className='textarea' 
                label={label}
                defaultValue={defaultValue}
                type='text'
                inputProps={{ maxLength: 8 }}
                {...field}
            />}
        />

    )
}