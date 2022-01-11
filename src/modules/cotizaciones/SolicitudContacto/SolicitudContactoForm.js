import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../@crema/core/Scrollbar';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyAutocomplete from '../../../shared/components/MyAutoComplete';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../shared/constants/Constantes';

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

const MyAutocompleteCiudad = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.nombre + '-' + option.departamento;
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
            {option.nombre + '-' + option.departamento}
          </React.Fragment>
        );
      }}
      getOptionLabel={(option) => option.nombre + '-' + option.departamento}
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

const SolicitudCotizacionForm = (props) => {
  const {
    accion,
    initialValues,
    ciudades,
    servicios,
    titulo,
    TIPOS_SERVICIOS,
    values,
    setFieldValue,
  } = props;
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

  useEffect(() => {
    if (values.tipo_servicio !== 'OTR') {
      setFieldValue('tipo_servicio_otro', '');
    }
  }, [values.tipo_servicio, setFieldValue]);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyTextField
              className={classes.myTextField}
              label='Fecha Solicitud Cotización'
              name='fecha_solicitud_cotizacion'
              disabled={true}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <MyAutocompleteCiudad
              options={ciudades}
              name='ciudad_origen_id'
              inputValue={initialValues.ciudad_origen_id}
              label='Ciudad Origen'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocompleteCiudad
              options={ciudades}
              name='ciudad_destino_id'
              inputValue={initialValues.ciudad_destino_id}
              label='Ciudad Destino'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocomplete
              options={servicios}
              name='servicio_id'
              inputValue={initialValues.servicio_id}
              label='Servicio'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocomplete
              options={TIPOS_SERVICIOS}
              name='tipo_servicio'
              inputValue={initialValues.tipo_servicio}
              label='Tipo Servicio'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyTextField
              className={classes.myTextField}
              label='Tipo Servicio Otro'
              name='tipo_servicio_otro'
              disabled={disabled || values.tipo_servicio !== 'OTR'}
              required={values.tipo_servicio === 'OTR'}
            />

            <MyTextField
              className={classes.myTextField}
              label='Número Servicios por Mes'
              name='numero_servicios_mes'
              disabled={disabled}
              required
            />

            <Box component='h3'>Datos Persona Contacto:</Box>

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

            <MyTextField
              className={classes.myTextField}
              label='Empresa'
              name='empresa'
              disabled={disabled}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={disabled}
              multiline
            />
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
        {/* <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button> */}
      </Box>
    </Form>
  );
};

export default SolicitudCotizacionForm;
