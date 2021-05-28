import {makeStyles} from '@material-ui/core';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      height: '98vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      paddingTop: 52,
      marginTop:0,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 52,
      },
      '&.appMainFixedFooter': {
        paddingBottom: 48,
        [theme.breakpoints.up('xl')]: {
          paddingBottom: 58,
        },
        '& .scrollAppSidebar': {
          height: (props) =>
            props.themeStyle === ThemeStyle.MODERN
              ? 'calc(100vh - 260px) !important'
              : 'calc(100vh - 198px) !important',
          [theme.breakpoints.up('xl')]: {
            height: (props) =>
              props.themeStyle === ThemeStyle.MODERN
                ? 'calc(100vh - 300px) !important'
                : 'calc(100vh - 236px) !important',
          },
        },
        '& $mainContainer': {
          paddingBottom: 1,
        },
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      margin: '0rem',
      width: 'fit-content',
      [theme.breakpoints.up('lg')]: {
        marginLeft: '15rem',
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: '19rem',
      },
    },
    mainContainer: {
      paddingBottom: (props) => (props.footer ? 0 : 10),
      width: 'fit-content',
      marginTop: '0rem',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100vw - 16.2rem)`,
      },
      [theme.breakpoints.up('xl')]: {
        width: `calc(100vw - 20.2rem)`,
      },

      '& > .scrollbar-container': {
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '0',
        },
      },
    },
    mainContainerFull: {
      width: 'fit-content',
      paddingBottom: (props) => (props.footer ? 0 : 10),
      '& > .scrollbar-container': {
        padding: '20',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '0',
        },
      },
    },
    boxedLayout: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1260,
        marginLeft: 'auto',
        marginRight: 'auto',
         boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        '& .app-sidebar': {
          position: 'absolute',
        },
        '& .fixed-footer': {
          position: 'sticky',
          width: '100%',
        },
        '& $mainContent': {
          width: 'calc(100% - 19rem)',
          flex: 'auto',
        },
        '& $mainContainer': {
          width: '100%',
        },
        '& .app-bar': {
          width: 'calc(100% - 19rem)',
          position: 'absolute',
          boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        },
        '& .grid-btn': {
          fontSize: 11,
        },
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1680,
        '& $mainContent, & .app-bar': {
          width: 'calc(100% - 21.6rem)',
        },
      },
    },
  };
});
export default useStyles;
