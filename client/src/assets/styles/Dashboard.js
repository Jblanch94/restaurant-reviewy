import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    dashboardContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      flex: 1,
    },

    dashboardHeader: {
      textAlign: 'center',
      textTransform: 'uppercase',
    },

    dashboardFab: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  }),
  { index: 1 }
);

export default useStyles;
