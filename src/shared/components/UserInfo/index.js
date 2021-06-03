import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {
  onCognitoUserSignOut,
  onJWTAuthSignout,
  onSignOutAuth0User,
  onSignOutFirebaseUser,
} from '../../../redux/actions';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import AppContext from '../../../@crema/utility/AppContext';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import {AuthType, Fonts} from '../../constants/AppEnums';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

const useStyles = makeStyles((theme) => {
  return {
    crUserInfo: {
      backgroundColor: 'transparent',
      padding:2,
      minHeight: 56,
      display: 'flex',
      flexDirection: 'row',
      gap:'5px',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        padding:2,
        minHeight: 50,
      },
      cursor:'pointer',
    },
    profilePic: {
      fontSize: 50,
      backgroundColor: 'transparent',
      color:'white',
    },
    userInfo: {
      width: 'fit-content',
      padding:0,
      margin:0,
    },
    userName: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: 14,
      fontWeight: Fonts.MEDIUM,
      color: 'white',
      textTransform:'uppercase'
    },
    designation: {
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'white',
    },
    pointer: {
      cursor: 'pointer',
    },
  };
});

const UserInfo = (props) => {
  const {themeMode} = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles({themeMode});

  return (
    <Box
      px={{xs: 4, xl: 7}}
      className={clsx(classes.crUserInfo, 'cr-user-info')}
    >
      <Box display='flex' alignItems='center' onClick={handleClick}>
        <BusinessCenterIcon className={classes.profilePic}/>
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={0} className={clsx(classes.userName)}>
              {/* {user.displayName ? user.displayName : 'Admin User '} */}
              {'Sec Sel'}
            </Box>
            <Box
              ml={3}
              className={classes.pointer}
              color={themeMode === 'light' ? '#313541' : 'white'}>
              
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                autoFocus={false}  
              >
                <MenuItem>My account</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.designation}>88888888</Box>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' onClick={handleClick}>
        <PersonIcon className={classes.profilePic}/>
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={0} className={clsx(classes.userName)}>
              {/* {user.displayName ? user.displayName : 'Admin User '} */}
              {'Pedro Perez'}
            </Box>
            <Box
              ml={3}
              className={classes.pointer}
              color={themeMode === 'light' ? '#313541' : 'white'}>
              
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                autoFocus={false}  
              >
                <MenuItem>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    if (user && user.authType === AuthType.AWS_COGNITO) {
                      dispatch(onCognitoUserSignOut());
                    } else if (user && user.authType === AuthType.FIREBASE) {
                      dispatch(onSignOutFirebaseUser());
                    } else if (user && user.authType === AuthType.AUTH0) {
                      dispatch(onSignOutAuth0User());
                    } else if (user && user.authType === AuthType.JWT_AUTH) {
                      dispatch(onJWTAuthSignout());
                    }
                  }}>
                  Cerrar Sesion
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.designation}>104312345</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
