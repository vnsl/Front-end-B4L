import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Loading from '../Loading';
import InputSenha from '../InputSenha/index';

import './index.css';

import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';

export default function ModalEditarUsuario(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, categorias, setCategorias } = useAuth();
  
  
  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, ativo, permite_observacoes: permiteObserservacoes } = props.produtoInfo ?? '';
  const [ produtoAtivo, setProdutoAtivo ] = useState(ativo);
  const [ observacoes, setObservacoes ] = useState(false);

  const handleOpen = () => {
    if (props.acao === 'Editar Perfil') {
      setErro('');
      setProdutoAtivo(true);
      setObservacoes(false);
    }
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

    async function listarCategorias() {
        setCarregando(true);
        
        const resposta = await fetch('http://localhost:3000/categorias', {
          method: 'GET',
          body: JSON.stringify(),
          headers: {
            'Content-type': 'application/json',
          }
        });
        const categorias = await resposta.json();
        
        setCategorias(categorias);
        setCarregando(false);
      };
    
      useEffect(() => {
        listarCategorias();
      }, []);

  async function onSubmit(data) {
    console.log(data);
    setCarregando(true);
    setErro('');
        
        try {
          if (props.acao === 'Novo produto') {
            const resposta = await fetch('http://localhost:3000/produtos', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            
            const dados = await resposta.json();
            
            setCarregando(false);
            
            if (!resposta.ok) {
              setErro(dados);
              return;
            }
          } else {
            if (ativo !== produtoAtivo && !produtoAtivo) {
              try {
                const resposta = await fetch(`http://localhost:3000/produtos/${id}/desativar`, {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                })
                setCarregando(false);
              } catch (error) {
                setErro(error.message)
              }
            } else if (ativo !== produtoAtivo && produtoAtivo) {
              try {
                const resposta = await fetch(`http://localhost:3000/produtos/${id}/ativar`, {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                })
                setCarregando(false);
              } catch (error) {
                setErro(error.message)
              }
            }
            if(data.nome || data.preco || data.descricao) {
              const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            
            const dados = await resposta.json();
            
            setCarregando(false);
            history.push('/produtos2');
            if (!resposta.ok) {
              setErro(dados);
              return;
            }
            }

            if(data.nome && data.preco && data.descricao) {
              setCarregando(false);
              handleClose();
            }
            
          }
          
          recarregar();
          handleClose();
          
        } catch (error) {
          setErro(error.message)
        }
  }

  const body = (
    <div className={classes.paper}>
        <h2 className={classes.title} >{props.acao}</h2>
        <div className={classes.content}>
          <div className={classes.fields}>
            <div className={classes.dadosUsuario}>
              <TextField variant="outlined" key='nome' className='textarea' label="Nome de usuário" {...register('nome')} type='text' />
              <TextField variant="outlined" key='email' className='textarea' label="Email" {...register('email')} type='text'/>
            </div>
            <div className="dados-restaurante" >
              <TextField variant="outlined" key='restaurante.nome'className='textarea' label="Nome do restaurante" {...register('restaurante.nome')} type='text'/>
              <TextField variant="outlined" key='restaurante.idCategoria' className='textarea' label="Categoria" {...register('restaurante.idCategoria')} select type='number'>
                  {categorias.map((opcao) => (
                    <MenuItem key={opcao.id} value={opcao.id}>
                    {opcao.nome}
                    </MenuItem>
                    ))}
              </TextField>
              <TextField variant="outlined" multiline rows={2} helperText="Máx: 50 caracteres" key='restaurante.descricao' className='textarea' label="Descrição" {...register('restaurante.descricao')} type='text'/>
              <TextField variant="outlined" key='restaurante.taxaEntrega' className='textarea' label="Taxa de entrega" {...register('restaurante.taxaEntrega')} type='number' InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }} />
              <TextField variant="outlined" key='restaurante.tempoEntregaEmMinutos' className='textarea' label="Tempo estimado de entrega" {...register('restaurante.tempoEntregaEmMinutos')} type='number'/>
              <TextField variant="outlined" key='restaurante.valorMinimoPedido' className='textarea' label="Valor mínimo do pedido" {...register('restaurante.valorMinimoPedido')} type='number' InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }} /> 
            </div>
            <InputSenha register={() => register('senha')} label='Senha'/>
            <InputSenha register={() => register('senhaRepetida')} label='Repita a senha'/>
              {carregando && <Loading/>}
              {erro && <Alert severity="error">{erro}</Alert>}
          </div>
          <div className={classes.imgUpload}>
          </div>
        </div>
        <div className={classes.containerBotoes}>
            <div className={classes.botoes}>
                <Button type="button" color="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="contained" type="button" color="secondary" onClick={handleSubmit(onSubmit)}>
                  Salvar alterações
                </Button>
                
            </div>
        </div>
    </div>
  );

  return (
    <div>
      {props.acao === 'Novo produto' ? 
        <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
        Adicionar produto ao cardápio
        </Button> :
        <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
        Editar produto
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}