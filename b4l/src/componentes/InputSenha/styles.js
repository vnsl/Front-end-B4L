import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '46ch',
      marginBottom: theme.spacing(3),
    },
    label: {
      marginLeft: 15,
    }
  }));