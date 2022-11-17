import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '@crema/utility/IntlMessages';
import {Fonts} from 'shared/constants/AppEnums';
import DetalleSolicitudCotizacionV2 from '../DetalleSolicitudCotizacionV2';
import MyAutocompleteAsociado from 'shared/components/MyAutoCompleteAsociado';
import MyRadioField from 'shared/components/MyRadioField';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from 'shared/constants/Constantes';

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
    height: '60px',
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
    gridTemplateColumns: '1fr 1fr 3fr 1fr',
    columnGap: '20px',
  },
  inputs: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '3fr 2fr 1fr 1fr',
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

const SolicitudCotizacionV2Form = (props) => {
  const {
    accion,
    initialValues,
    asociados,
    values,
    setFieldValue,
    setDetalles,
    user,
  } = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  useEffect(() => {
    if (values.asociado_id) {
      const asociado = asociados.find(
        (aso) => aso.id === parseInt(values.asociado_id),
      );
      if (asociado) {
        setFieldValue('empresa', asociado.nombre);
      }
    } else {
      setFieldValue('empresa', '');
    }
  }, [values.asociado_id]);

  const classes = useStyles(props);
  return (
    <>
      <Form className={classes.root} noValidate autoComplete='off'>
        <Box className={classes.marco}>
          <Box py={5} px={5}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontSize={20}
              fontWeight={Fonts.MEDIUM}>
              Solicitud Cotización
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <Box className={classes.inputs_2} minWidth='800px'>
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Solicitud Cotización'
                  name='fecha_solicitud_cotizacion'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='N. Solicitud Cotización'
                  name='numero_solicitud'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyAutocompleteAsociado
                  options={asociados}
                  name='asociado_id'
                  label='Asociado de negocio'
                  className={classes.myTextField}
                  required
                  disabled={user?.rol?.tipo !== 'IN'}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='N. Servicios por Mes'
                  name='numero_servicios_mes'
                  disabled={disabled}
                  required
                />
              </Box>
              <Box component='h3'>Datos Persona Contacto:</Box>
              <Box className={classes.inputs} minWidth='800px'>
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Contacto'
                  name='nombre_contacto'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Correo Electrónico'
                  name='email'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Teléfono Contacto'
                  name='telefono_contacto'
                  disabled={disabled}
                  required
                  inputProps={{
                    maxLength: LONGITUD_MAXIMA_TELEFONOS,
                    minLength: LONGITUD_MINIMA_TELEFONOS,
                  }}
                />
              </Box>
              <Box className={classes.inputs} minWidth='800px'>
                <MyTextField
                  className={classes.myTextField}
                  label='Empresa'
                  name='empresa'
                  disabled={true}
                  required
                />
              </Box>
              <MyTextField
                className={classes.myTextField}
                label='Observaciones'
                name='observaciones'
                disabled={disabled}
                multiline
              />
              <MyRadioField
                label='Estado'
                name='estado'
                options={[
                  {value: '1', label: 'Activo'},
                  {value: '0', label: 'Inactivo'},
                ]}
                disabled={accion === 'ver'}
              />
            </Box>
          </Box>
        </Box>
        <DetalleSolicitudCotizacionV2
          empresa={values.empresa}
          asociado_id={values.asociado_id}
          fecha={values.fecha_solicitud_cotizacion}
          id={values.id ? values.id : 0}
          accionDetalle={accion}
          setDetalles={setDetalles}
        />
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
            <Button
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
              href='/solicitud-cotizacion-v2'>
              <IntlMessages id='boton.cancel' />
            </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
};

export default SolicitudCotizacionV2Form;
