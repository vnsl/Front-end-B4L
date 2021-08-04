import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Loading from '../Loading';
import Switch from '../../componentes/Switch';
import InputDinheiro from '../../componentes/InputDinheiro';

import useAuth from '../../hook/useAuth';
import { useHistory } from 'react-router-dom';

export default function CustomModal(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token } = useAuth();
  
  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, ativo, permite_observacoes: permiteObserservacoes } = props.produtoInfo ?? '';
  const [ produtoAtivo, setProdutoAtivo ] = useState(ativo);
  const [ observacoes, setObservacoes ] = useState(false);

  const handleOpen = () => {
    if (props.acao === 'Novo produto') {
      setErro('');
      setProdutoAtivo(true);
      setObservacoes(false);
    }
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function cadastrarProduto(data) {
    console.log(data);
    setCarregando(true);
    setErro('');

    try {
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
      
      recarregar();
      handleClose();

    } catch (error) {
      setErro(error.message)
    }

    }

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
        <div className={classes.content}>
          <div className={classes.fields}>
              <h2 id="custom-modal-title">{props.acao}</h2>
              <TextField 
                variant="outlined" 
                key='produto.nome' 
                className='textarea' 
                label="Nome" 
                type='text' 
                {...register('nome')} 
                defaultValue={nome}/>
              <TextField 
                variant="outlined" 
                key='produto.descricao' className='textarea' label="Descrição" type='text' {...register('descricao')} defaultValue={descricao}/>
              <TextField 
                variant="outlined" 
                key='preco' 
                className='textarea' 
                label="Valor" 
                type='number' 
                {...register('preco')} 
                defaultValue={preco} 
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
              {/* <InputDinheiro register={() => register('preco2')} label="Preço2"/> */}
              {carregando && <Loading/>}
              {erro && <Alert severity="error">{erro}</Alert>}
          </div>
          <div className={classes.imgUpload}>
          </div>
        </div>
        <div className={classes.containerSwitches}>
          <Switch acao='Ativar produto' setProdutoAtivo={setProdutoAtivo} produtoAtivo={produtoAtivo}/>
          <Switch acao='Permitir observações' setProdutoAtivo={setObservacoes} produtoAtivo={observacoes}/>
        </div>
        <div className={classes.containerBotoes}>
            <div className={classes.botoes}>
                <Button type="button" color="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                {props.acao === 'Novo produto' ? 
                  <Button variant="contained" type="button" color="secondary" onClick={handleSubmit(cadastrarProduto)}>
                  Adicionar produto ao cardápio
                  </Button> :
                  <Button variant="contained" type="button" color="secondary" onClick={handleSubmit(onSubmit)}>
                  Salvar alterações
                  </Button>
                }
                
            </div>
        </div>
    </div>
  );

  return (
    <div>
      {props.acao === 'Novo produto' ? 
        <Button className={classes.botaomodal} variant="contained" type="button" color="secondary" onClick={handleOpen}>
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