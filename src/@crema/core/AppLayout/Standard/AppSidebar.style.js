import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      position: 'relative',
      top: 0,
      left: 0,
      width: '15rem',
      maxHeight: '100vh',
      [theme.breakpoints.up('lg')]: {
        position: 'fixed',
        width: '15rem',
      },
      [theme.breakpoints.up('xl')]: {
        width: '19rem',
      },
      fontWeight: theme.palette.sidebar.fontWeight,
    },
    sidebarBg: {
      backgroundColor: (props) =>
        props.themeMode === ThemeMode.SEMI_DARK
          ? theme.palette.sidebar.bgColor
          : props.themeMode === ThemeMode.LIGHT
          ? 'white'
          : '#313541',
    },
    scrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 20,
      height: 'calc(100vh - 200px) !important',
      // height: 'fit-content!important',
      [theme.breakpoints.up('xl')]: {
        height: 'calc(100vh - 200px) !important',
      },
    },
    drawerScrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 20,
      height: 'calc(100vh - 200px) !important',

      [theme.breakpoints.up('xl')]: {
        height: 'calc(100vh - 200px) !important',
      },
    },
    sidebarStandard: {
      height: '100%',
      width: '100%',
      color: 'white',
      overflow: 'hidden',
    },
  };
});
export default useStyles;
