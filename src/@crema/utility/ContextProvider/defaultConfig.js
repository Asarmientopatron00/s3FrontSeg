import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  FooterType,
  HeaderType,
  LayoutType,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from '../../../shared/constants/AppEnums';
import environment from './../../../env';

const breakpoints = createBreakpoints({});
const cardRadius = ThemeStyleRadius.STANDARD;
const defaultConfig = {
  theme: {
    spacing: 4,
    direction: 'ltr', //ltr, rtl
    palette: {
      type: ThemeMode.LIGHT,
      grayBottoms: '#999',
      redBottoms: '#be1e2d',
      colorHover: '#35BCE1',
      enviaEmailBottoms: '#043927',
      background: {
        paper: '#fff',
        default: '#f4f7fe',
      },
      primary: {
        main: '#0C4F7F',
        contrastText: '#fff',
      },
      secondary: {
        main: '#F04F47',
      },
      sidebar: {
        bgColor: '#f4f7fe',
        textColor: '#0C4F7F',
        fontSize: '14px',
        fontWeight: '600',
      },
      gray: {
        50: '#fafafa',
        100: '#f7fafc',
        200: '#f4f7fe',
        300: '#E0E0E0',
        400: '#c5c6cb',
        500: '#A8A8A8',
        600: '#666666',
        700: '#4a5568',
        800: '#201e21',
        900: '#1a202c',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
      text: {
        primary: '#000',
        secondary: '#74788d',
        disabled: '#909098',
        hint: '#aeafb8',
        white: '#fff',
      },
    },
    status: {
      danger: 'orange',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    typography: {
      fontFamily: ['Helvetica Neue', 'sans-serif'].join(','),
    },
    overrides: {
      MuiTypography: {
        h1: {
          fontSize: 22,
        },
        h2: {
          fontSize: 20,
        },
        h3: {
          fontSize: 18,
        },
        h4: {
          fontSize: 16,
        },
        h5: {
          fontSize: 14,
        },
        h6: {
          fontSize: 14,
        },
        subtitle1: {
          fontSize: 14,
        },
        subtitle2: {
          fontSize: 16,
        },
        body1: {
          fontSize: 14,
        },
        body2: {
          fontSize: 12,
        },
      },
      MuiToggleButton: {
        root: {
          borderRadius: cardRadius,
        },
      },
      MuiCardLg: {
        root: {
          borderRadius:
            cardRadius === ThemeStyleRadius.STANDARD
              ? ThemeStyleRadius.STANDARD
              : ThemeStyleRadius.MODERN + 20,
        },
      },
      MuiCard: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 16,
          },
        },
      },
      MuiButton: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          [breakpoints.down('md')]: {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
          },
        },
      },
    },
  },
  themeStyle: ThemeStyle.STANDARD,
  themeMode: ThemeMode.SEMI_DARK,
  navStyle: NavStyle.STANDARD,
  layoutType: LayoutType.FULL_WIDTH,
  footerType: FooterType.FLUID,
  headerType: HeaderType.DARK,
  rtAnim: RouteTransition.NONE,
  footer: false,
  locale: {
    languageId: 'spanish',
    locale: 'es',
    name: 'Español',
    icon: 'es',
  },
  rtlLocale: ['ar'],
  API_URL: environment.API_URL,
  API_URL2: environment.API_URL2,
  APP_SEGURIDAD: environment.APP_SEGURIDAD,
  ID_APP_MOVIL: environment.ID_APP_MOVIL,
  // API_URL: 'https://solicitudesservicio-back.sellosdeseguridad.net/public',
  version: 'V 19',
};
export default defaultConfig;
