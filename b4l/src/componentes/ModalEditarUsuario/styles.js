import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({   
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      marginTop: '20px',
      marginLeft: '100px',
      overflow: 'auto',
      width: '1008px',
      height: '95%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: 16,
      boxShadow: theme.shadows[5],
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 30,
      padding: 50
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
      height: '98%',
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
      borderRadius: '50%',
      boxShadow: theme.shadows[5],
    },
    botoes: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      gap: 20,
    },
    botaoAlterar: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
      padding: '10px 40px'
    },  
  }));
  