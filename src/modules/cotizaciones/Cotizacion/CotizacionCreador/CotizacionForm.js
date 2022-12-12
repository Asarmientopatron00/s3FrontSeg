import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DetalleCotizacion from '../../DetalleCotizacion';
import {CREATE_DETALLE_COTIZACION} from 'shared/constants/ActionTypes';

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

const MyAutocompleteSolicitud = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.numero_solicitud + '-' + option.nombre_empresa;
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
        return (
          <React.Fragment>
            {option.numero_solicitud + '-' + option.nombre_empresa}
          </React.Fragment>
        );
      }}
      getOptionLabel={(option) =>
        option.numero_solicitud + '-' + option.nombre_empresa
      }
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

const SolicitudCotizacionForm = (props) => {
  const {
    accion,
    initialValues,
    solicitudes,
    values,
    setFieldValue,
    setDetalles,
    ciudades,
    servicios,
    dispatch,
  } = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  useEffect(() => {
    if (values.solicitud_cotizacion_id) {
      const solicitud = solicitudes.find(
        (sol) => sol.id === parseInt(values.solicitud_cotizacion_id),
      );
      if (solicitud) {
        if (!solicitud.asociado_id) {
          setFieldValue('empresa_cotizacion', solicitud.nombre_empresa);
          setFieldValue('asociado_id', '');
        } else {
          setFieldValue('asociado_id', solicitud.asociado_id);
          setFieldValue('empresa_cotizacion', '');
        }
        if (accion === 'crear') {
          solicitud.detalles.forEach((data, index) => {
            let newRow = {
              ciudad_origen_id: data.ciudad_origen_id,
              ciudad_destino_id: data.ciudad_destino_id,
              servicio_id: data.servicio_id,
              tipo_servicio: data.tipo_servicio,
              tipo_servicio_otro: data.tipo_servicio_otro,
              numero_dias_viaje: '',
              valor_servicio: '',
              valor_servicio_dia_adicional: '',
              numero_cotizacion_servicio: values.id ?? 0,
              id: -1000 + index,
            };
            const ciudadOrigen = ciudades.find(
              (city) => city.id === newRow.ciudad_origen_id,
            );
            if (ciudadOrigen) {
              newRow = {
                ...newRow,
                ciudad_origen:
                  ciudadOrigen.nombre + '-' + ciudadOrigen.departamento,
              };
            }
            const ciudadDestino = ciudades.find(
              (city) => city.id === newRow.ciudad_destino_id,
            );
            if (ciudadDestino) {
              newRow = {
                ...newRow,
                ciudad_destino:
                  ciudadDestino.nombre + '-' + ciudadDestino.departamento,
              };
            }
            const servicio = servicios.find(
              (service) => service.id === newRow.servicio_id,
            );
            if (servicio) {
              newRow = {...newRow, servicio: servicio.nombre};
            }
            dispatch({type: CREATE_DETALLE_COTIZACION, payload: newRow});
          });
        }
        setFieldValue('nombre_empresa', solicitud.nombre_empresa);
        setFieldValue(
          'numero_solicitud_cotizacion',
          solicitud.numero_solicitud,
        );
        setFieldValue('observaciones', solicitud.observaciones);
        setFieldValue('numero_viajes_mes', solicitud.numero_servicios_mes);
      }
    } else {
      setFieldValue('nombre_empresa', '');
      setFieldValue('numero_solicitud_cotizacion', '');
      setFieldValue('observaciones', '');
      setFieldValue('numero_viajes_mes', '');
      setFieldValue('asociado_id', '');
      setFieldValue('empresa_cotizacion', '');
    }
  }, [values.solicitud_cotizacion_id]);

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
              Cotización
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <Box className={classes.inputs_2}>
                <MyAutocompleteSolicitud
                  options={solicitudes.filter(
                    (solicitud) =>
                      (solicitud.estado &&
                        solicitud.estado_solicitud_cotizacion === 'SOL') ||
                      initialValues.solicitud_cotizacion_id === solicitud.id,
                  )}
                  name='solicitud_cotizacion_id'
                  inputValue={initialValues.solicitud_cotizacion_id}
                  label='Solicitud Cotización'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Empresa'
                  name='nombre_empresa'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Cotización'
                  name='fecha_cotizacion'
                  disabled={true}
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Vigencia Cotización'
                  name='fecha_vigencia_cotizacion'
                  disabled={disabled}
                  type='date'
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Plazo pago(días)'
                  name='plazo_pago_cotizacion'
                  disabled={disabled}
                  required
                  type='number'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Numero de Servicios Mes'
                  name='numero_viajes_mes'
                  disabled={disabled}
                  required
                  type='number'
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

        <DetalleCotizacion
          empresa={values.nombre_empresa}
          asociado_id={values.asociado_id}
          fecha={values.fecha_cotizacion}
          id={values.id ? values.id : 0}
          accionDetalle={accion}
          setDetalles={setDetalles}
          ciudades={ciudades}
          servicios={servicios}
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
            {/* <ListItem
              button
              component={NavLink}
              to={'/cotizaciones'}
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
            >
              <IntlMessages id='boton.cancel' />
            </ListItem> */}

            <Button
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
              href='/cotizaciones'>
              <IntlMessages id='boton.cancel' />
            </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
};

export default SolicitudCotizacionForm;
