import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    cardCarrinho: { 
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      height: 80,
      marginBottom: 30,
      boxShadow: 'none',
      backgroundColor: '#f9f9f9'
    },
    cardActionArea: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      gap: 5,
      height: '100%',
    },
    botaoExcluir: {
      marginLeft: 'auto',
      marginRight: 10,
      cursor: 'pointer'
    },
    containerCustoTotalProduto: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 78,
      height: 18,
      background: 'linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), #FFFFFF',
      borderRadius: '4px'
    },
    custoTotalProduto: {
      fontSize: '10px',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
    },
    media: {
      minWidth: 77,  
      minHeight: 77,
      borderRadius: 24,
    },
  });