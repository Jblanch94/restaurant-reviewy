import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    cardContainer: {
      minWidth: 500,
      maxWidth: 500,
      margin: theme.spacing(4),
    },
    cardContentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { index: 1 }
);

export default useStyles;
