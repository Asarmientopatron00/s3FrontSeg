import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {onBuscar} from '../../../../redux/actions/RutaAction';
import {onBuscar as buscarTarifa} from '../../../../redux/actions/TarifaAction';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAN_RUTA} from '../../../../shared/constants/ActionTypes';
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

const DetalleCotizacionForm = (props) => {
  const {
    handleOnClose,
    accion,
    initialValues,
    ciudades,
    servicios,
    titulo,
    values,
    setFieldValue,
  } = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver') {
      setDisabled(true);
    }
  }, [accion]);
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      values.ciudad_origen_id !== '' &&
      typeof values.ciudad_origen_id === 'number' &&
      values.ciudad_destino_id !== '' &&
      typeof values.ciudad_destino_id === 'number'
    ) {
      dispatch(onBuscar(values.ciudad_origen_id, values.ciudad_destino_id));
    }
  }, [dispatch, values.ciudad_origen_id, values.ciudad_destino_id]);

  useEffect(() => {
    if (
      values.ciudad_origen_id !== '' &&
      typeof values.ciudad_origen_id === 'number' &&
      values.ciudad_destino_id !== '' &&
      typeof values.ciudad_destino_id === 'number' &&
      values.servicio_id !== ''
    ) {
      dispatch(
        buscarTarifa(
          values.ciudad_origen_id,
          values.ciudad_destino_id,
          19,
          values.servicio_id,
        ),
      );
    }
  }, [
    dispatch,
    values.ciudad_origen_id,
    values.ciudad_destino_id,
    values.servicio_id,
  ]);

  const cantidad_rutas = useSelector(
    ({rutaReducer}) => rutaReducer.cantidadRutas,
  );

  useEffect(() => {
    setFieldValue('cantidad_rutas', cantidad_rutas);
  }, [cantidad_rutas, setFieldValue]);

  const tarifa = useSelector(({tarifaReducer}) => tarifaReducer.valor_tarifa);

  useEffect(() => {
    if (accion === 'crear') {
      setFieldValue('valor_servicio', tarifa);
    }
  }, [tarifa, accion, setFieldValue]);

  useEffect(() => {
    return () => {
      dispatch({type: CLEAN_RUTA});
    };
  }, [dispatch]);

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
            <Box
              display='grid'
              gridTemplateColumns='repeat(2, 1fr)'
              gridColumnGap='20px'>
              <MyTextField
                className={classes.myTextField}
                label='Asociado Negocio'
                name='empresa'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha'
                name='fecha'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <MyAutocompleteCiudad
              options={ciudades}
              name='ciudad_origen_id'
              inputValue={initialValues.ciudad_origen_id}
              label='Ciudad Origen'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocompleteCiudad
              options={ciudades}
              name='ciudad_destino_id'
              inputValue={initialValues.ciudad_destino_id}
              label='Ciudad Destino'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocomplete
              options={servicios}
              name='servicio_id'
              inputValue={initialValues.servicio_id}
              label='Servicio'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Valor Servicio'
              name='valor_servicio'
              disabled={disabled}
              required
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
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default DetalleCotizacionForm;
