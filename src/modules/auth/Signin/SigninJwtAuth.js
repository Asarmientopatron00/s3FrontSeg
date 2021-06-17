import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

import InfoView from '@crema/core/InfoView';
import {onJwtSignIn} from '../../../redux/actions';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
// import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText?errorText:''}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  email: yup
    .string()
    // .email(<IntlMessages id='validation.emailFormat' />)
    .required('Requerido'),
  password: yup
    .string()
    .required('Requerido'),
});

const SigninJwtAuth = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onGoToForgetPassword = () => {
    history.push('/forget-password', {tab: 'jwtAuth'});
  };

  // const {messages} = useIntl();

  const useStyles = makeStyles((theme) => ({
    formRoot: {
      textAlign: 'left',
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
    },
    myTextFieldRoot: {
      width: '100%',
      height:'70px',
    },
    checkboxRoot: {
      marginLeft: -12,
    },
    pointer: {
      cursor: 'pointer',
    },
    btnRoot: {
      width: '100%',
      fontWeight: Fonts.REGULAR,
      fontSize: 14,
      textTransform: 'capitalize',
      paddingLeft: 15,
      paddingRight: 15,
      color:'white',
      "&:hover": {
        backgroundColor: theme.palette.colorHover,
        cursor:'pointer',
      }
    },
    btnPrymary:{
      backgroundColor:theme.palette.primary.main,
    },
    btnRootFull: {
      width: '100%',
    },
    dividerRoot: {
      marginBottom: 16,
      marginLeft: -48,
      marginRight: -48,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 32,
      },
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
    colorTextPrimary: {
      color: theme.palette.primary.main,
    },
    underlineNone: {
      textDecoration: 'none',
    },
    textGrey: {
      color: theme.palette.grey[500],
    },
  }));
  const classes = useStyles(props);

  // return (
  //   <Box flex={1} display='flex' flexDirection='column'>
  //     <Box
  //       px={{xs: 6, sm: 10, xl: 15}}
  //       pt={8}
  //       flex={1}
  //       display='flex'
  //       flexDirection='column'>
  //       <Formik
  //         validateOnChange={true}
  //         initialValues={{
  //           email: 'crema.demo@gmail.com',
  //           password: 'Pass@1!@all',
  //         }}
  //         validationSchema={validationSchema}
  //         onSubmit={(data, {setSubmitting}) => {
  //           setSubmitting(true);
  //           dispatch(
  //             onJwtSignIn({email: data.email, password: data.password}),
  //             history,
  //           );
  //           setSubmitting(false);
  //         }}>
  //         {({isSubmitting}) => (
  //           <Form className={classes.formRoot} noValidate autoComplete='off'>
  //             <Box mb={{xs: 5, xl: 8}}>
  //               <MyTextField
  //                 placeholder={messages['common.email']}
  //                 name='email'
  //                 label={<IntlMessages id='common.email' />}
  //                 variant='outlined'
  //                 className={classes.myTextFieldRoot}
  //               />
  //             </Box>

  //             <Box mb={{xs: 3, xl: 4}}>
  //               <MyTextField
  //                 type='password'
  //                 placeholder={messages['common.password']}
  //                 label={<IntlMessages id='common.password' />}
  //                 name='password'
  //                 variant='outlined'
  //                 className={classes.myTextFieldRoot}
  //               />
  //             </Box>

  //             <Box
  //               mb={{xs: 3, xl: 4}}
  //               display='flex'
  //               flexDirection={{xs: 'column', sm: 'row'}}
  //               alignItems={{sm: 'center'}}
  //               justifyContent={{sm: 'space-between'}}
  //               fontSize={15}>
  //               <Box display='flex' alignItems='center'>
  //                 <Checkbox className={classes.checkboxRoot} />
  //                 <Box className={classes.textGrey} component='span'>
  //                   <IntlMessages id='common.rememberMe' />
  //                 </Box>
  //               </Box>
  //               <Box
  //                 color='primary.main'
  //                 component='span'
  //                 ml={{sm: 4}}
  //                 className={classes.pointer}
  //                 onClick={onGoToForgetPassword}
  //                 fontSize={15}>
  //                 <IntlMessages id='common.forgetPassword' />
  //               </Box>
  //             </Box>

  //             <Box
  //               mb={6}
  //               display='flex'
  //               flexDirection={{xs: 'column', sm: 'row'}}
  //               alignItems={{sm: 'center'}}
  //               justifyContent={{sm: 'space-between'}}>
  //               <Button
  //                 variant='contained'
  //                 color='secondary'
  //                 type='submit'
  //                 disabled={isSubmitting}
  //                 className={classes.btnRoot}>
  //                 <IntlMessages id='common.login' />
  //               </Button>

  //               <Box
  //                 ml={{xs: 0, sm: 4}}
  //                 mt={{xs: 3, sm: 0}}
  //                 className={classes.textGrey}
  //                 fontSize={15}>
  //                 <Box component='span' mr={2}>
  //                   <IntlMessages id='common.dontHaveAccount' />
  //                 </Box>
  //                 <Box component='span'>
  //                   <Link
  //                     to='/signup'
  //                     className={clsx(
  //                       classes.underlineNone,
  //                       classes.colorTextPrimary,
  //                     )}>
  //                     <IntlMessages id='common.signup' />
  //                   </Link>
  //                 </Box>
  //               </Box>
  //             </Box>
  //           </Form>
  //         )}
  //       </Formik>
  //     </Box>
  //     <Box
  //       bgcolor={grey[100]}
  //       px={{xs: 6, sm: 10, xl: 15}}
  //       py={{xs: 3, xl: 4}}
  //       display='flex'
  //       justifyContent='center'
  //       alignItems='center'>
  //       <Button
  //         variant='contained'
  //         color='primary'
  //         className={clsx(classes.btnRoot, classes.btnRootFull)}
  //         onClick={() => dispatch(onSignInAuth0User())}>
  //         <IntlMessages id='auth.loginWithAuth0' />
  //       </Button>
  //     </Box>

  //     <InfoView />
  //   </Box>
  // );

  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box
        px={6}
        py={6}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{
            email: '1036641426',
            password: '1234',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(
              onJwtSignIn({username: data.email, password: data.password}),
              history,
            );
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 1, xl: 2}}>
                <MyTextField
                  name='email'
                  label='Identificación'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 1, xl: 2}}>
                <MyTextField
                  type='password'
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box
                mb={2}
                display='flex'
                alignItems={{sm: 'center'}}
                justifyContent='center'
                width='100%'
              >
                <Button
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                  className={`${classes.btnRoot} ${classes.btnPrymary}`}
                >
                  <IntlMessages id='boton.login' />
                </Button>
              </Box>

              <Box
                mb={2}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={'flex-end'}
                fontSize={15}
              >
                <Box
                  color='primary.main'
                  component='span'
                  ml={{sm: 4}}
                  className={classes.pointer}
                  onClick={onGoToForgetPassword}
                  fontSize={15}>
                  <IntlMessages id='login.forgetPassword' />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <InfoView />
    </Box>
  );
  
};

export default SigninJwtAuth;
