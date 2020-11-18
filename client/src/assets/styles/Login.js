import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: theme.spacing(8),
  },
  link: {
    marginLeft: theme.spacing(2),
    textDecoration: 'none',
    color: '#3F51B5',
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

export default useStyles;
