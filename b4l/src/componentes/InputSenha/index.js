import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

export default function InputSenha(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleClickShowPassword = (event) => {
    setMostrarSenha(!mostrarSenha);
    event.preventDefault();
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={( {field} ) => <TextField 
        variant="outlined" 
        className='textarea' 
        label={props.label} 
        type={mostrarSenha ? 'text' : 'password'}
          InputProps={{endAdornment: <InputAdornment              
            position="end">
              <IconButton
                onClick={handleClickShowPassword}
              >
                {mostrarSenha ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }}
        {...field}
      > 
      </TextField>}
    /> 
    
  );
}