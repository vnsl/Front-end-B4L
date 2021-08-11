import { makeStyles } from '@material-ui/core/styles';
import BgImage from "../../assets/bg-login.png";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        placeContent: 'center',
        minHeight: '100vh',
        gap: '15px'
    },
    card: {
      background: `url(${BgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh'
    },
    containerLogin: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 30,
      position: 'relative',
      width: 488,
      height: 612,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: `0px 4px 16px rgba(50, 50, 50, 0.4)`,
      padding: 20,
      marginRight: 320
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