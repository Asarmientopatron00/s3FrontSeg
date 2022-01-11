import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
} from '../../../../shared/constants/Constantes';

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

const MyAutocompleteTerceroServicio = (props) => {
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
  const {
    accion,
    initialValues,
    values,
    setFieldValue,
    asociados,
    TIPOS_SERVICIOS,
    tercerosServicios,
    servicios,
    updateRutas,
    rutas,
  } = props;
  const [disabled, setDisabled] = useState(false);
  const [validFacturarA, setValidFacturarA] = useState(false);
  const [showValid, setShowValid] = useState(false);
  const [aux_asociado, set_aux_asociado] = useState(initialValues.asociado_id);
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
      paddingBottom: 10,
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
    asociados.forEach((asociado) => {
      if (asociado.id === values.asociado_id) {
        if (
          asociado.nombre !== '' &&
          asociado.nombre !== undefined &&
          asociado.nombre !== null
        ) {
          setFieldValue('asociado', asociado.nombre);
        }
        if (asociado.contacto !== null) {
          if (
            asociado.contacto.numero_celular !== '' &&
            asociado.contacto.numero_celular !== undefined &&
            asociado.contacto.numero_celular !== null
          ) {
            setFieldValue(
              'telefono_asociado',
              asociado.contacto.numero_celular,
            );
          }
          if (
            asociado.contacto.email !== '' &&
            asociado.contacto.email !== undefined &&
            asociado.contacto.email !== null
          ) {
            setFieldValue('email_asociado', asociado.contacto.email);
          }
          if (
            asociado.contacto.nombre !== '' &&
            asociado.contacto.nombre !== undefined &&
            asociado.contacto.nombre !== null
          ) {
            setFieldValue('contacto_asociado', asociado.contacto.nombre);
          }
        } else {
          setFieldValue('telefono_asociado', '');
          setFieldValue('email_asociado', '');
          setFieldValue('contacto_asociado', '');
        }
      }
    });
    if (aux_asociado !== values.asociado_id && values.asociado_id !== '') {
      setFieldValue('departamento_id_desinstalacion', '');
      setFieldValue('departamento_id_instalacion', '');
      setFieldValue('ciudad_id_desinstalacion', '');
      setFieldValue('ciudad_id_instalacion', '');
      setFieldValue('lugar_id_desinstalacion', '');
      setFieldValue('lugar_id_instalacion', '');
      set_aux_asociado(values.asociado_id);
    }
  }, [values.asociado_id, asociados, setFieldValue]);

  useEffect(() => {
    tercerosServicios.forEach((tercerosServicio) => {
      if (tercerosServicio.id === values.agente_aduana_id) {
        if (
          tercerosServicio.nombre !== '' &&
          tercerosServicio.nombre !== undefined &&
          tercerosServicio.nombre !== null
        ) {
          setFieldValue('agente_aduana', tercerosServicio.nombre);
        }
        if (
          tercerosServicio.telefono !== '' &&
          tercerosServicio.telefono !== undefined &&
          tercerosServicio.telefono !== null
        ) {
          setFieldValue('telefono_agente_aduana', tercerosServicio.telefono);
        }
        if (
          tercerosServicio.celular !== '' &&
          tercerosServicio.celular !== undefined &&
          tercerosServicio.celular !== null
        ) {
          setFieldValue('celular_agente_aduana', tercerosServicio.celular);
        }
        if (
          tercerosServicio.email !== '' &&
          tercerosServicio.email !== undefined &&
          tercerosServicio.email !== null
        ) {
          setFieldValue('email_agente_aduana', tercerosServicio.email);
        }
        if (
          tercerosServicio.contacto !== '' &&
          tercerosServicio.contacto !== undefined &&
          tercerosServicio.contacto !== null
        ) {
          setFieldValue('contacto_agente_aduana', tercerosServicio.contacto);
        }
      }
    });
  }, [values.agente_aduana_id, tercerosServicios, setFieldValue]);

  useEffect(() => {
    tercerosServicios.forEach((tercerosServicio) => {
      if (tercerosServicio.id === values.transportador_id) {
        if (
          tercerosServicio.nombre !== '' &&
          tercerosServicio.nombre !== undefined &&
          tercerosServicio.nombre !== null
        ) {
          setFieldValue('transportador', tercerosServicio.nombre);
        }
        if (
          tercerosServicio.telefono !== '' &&
          tercerosServicio.telefono !== undefined &&
          tercerosServicio.telefono !== null
        ) {
          setFieldValue('telefono_transportador', tercerosServicio.telefono);
        }
        if (
          tercerosServicio.celular !== '' &&
          tercerosServicio.celular !== undefined &&
          tercerosServicio.celular !== null
        ) {
          setFieldValue('celular_transportador', tercerosServicio.celular);
        }
        if (
          tercerosServicio.email !== '' &&
          tercerosServicio.email !== undefined &&
          tercerosServicio.email !== null
        ) {
          setFieldValue('email_transportador', tercerosServicio.email);
        }
        if (
          tercerosServicio.contacto !== '' &&
          tercerosServicio.contacto !== undefined &&
          tercerosServicio.contacto !== null
        ) {
          setFieldValue('contacto_transportador', tercerosServicio.contacto);
        }
      }
    });
  }, [values.transportador_id, tercerosServicios, setFieldValue]);

  useEffect(() => {
    if (values.cliente_factura_documento !== '') {
      let id_asociado = '';
      asociados.forEach((asociado) => {
        if (asociado.numero_documento === values.cliente_factura_documento) {
          id_asociado = asociado.id;
        }
      });
      setFieldValue('cliente_factura', id_asociado);
    }
  }, [values.cliente_factura_documento, setFieldValue, asociados]);

  useEffect(() => {
    if (
      values.cliente_factura !== '' &&
      values.cliente_factura_documento === ''
    ) {
      let numero_documento_asociado = '';
      asociados.forEach((asociado) => {
        if (asociado.id === values.cliente_factura) {
          numero_documento_asociado = asociado.numero_documento;
        }
      });
      setFieldValue('cliente_factura_documento', numero_documento_asociado);
    }
  }, [values.cliente_factura, asociados, setFieldValue]);

  useEffect(() => {
    if (values.cliente_factura_documento === '') {
      setShowValid(false);
      setValidFacturarA(false);
    } else {
      setShowValid(true);
      if (values.cliente_factura === '') {
        setValidFacturarA(false);
      } else {
        setValidFacturarA(true);
      }
    }
  }, [values.cliente_factura_documento, values.cliente_factura]);

  useEffect(() => {
    if (values.tipo_servicio !== 'OTR') {
      setFieldValue('tipo_servicio_otro', '');
    }
  }, [values.tipo_servicio, setFieldValue]);

  const [departamentosRutaInst, setDepartamentosRutaInst] = useState([]);
  const [departamentosRutaDesinst, setDepartamentosRutaDesinst] = useState([]);
  const [ciudadesRutaInst, setCiudadesRutaInst] = useState([]);
  const [ciudadesRutaDesinst, setCiudadesRutaDesinst] = useState([]);
  const [lugaresRutaInst, setLugaresRutaInst] = useState([]);
  const [lugaresRutaDesinst, setLugaresRutaDesinst] = useState([]);
  const [aux_dep_inst, set_aux_dep_inst] = useState(
    initialValues.departamento_id_instalacion,
  );
  const [aux_dep_des, set_aux_dep_des] = useState(
    initialValues.departamento_id_desinstalacion,
  );

  useEffect(() => {
    if (values.asociado_id !== '') {
      updateRutas(values.asociado_id);
    }
  }, [values.asociado_id]);

  useEffect(() => {
    if (rutas.departamentos !== undefined) {
      let departamentosInstalacion = [];
      let departamentosDesinstalacion = [];
      rutas.departamentos.forEach((departamento) => {
        if (departamento.tipo_proceso === 'I') {
          departamentosInstalacion.push(departamento);
        }
        if (departamento.tipo_proceso === 'D') {
          departamentosDesinstalacion.push(departamento);
        }
      });
      setDepartamentosRutaInst(departamentosInstalacion);
      setDepartamentosRutaDesinst(departamentosDesinstalacion);
    }
  }, [rutas]);

  useEffect(() => {
    if (values.departamento_id_instalacion !== '') {
      if (rutas.ciudades !== undefined) {
        let ciudadesInstalacion = [];
        rutas.ciudades.forEach((ciudad) => {
          if (
            ciudad.tipo_proceso === 'I' &&
            ciudad.departamento_id === values.departamento_id_instalacion
          ) {
            ciudadesInstalacion.push(ciudad);
          }
        });
        setCiudadesRutaInst(ciudadesInstalacion);
      }
    }
    if (
      aux_dep_inst !== values.departamento_id_instalacion &&
      values.departamento_id_instalacion !== ''
    ) {
      values.ciudad_id_instalacion = '';
      values.lugar_id_instalacion = '';
      values.direccion_instalacion = '';
      set_aux_dep_inst(values.departamento_id_instalacion);
    }
  }, [values.departamento_id_instalacion, rutas.ciudades]);

  useEffect(() => {
    if (values.departamento_id_desinstalacion !== '') {
      if (rutas.ciudades !== undefined) {
        let ciudadesDesinstalacion = [];
        rutas.ciudades.forEach((ciudad) => {
          if (
            ciudad.tipo_proceso === 'D' &&
            ciudad.departamento_id === values.departamento_id_desinstalacion
          ) {
            ciudadesDesinstalacion.push(ciudad);
          }
        });
        setCiudadesRutaDesinst(ciudadesDesinstalacion);
      }
    }

    if (
      aux_dep_des !== values.departamento_id_desinstalacion &&
      values.departamento_id_desinstalacion !== ''
    ) {
      values.ciudad_id_desinstalacion = '';
      values.lugar_id_desinstalacion = '';
      values.direccion_desinstalacion = '';
      set_aux_dep_des(values.departamento_id_desinstalacion);
    }
  }, [values.departamento_id_desinstalacion, rutas.ciudades]);

  useEffect(() => {
    if (values.ciudad_id_instalacion !== '') {
      if (rutas.lugares !== undefined) {
        let lugaresInstalacion = [];
        rutas.lugares.forEach((lugar) => {
          if (
            lugar.tipo_proceso === 'I' &&
            lugar.ciudad_id === values.ciudad_id_instalacion
          ) {
            lugaresInstalacion.push(lugar);
          }
        });
        setLugaresRutaInst(lugaresInstalacion);
      }
    }
  }, [values.ciudad_id_instalacion, rutas.lugares]);

  useEffect(() => {
    if (values.ciudad_id_desinstalacion !== '') {
      if (rutas.lugares !== undefined) {
        let lugaresDesinstalacion = [];
        rutas.lugares.forEach((lugar) => {
          if (
            lugar.tipo_proceso === 'D' &&
            lugar.ciudad_id === values.ciudad_id_desinstalacion
          ) {
            lugaresDesinstalacion.push(lugar);
          }
        });
        setLugaresRutaDesinst(lugaresDesinstalacion);
      }
    }
  }, [values.ciudad_id_desinstalacion, rutas.lugares]);

  useEffect(() => {
    if (values.lugar_id_instalacion !== '') {
      lugaresRutaInst.forEach((lugar) => {
        if (lugar.id === values.lugar_id_instalacion) {
          setFieldValue('direccion_instalacion', lugar.direccion);
        }
      });
    } else {
      setFieldValue('direccion_instalacion', '');
    }
  }, [values.lugar_id_instalacion, setFieldValue, lugaresRutaInst]);

  useEffect(() => {
    if (values.lugar_id_desinstalacion !== '') {
      lugaresRutaDesinst.forEach((lugar) => {
        if (lugar.id === values.lugar_id_desinstalacion) {
          setFieldValue('direccion_desinstalacion', lugar.direccion);
        }
      });
    } else {
      setFieldValue('direccion_desinstalacion', '');
    }
  }, [values.lugar_id_desinstalacion, setFieldValue, lugaresRutaDesinst]);

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
                  //autoHighlight
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
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Referencia factura'
                  name='referencia_factura'
                  disabled={disabled}
                />
                <Box
                  display='grid'
                  gridTemplateColumns='90% 10%'
                  gridColumnGap='5px'>
                  <MyTextField
                    className={classes.myTextField}
                    label='Facturar a'
                    name='cliente_factura_documento'
                    disabled={disabled}
                  />
                  {showValid && (
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-end'>
                      {validFacturarA ? (
                        <CheckCircleIcon backgroundColor='green' />
                      ) : (
                        <CancelIcon backgroundColor='red' />
                      )}
                    </Box>
                  )}
                </Box>
                <MyAutocomplete
                  options={servicios}
                  name='servicio_id'
                  inputValue={initialValues.tipo_servicio}
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
              </Box>

              <Box component='h6' mb={2}>
                Agente de Aduanas
              </Box>

              <Box className={classes.inputs_2}>
                <MyAutocompleteTerceroServicio
                  options={tercerosServicios.filter(
                    (tercero) => tercero.tipo === 'AA',
                  )}
                  name='agente_aduana_id'
                  inputValue={initialValues.agente_aduana_id}
                  label='Agente de Aduanas'
                  //autoHighlight
                  className={classes.myTextField}
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label=' '
                  name='agente_aduana'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Contacto'
                  name='contacto_agente_aduana'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Telefono'
                  name='telefono_agente_aduana'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Celular'
                  name='celular_agente_aduana'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Correo'
                  name='email_agente_aduana'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box component='h6' mb={2}>
                Instalación
              </Box>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Programada'
                  name='fecha_programada_instalacion'
                  required
                  type='date'
                  disabled={disabled}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Hora Programada'
                  name='hora_programada_instalacion'
                  disabled={disabled}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <MyAutocomplete
                  options={departamentosRutaInst}
                  name='departamento_id_instalacion'
                  inputValue={initialValues.departamento_id_instalacion}
                  label='Departamento'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />

                <MyAutocomplete
                  options={ciudadesRutaInst}
                  name='ciudad_id_instalacion'
                  inputValue={initialValues.ciudad_id_instalacion}
                  label='Ciudad'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />

                <MyAutocomplete
                  options={lugaresRutaInst}
                  name='lugar_id_instalacion'
                  inputValue={initialValues.lugar_id_instalacion}
                  label='Nombre Lugar'
                  //autoHighlight
                  className={classes.myTextField}
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Dirección'
                  name='direccion_instalacion'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box component='h6' mb={2}>
                Desinstalación
              </Box>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Programada'
                  name='fecha_programada_desinstalacion'
                  required
                  type='date'
                  disabled={disabled}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Hora Programada'
                  name='hora_programada_desinstalacion'
                  disabled={disabled}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <MyAutocomplete
                  options={departamentosRutaDesinst}
                  name='departamento_id_desinstalacion'
                  inputValue={initialValues.departamento_id_desinstalacion}
                  label='Departamento'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />

                <MyAutocomplete
                  options={ciudadesRutaDesinst}
                  name='ciudad_id_desinstalacion'
                  inputValue={initialValues.ciudad_id_desinstalacion}
                  label='Ciudad'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />

                <MyAutocomplete
                  options={lugaresRutaDesinst}
                  name='lugar_id_desinstalacion'
                  inputValue={initialValues.lugar_id_desinstalacion}
                  label='Nombre Lugar'
                  //autoHighlight
                  className={classes.myTextField}
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Dirección'
                  name='direccion_desinstalacion'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box component='h6' mb={2}>
                Datos Transportador
              </Box>
              <Box className={classes.inputs_2}>
                <MyAutocompleteTerceroServicio
                  options={tercerosServicios.filter(
                    (tercero) => tercero.tipo === 'TR',
                  )}
                  name='transportador_id'
                  inputValue={initialValues.transportador_id}
                  label='Transportador'
                  //autoHighlight
                  className={classes.myTextField}
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label=' '
                  name='transportador'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Contacto'
                  name='contacto_transportador'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Telefono'
                  name='telefono_transportador'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Celular'
                  name='celular_transportador'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Correo'
                  name='email_transportador'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Placa Vehículo'
                  name='placa_vehiculo'
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Placa Trailer'
                  name='placa_trailer'
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Número Contenedor'
                  name='numero_contenedor'
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Conductor'
                  name='nombre_conductor'
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Cédula Conductor'
                  name='cedula_conductor'
                  inputProps={{
                    maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
                  }}
                  disabled={disabled}
                />

                <MyTextField
                  className={classes.myTextField}
                  label='Celular Conductor'
                  name='celular_conductor'
                  disabled={disabled}
                  inputProps={{
                    maxLength: LONGITUD_MAXIMA_TELEFONOS,
                    minLength: LONGITUD_MINIMA_TELEFONOS,
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
