import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

const ConsultaCotizacionForm = (props) => {
  const {handleOnClose, accion, initialValues, titulo, rows} = props;
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
      color: '#909098',
    },
    tableCell: {
      padding: '2px',
      color: '#909098',
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
                label='Número Cotización'
                name='numero_cotizacion_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Empresa'
              name='nombre_empresa'
              disabled={true}
              InputLabelProps={{
                shrink: true,
              }}
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
                disabled={disabled}
                type='date'
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Estado Cotización'
                name='estado_cotizacion'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={disabled}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
            />
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Solicitud Cotización N°'
                name='numero_solicitud_cotizacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Solicitud'
                name='fecha_solicitud_cotizacion'
                disabled={true}
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Usuario Creación'
                name='usuario_creacion_nombre'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Usuario Modificación'
                name='usuario_modificacion_nombre'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Creación'
                name='fecha_creacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Última Modificación'
                name='fecha_modificacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            {rows.length ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      Ciudad Origen
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                      Ciudad Destino
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                      Servicio
                    </TableCell>
                    <TableCell className={classes.tableHead}>Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {row.ciudad_origen}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {row.ciudad_destino}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {row.servicio}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {row.valor_servicio}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              ''
            )}
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

export default ConsultaCotizacionForm;
