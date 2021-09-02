import React from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
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

const AprobacionCotizacionForm = (props) => {
  const {handleOnClose, accion, initialValues, titulo, asociados} = props;

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
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
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
    tableHead: {
      fontWeight: 'bold',
      padding: '2px',
    },
    tableCell: {
      padding: '2px',
    },
  }));

  const classes = useStyles(props);

  return (
    <Form style={{width: '900px'}} noValidate autoComplete='off'>
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
            <Box display='grid' gridTemplateColumns='repeat(2, 1fr)'>
              <MyTextField
                className={classes.myTextField}
                label='Solicitud Cotización'
                name='numero_cotizacion_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <MyAutocomplete
              options={asociados}
              name='asociado_id'
              inputValue={initialValues.asociado_id}
              label='Asociado Negocio'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={initialValues.asociado_id !== ''}
            />

            <Box className={classes.inputs_2}>
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
                disabled={true}
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Plazo pago(días)'
                name='plazo_pago_cotizacion'
                disabled={true}
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Número Servicios Mes'
                name='numero_viajes_mes'
                disabled={true}
                required
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={true}
              InputLabelProps={{
                shrink: true,
              }}
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
            <IntlMessages id='boton.aprobar' />
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

export default AprobacionCotizacionForm;
