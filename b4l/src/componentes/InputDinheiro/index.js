import { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    //   fixedDecimalScale
      decimalScale={2}
      isNumericString
      prefix="R$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function InputDinheiro(props) {
  const [values, setValues] = useState({
      preco2: '',
  });

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => <TextField
        className='textarea'
        variant="outlined"
        label={props.label}
        defaultValue={props.defaultValue}
        key={props.label}
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        {...field}
      />}
    />
  );
}
