import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(
  (theme) => ({
    contentContainer: {
      display: 'flex',
      margin: '2rem',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    actionsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    textfield: {
      marginBottom: theme.spacing(2),
    },
  }),
  { index: 1 }
);

export default useStyle;
