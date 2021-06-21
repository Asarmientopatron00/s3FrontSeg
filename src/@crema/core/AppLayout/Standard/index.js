import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView} from '../../../index';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import AppContext from '../../../utility/AppContext';
import AppFixedFooter from './AppFixedFooter';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import Card from '@material-ui/core/Card';
import {InfoView} from '@crema';

const StandardLayout = () => {
  const {footer, themeStyle, layoutType, footerType} = useContext(AppContext);
  const classes = useStyles({footer, themeStyle});

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        },
      )}>
      <Box className={classes.appsContainer}>
        <AppSidebar />

        <Box className={classes.appsMainContent}>
          <Card
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}></Card>
          <InfoView />
        </Box>
      </Box>

      <Box className={classes.mainContent}>
        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <AppHeader />
            <ContentView />
            <AppFixedFooter />
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <AppHeader />
            <ContentView />
            <AppFixedFooter />
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default StandardLayout;
