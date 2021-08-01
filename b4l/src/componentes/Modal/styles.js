import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 50,
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
    },
    imgUpload: {
      backgroundColor: 'gray',
      width: 384,
      height: 384,
      borderRadius: 16,
      marginRight: 50,
    },
    paper: {
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
  