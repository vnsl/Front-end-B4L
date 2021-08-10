import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    botaoOpenModal: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
      marginTop: 30,
      padding: '10px 40px'
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '50px',
      marginLeft: '50px',
      overflow: 'auto',
      width: '90%',
      height: '90%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: 16,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
      padding: '0 50px 30px 30px',
    },
    leftContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
    },
    rightContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 600,
      marginTop: 50,
    },
    containerImg: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '425px',
      gap: '20px',
      width: '384px',
    },
    imgUpload: {
      width: '100%',
      maxWidth: '384px',
      height: '384px',
      borderRadius: '16px',
      boxShadow: theme.shadows[5],
    },
    botoes: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      gap: 20,
    },
    botaoAdicionar: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
      padding: '10px 40px'
    },    
  }));
  