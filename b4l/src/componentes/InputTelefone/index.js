import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    label: {
        marginBottom: theme.spacing(1),
    },
    inputTelefone: {
        marginBottom: theme.spacing(5),
    }
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      variant="outlined"
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function InputTelefone(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: '(  )    -    ',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
      <Controller
        name={props.name}
        control={props.control}
        render={( {field} ) => <div>
            <InputLabel className={classes.label} htmlFor="input-telefone">Telefone</InputLabel>
            <OutlinedInput
                className={classes.inputTelefone}
                value={values.textmask}
                onChange={handleChange}
                id="input-telefone"
                inputComponent={TextMaskCustom}
                {...field}
            />
        </div>
        }
      />
  );
}
