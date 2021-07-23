import {makeStyles} from '@material-ui/core/styles';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 'min-content',
      marginTop: 2,
      marginBottom: 2,
      marginRight: 1,
      paddingBottom: 2,
      paddingTop: 2,
      width: 'calc(100% - 8px)',
      borderRadius: '0 15px 15px 0',
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 24,
      paddingRight: theme.direction === 'rtl' ? (props) => 30 * props.level : 1,

      [theme.breakpoints.up('xl')]: {
        paddingLeft:
          theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 24,
        paddingRight:
          theme.direction === 'rtl' ? (props) => 40 * props.level : 18,
        marginRight: 5,
        width: 'calc(100% - 16px)',
      },

      '& .nav-item-text': {
        fontWeight: theme.palette.sidebar.fontWeight,
        // fontSize: 16,
        color: theme.palette.sidebar.textColor,

        [theme.breakpoints.up('xl')]: {
          marginTop: 4,
          marginBottom: 4,
          // fontSize: 18,
        },
      },

      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },

      '& .nav-item-icon-arrow': {
        color: theme.palette.sidebar.textColor,
      },

      '& .MuiIconButton-root': {
        marginRight: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 0,
        paddingLeft: 0,
      },

      '&.open, &:hover, &:focus': {
        '& .nav-item-text': {
          fontWeight: theme.palette.sidebar.fontWeight,
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap',
    },
    listIcon: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
  };
});
export default useStyles;
