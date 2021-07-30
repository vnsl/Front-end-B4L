import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1000,
      height: 798,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      // boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    botoes: {
      display: 'flex',
      gap: 20,
    }
  }));