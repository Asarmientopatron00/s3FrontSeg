import React, {useEffect, useState} from 'react';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
// import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
// import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

// const MySelectField= (props) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';

//   return (
//     <Field
//       {...props}
//       {...field}
//       row
//     >
//     <Field
//       type='radio'
//       as={Radio}
//       value="1"
//       label="Activo"
//       name={props.name}
//       className={props.className}
//     />

//     <Field
//       as={Radio}
//       name={props.name}
//       type='radio'
//       value="0"
//       label="Inactivo"
//       className={props.className}
//     />
//   </Field>
//   );
// };

const OpcionSistemaForm = (props) => {
  const {handleOnClose, accion, values, initialValues, modulos} = props;

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);
  // const [estado,setEstado] = useState('1');

  // useEffect(()=>{
  //   if (accion==='crear'){
  //     setEstado('1');
  //   } else {
  //     setEstado(values.estado);
  //   }
  //   alert(values.estado)
  // },[values.estado,accion])

  // useEffect(()=>{
  //   alert(values.estado)
  // },[values.estado])

  // const {messages} = useIntl();

  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
      gap: '10px',
      backgroundColor: 'white',
      paddingRight: '20px',
      position: 'sticky',
      left: 0,
      bottom: 0,
    },
    myTextField: {
      width: '100%',
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '70px',
    },
    MySelectField: {
      width: 'auto',
      marginBottom: 16,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 24,
      },
      color: theme.palette.primary.main,
      '&:target': {
        color: theme.palette.primary.main,
      },
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
    btnSecundary: {
      backgroundColor: theme.palette.grayBottoms,
    },
    widthFull: {
      width: '100%',
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='seguridad.opcionesSistema' />
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyTextField
              className={classes.myTextField}
              label='Nombre'
              name='nombre'
              disabled={disabled}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Módulo'
              name='modulo_id'
              disabled={disabled}
              select={true}
              required>
              {modulos.map((modulo) => {
                return (
                  <MenuItem
                    value={modulo.id}
                    key={modulo.id}
                    className={classes.pointer}
                    style={modulo.estado === 0 ? {display: 'none'} : {}}>
                    {modulo.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField>

            <MyTextField
              className={classes.myTextField}
              label='Posición'
              name='posicion'
              disabled={disabled}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Ícono'
              name='icono_menu'
              disabled={disabled}
            />

            <MyTextField
              className={classes.myTextField}
              label='Url'
              name='url'
              disabled={disabled}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Url Ayuda'
              name='url_ayuda'
              disabled={disabled}
            />

            <FormControl className={classes.widthFull} component='fieldset'>
              <FormLabel>Estado*</FormLabel>
              <Field
                type='radio'
                as={RadioGroup}
                className={classes.myTextField}
                disabled={accion === 'ver'}
                row
                value={values.estado}>
                <FormControlLabel
                  value='1'
                  name='estado'
                  control={<Radio color='primary' />}
                  label='Activo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
                <FormControlLabel
                  value='0'
                  name='estado'
                  control={<Radio color='primary' />}
                  label='Inactivo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
              </Field>
            </FormControl>
          </Box>
        </Box>
      </Scrollbar>
      <Box className={classes.bottomsGroup}>
        {accion !== 'ver' ? (
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            variant='contained'
            type='submit'>
            <IntlMessages id='boton.submit' />
          </Button>
        ) : (
          ''
        )}
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default OpcionSistemaForm;
