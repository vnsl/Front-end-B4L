import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Loading from '../Loading';
import InputSenha from '../InputSenha/';
import InputText from '../InputText';
import InputDinheiro from '../InputDinheiro';
import UploadImage from '../UploadImage';

import './index.css';
import novo from '../../assets/logo.png';

import useAuth from '../../hook/useAuth';

export default function ModalEditarUsuario(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  
  const imagemPerfil = (props.imagem ? props.imagem : 'http://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg');

  return (
    <div>
      <img 
        className='logo' 
        // src={props.logo ?? novo} 
        src={imagemPerfil} 
        alt="" 
      />
      <Modal
        open={open}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
      </Modal>
    </div>
  );
}