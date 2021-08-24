import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
    },
  }));

export default useStyles;