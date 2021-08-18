import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    root: { 
      position: 'relative',
      width: 592,
      height: 238,
      borderRadius: 24,
      display: 'flex',
    },
    cardActionArea: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 238,
      padding: 20,      
    },

    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: 10,
    },
    media: {
      minWidth: 174,  
      minHeight: 174,
      borderRadius: 24,
    },
  });