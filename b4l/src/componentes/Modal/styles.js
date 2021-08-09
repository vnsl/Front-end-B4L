import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    botaomodal: {
      marginTop: 30,
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 50,
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
    },
    containerImg: {
      display: 'flex',
      flexDirection: 'column',
      height: '425px',
      gap: '20px',
      width: '384px',
    },
    imgUpload: {
      // backgroundColor: 'gray',
      width: '100%',
      maxWidth: '384px',
      height: '384px',
      borderRadius: '50%',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '50px',
      marginLeft: '50px',
      overflow: 'auto',
      width: '80%',
      height: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: 16,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    botoes: {
      display: 'flex',
      gap: 20,
    },
    containerBotoes:{
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 100,
    },
  }));
  