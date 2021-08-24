import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({   
    botaoCarrinho: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
      padding: '5px 40px'
    }, 
    botaoQuantidade: {
      fontWeight: 'bold',
      height: 41,
      fontSize: 20,
      color: 'white',
      borderRadius: 5,
      backgroundColor: `var(--cor-vermelho)`,
      // padding: 5
    },   
  }));
  