import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  iconLink: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  home: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  writeReview: {
    marginRight: theme.spacing(2),
  },
  profile: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  signIn: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: '#fff',
  },
}));

export default useStyle;
