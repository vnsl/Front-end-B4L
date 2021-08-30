import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({   
    botaoNaoEntregues: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'white',
      borderRadius: '5px 0px 0px 5px',
      backgroundColor: `var(--cor-vermelho)`,
      margin: '20px 0',
      padding: '5px 20px'
    },
    botaoEntregues: {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#121212',
      borderRadius: '0px 5px 5px 0px',
      backgroundColor: '#F0F0F0',
      margin: '20px 0',
      padding: '5px 20px'
    },    
  }));
  