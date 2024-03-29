import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, Tooltip} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyAutoCompleteProducto from '../../../../shared/components/MyAutoCompleteProducto';
import {Info} from '@material-ui/icons';

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

const DetalleCotizacionForm = (props) => {
  const {
    handleOnClose,
    accion,
    initialValues,
    productos,
    colores,
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

  useEffect(() => {
    if (values.producto_id) {
      const producto = productos.find((pro) => pro.id === values.producto_id);
      if (producto) {
        setFieldValue('producto', producto.nombre);
        setFieldValue('link', producto.link ?? '');
      }
    } else {
      setFieldValue('producto', '');
      setFieldValue('link', '');
    }
  }, [values.producto_id]); // eslint-disable-line

  const classes = useStyles(props);

  const onGoLink = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

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
                label='Número Cotización'
                name='numero_cotizacion_producto'
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
            <MyTextField
              className={classes.myTextField}
              label='Asociado Negocio'
              name='empresa'
              disabled={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box className={classes.inputs_2} minHeight='80px'>
              <MyAutoCompleteProducto
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position='end'
                      className={classes.pointer}
                      onClick={() => {
                        onGoLink(values.link);
                      }}>
                      <Tooltip title='Ver Especificaciones Técnicas'>
                        <Info
                          style={{
                            color: '#0C4F7F',
                          }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Cantidad'
                name='cantidad'
                disabled={disabled}
                type='number'
                required
              />

              <MyTextField
                className={classes.myTextField}
                label='Dimensiones'
                name='dimensiones_producto'
                disabled={disabled}
              />

              <MyAutocomplete
                options={colores}
                name='color_id'
                inputValue={initialValues.color_id}
                label='Color'
                //autoHighlight
                className={classes.myTextField}
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Valor Unitario'
                name='valor_unitario_producto'
                disabled={disabled}
                type='number'
                required
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

export default DetalleCotizacionForm;
