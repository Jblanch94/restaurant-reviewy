import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
    header: {
      marginBottom: theme.spacing(3),
    },
    ratingContainer: {
      marginBottom: theme.spacing(2),
    },
    reviewContainer: {
      marginBottom: theme.spacing(2),
    },
  }),
  { index: 1 }
);

export default useStyles;
