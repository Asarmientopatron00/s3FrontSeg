import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const MyAutocompleteAsociado = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.numero_documento;
      }
    });
  }
  let myvalue = '';
  if (myvalueAux === '') {
    myvalue = field.value;
  } else {
    myvalue = myvalueAux;
  }
  return (
    <Autocomplete
      selectOnFocus={false}
      openOnFocus
      onKeyDown={(e) =>
        e.key === 'Backspace' && typeof field.value === 'number'
          ? form.setValue('')
          : ''
      }
      {...props}
      onChange={(event, newValue, reasons, details, trial) =>
        newValue ? form.setValue(newValue.id) : form.setValue('')
      }
      inputValue={myvalue}
      renderOption={(option) => {
        if (option.estado) {
          return (
            <React.Fragment>
              {option.numero_documento + '-' + option.nombre}
            </React.Fragment>
          );
        } else {
          return '';
        }
      }}
      getOptionLabel={(option) => option.numero_documento + '-' + option.nombre}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...field}
            name={props.name}
            className={props.className}
            label={props.label}
            required={props.required}
            helperText={errorText}
            error={!!errorText}
          />
        );
      }}
    />
  );
};

const OrdenServicioForm = (props) => {
  const {accion, initialValues, values, setFieldValue, asociados} = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);
  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '0px',
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
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
    },
    marco: {
      padding: '0px',
      backgroundColor: 'white',
      boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
      borderRadius: '4px',
    },
    root: {
      padding: '20px',
      backgroundColor: theme.palette.gray[200],
    },
  }));

  useEffect(() => {
    asociados.map((asociado) => {
      if (asociado.id === values.asociado_id) {
        setFieldValue('asociado', asociado.nombre);
        setFieldValue('telefono_asociado', asociado.telefono);
        setFieldValue('email_asociado', asociado.email);
      }
    });
  }, [values.asociado_id, asociados]);

  const classes = useStyles(props);
  return (
    <>
      <Form className={classes.root} noValidate autoComplete='off'>
        <Box className={classes.marco}>
          {/* <Box py={5} px={{xs: 5, lg: 8, xl: 10}}> */}
          <Box py={5} px={5}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontSize={20}
              fontWeight={Fonts.MEDIUM}>
              Orden Servicio
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <Box component='h6' mb={2}>
                Datos Iniciales
              </Box>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='N° Orden de Servicio'
                  name='numero_orden_servicio'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Orden'
                  name='fecha_orden_servicio'
                  disabled={true}
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box component='h6' mb={2}>
                Asociado de Negocios
              </Box>
              <Box className={classes.inputs_2}>
                <MyAutocompleteAsociado
                  options={asociados}
                  name='asociado_id'
                  inputValue={initialValues.asociado_id}
                  label='Asociados de negocios'
                  autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label=' '
                  name='asociado'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Contacto'
                  name='contacto_asociado'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Telefono'
                  name='telefono_asociado'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Correo'
                  name='email_asociado'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <MyTextField
                className={classes.myTextField}
                label='Observaciones'
                name='observaciones'
                disabled={disabled}
                multiline
              />
            </Box>
          </Box>
        </Box>

        <Box className={classes.marco}>
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
            {/* <ListItem
              button
              component={NavLink}
              to={'/ordenes-servicio'}
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
            >
              <IntlMessages id='boton.cancel' />
            </ListItem> */}

            <Button
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
              href='/ordenes-servicio'>
              <IntlMessages id='boton.cancel' />
            </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
};

export default OrdenServicioForm;
