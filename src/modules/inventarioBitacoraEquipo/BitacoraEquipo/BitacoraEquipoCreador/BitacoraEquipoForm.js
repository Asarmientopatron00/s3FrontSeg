import React, {useEffect, useState, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyAutoCompleteEquipoSerial from '../../../../shared/components/MyAutoCompleteEquipoSerial';
import MyAutoCompleteOrdenServicio from '../../../../shared/components/MyAutoCompleteOrdenServicio';
import MyAutoCompleteCiudad from '../../../../shared/components/MyAutoCompleteCiudad';
import {TimePicker} from '@material-ui/pickers';

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

const BitacoraEquipoForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    setFieldValue,
    titulo,
    equipos,
    eventos,
    estados,
    responsables,
    ordenesServicio,
    ciudades,
    lugares,
    onChangeCiudad,
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
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
    },
    helperText: {
      color: 'red',
    },
  }));

  useEffect(() => {
    equipos.forEach((equipo) => {
      if (equipo.id === values.equipo_id) {
        setFieldValue('equipo', equipo.nombre);
        setFieldValue('numero_serial_equipo', equipo.numero_serial);
      }
    });
  }, [equipos, values.equipo_id, setFieldValue]);

  useEffect(() => {
    let asociado = '';
    let fecha_orden_servicio = '';
    let ciudad_instalacion = '';
    let ciudad_desinstalacion = '';
    let numero_orden_servicio = '';
    ordenesServicio.forEach((orden) => {
      if (orden.id === values.orden_servicio_id) {
        asociado = orden.asociado;
        fecha_orden_servicio = orden.fecha_orden_servicio;
        ciudad_instalacion = orden.ciudad_instalacion;
        ciudad_desinstalacion = orden.ciudad_desinstalacion;
        numero_orden_servicio = orden.numero_orden_servicio;
      }
    });
    setFieldValue('asociado', asociado);
    setFieldValue('fecha_orden_servicio', fecha_orden_servicio);
    setFieldValue('ciudad_instalacion', ciudad_instalacion);
    setFieldValue('ciudad_desinstalacion', ciudad_desinstalacion);
    setFieldValue('numero_orden_servicio', numero_orden_servicio);
  }, [ordenesServicio, values.orden_servicio_id, setFieldValue]);

  useEffect(() => {
    if (accion === 'crear') {
      lugares.forEach((lugar) => {
        if (lugar.id === values.lugar_id) {
          setFieldValue('lugar_evento', lugar.nombre);
        }
      });
    }
  }, [lugares, values.lugar_id, accion, setFieldValue]);

  useEffect(() => {
    if (accion === 'crear') {
      eventos.forEach((evento) => {
        if (evento.id === values.evento_equipo_id) {
          setFieldValue('estado_equipo_id', evento.estado_equipo_id);
        }
      });
    }
  }, [eventos, values.evento_equipo_id, accion, setFieldValue]);

  let onChangeCiudad1 = useRef();
  onChangeCiudad1 = (id) => {
    onChangeCiudad(id);
    setFieldValue('lugar_id', '');
  };

  useEffect(() => {
    if (values.ciudad_id_evento !== '') {
      onChangeCiudad1(values.ciudad_id_evento);
    } else {
      onChangeCiudad1(0);
    }
  }, [values.ciudad_id_evento]);

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
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2}>
              <MyAutoCompleteEquipoSerial
                options={equipos}
                name='equipo_id'
                inputValue={initialValues.equipo_id}
                label='Serial Equipo'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label=' '
                name='equipo'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Fecha'
                name='fecha_evento'
                required
                type='date'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Hora Evento'
                name='hora_evento'
                disabled={disabled}
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  ampm: false,
                }}
              />
              <MyAutocomplete
                options={eventos}
                name='evento_equipo_id'
                inputValue={initialValues.evento_equipo_id}
                label='Evento'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />

              <MyAutocomplete
                options={estados}
                name='estado_equipo_id'
                inputValue={initialValues.estado_equipo_id}
                label='Estado'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyAutocomplete
                options={responsables}
                name='recurso_id_responsable'
                inputValue={initialValues.recurso_id_responsable}
                label='Responsable'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyAutoCompleteOrdenServicio
                options={ordenesServicio}
                name='orden_servicio_id'
                inputValue={initialValues.orden_servicio_id}
                label='Orden Servicio'
                //autoHighlight
                className={classes.myTextField}
                disabled={disabled}
              />
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Asociado Negocio'
                name='asociado'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha'
                name='fecha_orden_servicio'
                disabled={true}
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Ciudad Instalación'
                name='ciudad_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Ciudad Desinstalación'
                name='ciudad_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyAutoCompleteCiudad
                options={ciudades}
                name='ciudad_id_evento'
                inputValue={initialValues.ciudad_id_evento}
                label='Ciudad'
                //autoHighlight
                className={classes.myTextField}
                disabled={disabled}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Número de Horas'
                name='numero_horas_novedad'
                disabled={disabled}
                type='number'
              />
              <MyAutocomplete
                options={lugares}
                name='lugar_id'
                inputValue={initialValues.lugar_id}
                label='Lugar'
                //autoHighlight
                className={classes.myTextField}
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Lugar'
                name='lugar_evento'
                disabled={disabled}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
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

export default BitacoraEquipoForm;
