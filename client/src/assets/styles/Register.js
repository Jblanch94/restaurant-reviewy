import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    formHeader: {
      textAlign: 'center',
      fontSize: '2rem',
      letterSpacing: '1rem',
      padding: '1rem',
      marginBottom: '3rem',
    },
  }),
  { index: 1 }
);

export default useStyles;
