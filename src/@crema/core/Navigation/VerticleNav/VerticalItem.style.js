import {makeStyles} from '@material-ui/core/styles';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      paddingTop: 2,
      paddingBottom: 2,
      width: 'calc(100% - 16px)',
      [theme.breakpoints.up('xl')]: {
        paddingTop: 8,
        paddingBottom: 8,
      },
      [theme.breakpoints.down('xl')]: {
        paddingRight: 0,
      },
      height: 'min-content',
      marginTop: 1,
      marginBottom: 1,
      cursor: 'pointer',
      textDecoration: 'none !important',
      borderRadius: '0 15px 15px 0',
      paddingLeft: theme.direction === 'ltr' ? (props) => 40 * props.level : 12,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 40 * props.level : 12,
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
      '&.active': {
        backgroundColor: theme.palette.primary.main,
        pointerEvents: 'none',
        transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
        '& .nav-item-text': {
          color: theme.palette.common.white + '!important',
          fontWeight: theme.palette.sidebar.fontWeight,
        },
        '& .nav-item-icon': {
          color: theme.palette.common.white + '!important',
        },
      },

      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },
      },
      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },
      '& .nav-item-text': {
        color: theme.palette.sidebar.textColor,
        fontWeight: theme.palette.sidebar.fontWeight,
      },
    },
    listIcon: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: theme.palette.sidebar.fontWeight,
    },
  };
});
export default useStyles;
