import React, {useEffect, useState, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {useDispatch} from 'react-redux';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';

import DetallePedido from '../../DetallePedido';

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

const PedidoForm = (props) => {
  const {
    accion,
    initialValues,
    asociados,
    values,
    setFieldValue,
    setDetalles,
    ciudades,
    departamentos,
    user,
    ESTADO_PEDIDOS,
    numPedidoCopiar,
  } = props;
  const [disabled, setDisabled] = useState(false);
  const [cambioAsociado, setCambioAsociado] = useState(false);
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
    let asociado_id = '';
    let asociado = '';
    let departamento_id = '';
    let ciudad_id = '';
    let direccion = '';
    let telefono = '';
    let documento = '';
    asociados.forEach((temporal) => {
      if (temporal.id === values.asociado_id) {
        asociado_id = temporal.id;
        asociado = temporal.nombre;
        departamento_id = temporal.infoPedido.departamento_id
          ? temporal.infoPedido.departamento_id
          : '';
        ciudad_id = temporal.infoPedido.ciudad_id
          ? temporal.infoPedido.ciudad_id
          : '';
        direccion = temporal.infoPedido.direccion
          ? temporal.infoPedido.direccion
          : '';
        telefono = temporal.infoPedido.telefono
          ? temporal.infoPedido.telefono
          : '';
        documento = temporal.numero_documento;
        setCambioAsociado(true);
      }
    });

    if (asociado_id === '') {
      setFieldValue('asociado', '');
    } else {
      setFieldValue('asociado', asociado);
      setFieldValue('departamento_entrega_id', departamento_id);
      setFieldValue('ciudad_entrega_id', ciudad_id);
      setFieldValue('direccion_entrega', direccion);
      setFieldValue('telefono_entrega', telefono);
      setFieldValue('documento', documento);
    }
  }, [values.asociado_id, setFieldValue, asociados]);

  const dispatch = useDispatch();

  let onChangeDepartamento1 = useRef();
  onChangeDepartamento1 = (id) => {
    dispatch(ciudadColeccionLigera(id));
    if (!cambioAsociado) {
      values.ciudad_entrega_id = '';
    } else {
      setCambioAsociado(false);
    }
  };

  useEffect(() => {
    if (values.departamento_entrega_id !== '') {
      onChangeDepartamento1(values.departamento_entrega_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_entrega_id]);

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
              Pedidos Sellos
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Número Pedido'
                  name='numero_pedido'
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box className={classes.inputs_2}>
                <MyAutocompleteAsociado
                  options={asociados.filter(
                    (asociado) =>
                      asociado.estado ||
                      initialValues.asociado_id === asociado.id,
                  )}
                  name='asociado_id'
                  inputValue={initialValues.asociado_id}
                  label='Asociado de Negocio'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled || user.rol.tipo !== 'IN'}
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
                  label='Fecha Pedido'
                  name='fecha_pedido'
                  disabled={true}
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Entrega'
                  name='fecha_entrega_pedido'
                  disabled={disabled}
                  type='date'
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box component='h6'>Dirección Entrega</Box>

              <Box className={classes.inputs_2}>
                <MyAutocomplete
                  options={departamentos}
                  name='departamento_entrega_id'
                  inputValue={initialValues.departamento_entrega_id}
                  label='Departamento'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
                <MyAutocomplete
                  options={ciudades}
                  name='ciudad_entrega_id'
                  inputValue={initialValues.ciudad_entrega_id}
                  label='Ciudad'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
              </Box>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Dirección'
                  name='direccion_entrega'
                  disabled={disabled}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box className={classes.inputs_2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Telefono'
                  name='telefono_entrega'
                  disabled={disabled}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: LONGITUD_MAXIMA_TELEFONOS,
                    minLength: LONGITUD_MINIMA_TELEFONOS,
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Responsable'
                  name='responsable_entrega'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Observaciones'
                  name='observaciones'
                  disabled={disabled}
                  multiline
                />
              </Box>
              <Box className={classes.inputs_2}>
                <MyAutocomplete
                  options={ESTADO_PEDIDOS}
                  name='estado_pedido'
                  inputValue={initialValues.estado_pedido}
                  label='Estado Pedido'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled || user.rol.tipo !== 'IN'}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <DetallePedido
          numero_pedido={
            accion === 'copiar'
              ? ''
              : values.numero_pedido
              ? values.numero_pedido
              : 0
          }
          fecha={values.fecha_pedido}
          documento={values.documento}
          asociado={values.asociado}
          accionDetalle={accion}
          setDetalles={setDetalles}
          numPedidoCopiar={numPedidoCopiar}
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
              to={'/pedidos'}
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
            >
              <IntlMessages id='boton.cancel' />
            </ListItem> */}

            <Button
              className={`${classes.btnRoot} ${classes.btnSecundary}`}
              href='/pedidos'>
              <IntlMessages id='boton.cancel' />
            </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
};

export default PedidoForm;
