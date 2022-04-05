import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {onJWTAuthSignout} from '../../../redux/actions';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import AppContext from '../../../@crema/utility/AppContext';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';
import {Box, Button} from '@material-ui/core';
import {Fonts} from '../../constants/AppEnums';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Popover from '@material-ui/core/Popover';
import defaultConfig from './../../../@crema/utility/ContextProvider/defaultConfig';

const useStyles = makeStyles((theme) => {
  return {
    crUserInfo: {
      backgroundColor: 'transparent',
      padding: 2,
      minHeight: 56,
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        padding: 2,
        minHeight: 50,
      },
      cursor: 'pointer',
    },
    profilePic: {
      fontSize: 50,
      backgroundColor: 'transparent',
      color: 'white',
    },
    userInfo: {
      width: 'fit-content',
      padding: 0,
      margin: 0,
    },
    userName: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: 12,
      fontWeight: Fonts.MEDIUM,
      color: 'white',
      textTransform: 'uppercase',
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
    btnRoot: {
      paddingLeft: 15,
      paddingRight: 15,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.colorHover,
        cursor: 'pointer',
      },
    },
    btnPrymary: {
      backgroundColor: theme.palette.primary.main,
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
      className={clsx(classes.crUserInfo, 'cr-user-info')}>
      <Box display='flex' alignItems='center' onClick={handleClick}>
        <BusinessCenterIcon className={classes.profilePic} />
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box mb={0} className={clsx(classes.userName)}>
            {user.asociado.nombre ? user.asociado.nombre : ''}
          </Box>
          <Box className={classes.designation}>
            {user.asociado.numero_documento}
          </Box>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' onClick={handleClick}>
        <PersonIcon className={classes.profilePic} />
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box mb={0} className={clsx(classes.userName)}>
            {user.displayName ? user.displayName : ''}
          </Box>
          <Box className={classes.designation}>
            {user.identificacion_usuario}
          </Box>
        </Box>
      </Box>
      <Popover
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Box margin={2} mb={5}>
          <Box component='h4' mb={3} textAlign='left'>
            {user.rol.nombre}
          </Box>

          <Box component='h6' fontWeight='normal' textAlign='left'>
            {user.email}
          </Box>
        </Box>
        <Box
          borderTop='1px solid gray'
          padding={2}
          display='flex'
          justifyContent='center'>
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            onClick={() => {
              dispatch(onJWTAuthSignout());
              setTimeout(() => {
                window.location.href =
                  defaultConfig.APP_SEGURIDAD + '/launcher/security/dashboard';
              }, 200);
            }}>
            Cerrar Sesion
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default UserInfo;
