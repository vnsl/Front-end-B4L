import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      fontWeight: 700,
      fontSize: 32,
      color: `var(--cor-vermelho)`,
      marginBottom: 20,
    },  
    button: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
    },
  }));

export default useStyles;