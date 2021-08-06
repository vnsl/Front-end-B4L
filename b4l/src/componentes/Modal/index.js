import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
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
  
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token } = useAuth();
  
  const recarregar = props.recarregar;
  
  const { id, nome, preco, descricao, ativo, permite_observacoes: permiteObserservacoes } = props.produtoInfo ?? '';

  const defaultValues = {
    nome: "",
    descricao: "",
    preco: "",
  };
  
  const [ produtoAtivo, setProdutoAtivo ] = useState(ativo);
  const [ observacoes, setObservacoes ] = useState(false);
  const { handleSubmit, reset, control, setValue } = useForm({defaultValues});

  useEffect(() => {
    setValue("nome", nome)
    setValue("descricao", descricao)
    setValue("preco", preco)
  }, [nome, setValue, preco, descricao])

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
    setCarregando(true);
    setErro('');

    const produto = {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      permiteObserservacoes: observacoes
    }

    try {
      const resposta = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const dados = await resposta.json();
      
      setCarregando(false);
      
      if (!resposta.ok) {
        return setErro(dados);
      }
      reset();
      recarregar();
      handleClose();

    } catch (error) {
      setErro(error.message)
    }
  }

  async function onSubmit(data) {
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
            if(!data.nome || !data.preco ) {
              setErro('Campos nome e preço são obrigatórios');
              setCarregando(false);
              return;
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
            history.push('/produtos');
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
    <form className={classes.paper}>
        <div className={classes.content}>
          <div className={classes.fields}>
              <h2 id="custom-modal-title">{props.acao}</h2>
               <Controller
                  name="nome"
                  control={control}
                  defaultValue={nome}
                  render={({ field }) => <TextField 
                    variant="outlined" 
                    className='textarea' 
                    label="Nome" 
                    type='text' 
                    {...field}
                    
                  />}
                />
                <Controller 
                  name="descricao"
                  control={control}
                  render={({field})=>
                  <TextField 
                    defaultValue={descricao}
                    variant="outlined" 
                    className='textarea' 
                    label="Descrição" 
                    type='text' 
                    {...field}
                  />
                  }
                />
                <InputDinheiro control={control} name='preco' label='Preço'/>
                
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
                  <Button variant="contained" type="submit" color="secondary"  onClick={handleSubmit(cadastrarProduto)}>
                  Adicionar produto ao cardápio
                  </Button> :
                  <Button variant="contained" type="submit" color="secondary" onClick={handleSubmit(onSubmit)}>
                  Salvar alterações
                  </Button>
                }
                
            </div>
        </div>
    </form>
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