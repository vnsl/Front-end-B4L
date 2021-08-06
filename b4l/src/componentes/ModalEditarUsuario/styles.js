import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'top',
    },
    title: {
      marginTop: 20,
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
      width: 408,
      paddingLeft: 20,
    },
    /* imgUpload: {
      backgroundColor: 'gray',
      width: 384,
      height: 384,
      borderRadius: 16,
      marginRight: 80,
    }, */
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      marginTop: '10px',
      marginLeft: '250px',
      overflow: 'auto',
      width: '1008px',
      height: '98%',
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
  