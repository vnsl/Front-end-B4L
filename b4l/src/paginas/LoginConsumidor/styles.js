import { makeStyles } from '@material-ui/core/styles';
import BgConsumidor from "../../assets/fundo-login-consumidor.svg";
import Forma from "../../assets/illustration.svg"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        placeContent: 'center',
        minHeight: '100vh',
    },
    card: {
      background: `url(${BgConsumidor})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    },
    forma: {
      position: 'absolute',
      top: '5%',
      left: '15%',
      maxHeight: '90%'
    },
    containerLogin: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 30,
      position: 'absolute',
      width: '35%',
      maxWidth: 488,
      height: '90%',
      maxHeight: 612,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: `0px 4px 16px rgba(50, 50, 50, 0.4)`,
      padding: 20,
      top: '5%',
      left: '25%'
    },
    login: {
      display: 'grid',
      placeContent: 'center',
      placeItems: 'center',
      gap: 30
    },
    botao: {
      fontWeight: 'bold',
      color: 'white',
      borderRadius: 20,
      backgroundColor: `var(--cor-vermelho)`,
    },
    title: {
      fontWeight: 700,
      fontSize: 32,
      color: `var(--cor-vermelho)`,
      marginBottom: 50,
      paddingLeft: 15,
    },

  }));

export default useStyles;