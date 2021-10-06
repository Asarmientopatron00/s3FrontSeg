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

const MyAutocompleteProducto = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.codigo_producto;
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
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          props.options.forEach((option) => {
            console.log(field.value);
            if (option.id === field.value) {
              form.setValue('');
            }
          });
        }
      }}
      {...props}
      onChange={(event, newValue, reasons, details, trial) =>
        newValue ? form.setValue(newValue.id) : form.setValue('')
      }
      inputValue={myvalue}
      renderOption={(option) => {
        if (option.estado) {
          return (
            <React.Fragment>
              {option.codigo_producto + '-' + option.nombre}
            </React.Fragment>
          );
        } else {
          return '';
        }
      }}
      getOptionLabel={(option) => option.codigo_producto}
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

const DetallePedidoForm = (props) => {
  const {
    handleOnClose,
    accion,
    initialValues,
    titulo,
    values,
    setFieldValue,
    productos,
    COLORES_EQUIPOS,
  } = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver') {
      setDisabled(true);
    }
  }, [accion]);

  useEffect(() => {
    if (values.cantidad > 0 && values.serie_inicial_articulo > 0)
      setFieldValue(
        'serie_final_articulo',
        values.cantidad + values.serie_inicial_articulo,
      );
  }, [values.cantidad, values.serie_inicial_articulo]);
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
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '65px',
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
  }));

  const classes = useStyles(props);

  useEffect(() => {
    setFieldValue('producto', '');
    productos.forEach((producto) => {
      if (producto.id === values.producto_id) {
        setFieldValue('producto', producto.nombre);
      }
    });
  }, [values.producto_id, productos, setFieldValue]);

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
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextField}
                label='Número Pedido'
                name='numero_pedido'
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
              <MyTextField
                className={classes.myTextField}
                label='Asociado Negocio'
                name='documento'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
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
            </Box>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyAutocompleteProducto
                options={productos}
                name='producto_id'
                inputValue={initialValues.producto_id}
                label='Producto'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label=' '
                name='producto'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextField}
                label='Cantidad'
                name='cantidad'
                disabled={disabled}
                required
                type='number'
              />
            </Box>

            <Box className={classes.inputs_2} minWidth='800px'>
              <MyAutocomplete
                options={COLORES_EQUIPOS}
                name='color'
                inputValue={initialValues.color}
                label='Color'
                //autoHighlight
                className={classes.myTextField}
                disabled={disabled}
              />
            </Box>

            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextField}
                label='Prefijo'
                name='prefijo'
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Posfijo'
                name='posfijo'
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Serie Inicial'
                name='serie_inicial_articulo'
                disabled={disabled}
                type='number'
              />
              <MyTextField
                className={classes.myTextField}
                label='Serie Final'
                name='serie_final_articulo'
                disabled={disabled}
                type='number'
              />
              <MyTextField
                className={classes.myTextField}
                label='Longitud Serial'
                name='longitud_serial'
                disabled={disabled}
                type='number'
              />
              <MyTextField
                className={classes.myTextField}
                label='Dimensiones'
                name='dimensiones'
                disabled={disabled}
                multiline
              />
            </Box>
            <MyTextField
              className={classes.myTextField}
              label='Especificaciones'
              name='especificaciones'
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
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default DetallePedidoForm;
