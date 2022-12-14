import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import AppContext from '../../../@crema/utility/AppContext';
// import {ThemeMode} from '../../constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';
const AppLogo = () => {
  // const {themeMode} = useContext(AppContext);
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      alignItems: 'center',
      marginTop: '20px',
      marginBottom: '20px',
    },
    logo: {
      // height: 160,
      marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
    <Box
      className={classes.logoRoot}
      component='a'
      href='/'
      title={defaultConfig.version}>
      <Hidden smUp>
        <img
          className={classes.logo}
          src={
            '/assets/images/LogoSmart3.png'
            // themeMode === ThemeMode.DARK
            // ? '/assets/images/logo-white.png'
            // : '/assets/images/logo.png'
          }
          alt='crema-logo'
        />
      </Hidden>
      <Hidden xsDown>
        <img
          className={classes.logo}
          src={
            '/assets/images/LogoSmart3.png'
            // themeMode === ThemeMode.DARK
            //   ? '/assets/images/logo-white-with-name.png'
            //   : '/assets/images/logo-with-name.png'
          }
          alt='crema-logo'
        />
      </Hidden>
    </Box>
  );
};

export default AppLogo;
