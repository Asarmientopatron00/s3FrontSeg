import React from 'react';
import SigninJwtAuth from './SigninJwtAuth';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  imgRoot: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 100,
  },
  cardRoot: {
    minWidth: '500px',
    // maxHeight: '',
    width: '50%',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('xl')]: {
      paddingTop: 0,
    },
    // '&:before': {
    //   content: "''",
    //   position: 'absolute',
    //   left: 0,
    //   right: 0,
    //   top: 0,
    //   width: 130,
    //   height: 9,
    //   borderBottomRightRadius: 80,
    //   borderBottomLeftRadius: 80,
    //   marginRight: 'auto',
    //   marginLeft: 'auto',
    //   backgroundColor: theme.palette.primary.main,
    // },
  },
  login: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    justifyContent: 'center',
  },
  loginDerecha: {
    backgroundColor: theme.palette.redBottoms,
    backgroundImage: 'url(/assets/images/logística-fuera-de-la-empresa.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 'calc(100vh)',
  },
  muiTabsFull: {
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiTabs-flexContainer': {
      '& .MuiTab-root': {
        flex: 1,
      },
    },
  },
  muiTab: {
    fontWeight: Fonts.MEDIUM,
    fontSize: 16,
    paddingBottom: 16,
    paddingTop: 16,
    marginLeft: 8,
    marginRight: 8,
    color: theme.palette.text.secondary,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

/*const Signin = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const classes = useStyles(props);

  return (
    <Box flex={1} display='flex' flexDirection='column' justifyContent='center'>
      <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
        <img
          className={classes.imgRoot}
          src='/assets/images/logo-white-with-name.png'
          alt='crema-logo'
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.cardRoot}>
          <Box px={{xs: 6, sm: 10, xl: 15}}>
            <Box
              component='h2'
              mb={{xs: 3, xl: 6}}
              color='text.primary'
              fontWeight={Fonts.REGULAR}
              fontSize={{xs: 24, xl: 26}}>
              <IntlMessages id='common.login' />
            </Box>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            aria-label='simple tabs example'
            className={classes.muiTabsFull}>
            <Tab
              className={classes.muiTab}
              label='jwt auth'
              {...a11yProps(2)}
            />
            
          </Tabs>

          <>
            {value === 1 && <SigninJwtAuth />}
          </>
        </Card>
      </Box>
    </Box>
  );
};*/

const Signin = (props) => {
  // const [value, setValue] = useState(1);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const a11yProps = (index) => {
  //   return {
  //     id: `simple-tab-${index}`,
  //     'aria-controls': `simple-tabpanel-${index}`,
  //   };
  // };

  const classes = useStyles(props);

  return (
    <Box className={classes.login}>
      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'>
          <Card className={classes.cardRoot}>
            <Box
              mx={{xs: 6, md: 8, xl: 10}}
              mt='10px'
              display='flex'
              justifyContent='flex-end'>
              <Box display='grid' alignItems='center' width='100%'>
                <Box component='h2'>Solicitudes Servicio</Box>
                <Box component='h3'>Sec Sel SAS</Box>
              </Box>
              <img
                className={classes.imgRoot}
                src='/assets/images/LogoSecSel.png'
                alt='Logo Sec Sel'
              />
            </Box>
            <SigninJwtAuth />
          </Card>
        </Box>
      </Box>
      <Box className={classes.loginDerecha}></Box>
    </Box>
  );
};

export default Signin;
