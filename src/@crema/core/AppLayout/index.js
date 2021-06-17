import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

import AppContext from '../../utility/AppContext';
import Layouts from './Layouts';
import {ContentView} from '../../index';
import useStyles from '../../../shared/jss/common/common.style';

const useStyle = makeStyles((theme) => ({
  appAuth: {
    flex: 1,
    display: 'flex',
    height: '100vh',
    backgroundColor: theme.palette.gray[200],
    backgroundSize: 'cover',
    padding:0,
    '& .scrollbar-container': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    '& .main-content-view': {
      justifyContent:'center',
    },
    '& .footer': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
}));

const CremaLayout = () => {
  useStyles();
  const {navStyle} = useContext(AppContext);
  const {user} = useSelector(({auth}) => auth);
  const AppLayout = Layouts[navStyle];

  const classes = useStyle();
  return (
    <>
      {user ? (
        <AppLayout />
      ) : (
        <Box className={classes.appAuth}>
          <ContentView />
        </Box>
      )}
    </>
  );
};

export default React.memo(CremaLayout);
