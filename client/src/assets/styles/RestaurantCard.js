import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    cardContainer: {
      margin: '5rem',
      maxWidth: 500,
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        maxWidth: 300,
        minWidth: 300,
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 250,
        minWidth: 250,
      },
    },

    cardContentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
    },

    ratingContainer: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(3),
    },
  }),
  { index: 1 }
);

export default useStyles;
