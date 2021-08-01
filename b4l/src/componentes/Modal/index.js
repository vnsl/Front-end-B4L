import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function CustomModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className={classes.fields}>
            <h2 id="custom-modal-title">Novo produto</h2>
            <TextField className='textarea' label="Nome" type='text'/>
            <TextField className='textarea' label="Descrição" type='text'/>
            <TextField className='textarea' label="Valor" type='number'/>
        </div>
        <div className="imagem">
            <div className={classes.botoes}>
                <Button type="button" color="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
                    Adicionar produto ao cardápio
                </Button>
            </div>
        </div>
    </div>
  );

  return (
    <div>
      <Button variant="contained" type="button" color="secondary" onClick={handleOpen}>
        Adicionar produto ao cardápio
      </Button>
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