import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';


export default function CustomModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
        <div className={classes.main}>
          <div className={classes.fields}>
              <h2 id="custom-modal-title">Novo produto</h2>
              <TextField className='textarea' label="Nome" type='text'/>
              <TextField className='textarea' label="Descrição" type='text'/>
              <TextField className='textarea' label="Valor" type='number'/>
          </div>
          <div className={classes.imgUpload}>

          </div>
        </div>
        <div className={classes.containerSwitches}>

        </div>
        <div className={classes.containerBotoes}>
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