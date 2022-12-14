import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
// import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import useStyles from './AppSidebar.style';
import Scrollbar from '../../Scrollbar';
import AppContext from '../../../utility/AppContext';
import AppLogo from '../../../../shared/components/AppLogo';

const AppSidebar = (props) => {
  const dispatch = useDispatch();
  const {themeMode} = useContext(AppContext);
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };
  const classes = useStyles({themeMode});
  let sidebarClasses = classes.sidebarStandard;
  return (
    <>
      {/* <Hidden lgUp> */}
      <Drawer
        anchor={props.position}
        open={navCollapsed}
        onClose={(ev) => handleToggleDrawer()}
        classes={{
          root: clsx(props.variant),
          paper: clsx(props.variant),
        }}
        style={{position: 'absolute'}}>
        <Box height='100%' className={classes.container}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <AppLogo />
            <Scrollbar
              scrollToTop={false}
              className={classes.drawerScrollAppSidebar}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
      {/* </Hidden> */}

      {/* <Hidden mdDown>
        <Box
          height='fit-content'
          className={clsx(classes.container, 'app-sidebar')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <AppLogo />
            <Scrollbar
              scrollToTop={true}
              className={classes.scrollAppSidebar}
              children={
                <Navigation style={{height: 'max-content'}} />
              }></Scrollbar>
          </Box>
        </Box>
      </Hidden> */}
    </>
  );
};

export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
};
