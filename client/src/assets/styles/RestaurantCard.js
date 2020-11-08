import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    margin: '5rem',
    maxWidth: 500,
    minWidth: 500,
  },

  cardContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },

  ratingContainer: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
